import {Product} from "../Interface.ts"
import { get_products } from "../api/products";
import {useInfiniteQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {useInView} from "react-intersection-observer"
import {useEffect} from "react";
import ProductCard from "../components/ProductCard.tsx";
import {Loading} from "../components/Loading.tsx";

function Home(){
  const [ref, inView] = useInView()

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } =  useInfiniteQuery({
    queryKey: ["products"],
    queryFn: get_products,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.next
    }
  })

  useEffect(()=>{
    if(inView && hasNextPage){
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  if(isError){
    toast.error(error.message)
  }

  return (
    <div className="flex justify-center max-w-4xl mx-auto container dark:text-white">
      {data?.pages.map((paginate, index: number)=>(
        <div key={index} className="grid pt-11 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {!isLoading && paginate?.results && paginate.results.map((product: Product, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
          {!isLoading && paginate?.results.length === 0 && (<p>No more results</p>)}
          {isLoading && (<Loading/>)}
          {isError && (<p>{error.message}</p>)}
        </div>
      ))}
    </div>
  );
}
export default Home;
