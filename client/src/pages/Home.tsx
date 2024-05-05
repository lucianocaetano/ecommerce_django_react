import {Product} from "../Interface.ts"
import { get_products } from "../api/products";
import {useInfiniteQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {useInView} from "react-intersection-observer"
import {useEffect} from "react";
import ProductCard from "../components/ProductCard.tsx";

function Home(){
  const [ref, inView] = useInView()

  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } =  useInfiniteQuery({
    queryKey: ["products"],
    queryFn: get_products,
    getNextPageParam: (lastPage) => {
      if(lastPage.next){
        const url = new URL(lastPage.next)
        return parseInt(url.searchParams.get("page"))
      }
      return null
    }
  })

  useEffect(()=>{
    if(inView && hasNextPage){
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  const paginate = data?.pages[0]

  if(isLoading)
    return <p>Loading ...</p>

  if(isError){
    toast.error(error.message)
    return (
      <div>{error.message}</div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex justify-center max-w-4xl mx-auto px-8">
      {paginate.results && paginate.results.map((product: Product, index: number) => (
        <ProductCard key={index} product={product}/>
      ))}
    </div>
  );
}
export default Home;
