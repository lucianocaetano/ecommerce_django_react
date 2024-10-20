import {Product} from "../Interface.ts"
import { get_products_search } from "../api/products";
import {useInfiniteQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {useInView} from "react-intersection-observer"
import {useEffect} from "react";
import ProductCardHorizontal from "../components/ProductCardHorizontal.tsx";
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

    <div className="max-w-[700px] mx-auto mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
      </div>
      <div className="flow-root">
        {data?.pages.map((paginate, index: number)=>(
          <ul key={index} className="divide-y divide-gray-200 dark:divide-gray-700">
            {!isLoading && paginate?.results && paginate.results.map((product: Product, index: number) => (
              <ProductCardHorizontal key={index} product={product} />
            ))}
            {!isLoading && paginate?.results.length === 0 && (<p>No results</p>)}
          </ul>
        ))}
      </div>
    </div>

  );
}
export default SearchPage;
