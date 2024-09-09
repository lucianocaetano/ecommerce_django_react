import {Product} from "../Interface.ts"
import { get_products_search } from "../api/products";
import {useInfiniteQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {useInView} from "react-intersection-observer"
import {useEffect} from "react";
import ProductCardHorizontal from "../components/ProductCardHorizontal.tsx";
import {Loading} from "../components/Loading.tsx";
import {useParams} from "react-router-dom";

function SearchPage(){
  const {search} = useParams();
  const [ref, inView] = useInView()

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: () => get_products_search(search),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.next
    }
  })

  useEffect(()=>{
    refetch()
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
    <div className="flex justify-center max-w-4xl mx-auto container dark:text-white pt-11">
      {data?.pages.map((paginate, index: number)=>(
        <div key={index}>
          {!isLoading && paginate?.results && paginate.results.map((product: Product, index: number) => (
            <ProductCardHorizontal key={index} product={product} />
          ))}
          {isLoading && (<Loading/>)}
          {isError && (<p>{error.message}</p>)}
        </div>
      ))}
    </div>
  );
}
export default SearchPage;
