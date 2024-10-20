import React, {useContext} from "react"
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import { Carousel } from "flowbite-react";
import {useQuery} from "@tanstack/react-query"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { get_product } from "../api/products"
import {CartContext} from "../context/cart.context"
import {Image} from "../Interface";
import {Loading} from "../components/Loading.tsx"
import {useAuthStore} from "../store/auth.ts";

const DetailProduct: React.FC = () => {
  const {slug} = useParams()

  const {isAuth} = useAuthStore.getState()

  const {data, isLoading, isError, error} = useQuery({queryKey: ["product"], queryFn: ()=>get_product(slug)})
  const {handleAddOrUpdateItem} = useContext(CartContext)

  const settingsCarrousel = {
    leftControl: <div className="text-white bg-black p-2 rounded-full"><FaArrowLeft/></div>,
    rightControl: <div className="text-white bg-black p-2 rounded-full"><FaArrowRight/></div>
  }


  if(isLoading){
    return <Loading/>
  }

  return (
    <div className="text-gray-700body-font overflow-hidden">

      {!isLoading && (
        <div className="container px-11 py-11 flex justify-center mx-auto">
          <div className="grid w-full lg:grid-cols-2 gap-2 grid-1">

            <div className="w-full h-[300px] w-1/2 flex-column bg-gray-200 dark:bg-gray-900 mt-11">
              <Carousel {... settingsCarrousel}>
                {
                  data.images.map((item: Image)=>(
                    <img src={item.image} className="object-contain w-full h-full"/>
                  ))
                }
              </Carousel>
            </div>
            <div className="w-full max-w-xl pl-10 py-6 mt-6 mt-0">
              <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">{data.name}</h1>
              <h2 className="text-sm title-font text-gray-500 dark:text-gray-200 tracking-widest">{data.category.name}</h2>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed dark:text-gray-300">{data.description}</p>
              <div className="flex mt-4">
                <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">${data.price}</span>

                <button className="flex ml-auto text-white bg-red-500 border-0 px-3 focus:outline-none hover:bg-red-600 rounded-lg items-center justify-center">
                  <MdFavoriteBorder/>
                </button>


                {isAuth? (
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                    onClick={()=>handleAddOrUpdateItem(data)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  </button>

                ) : (
                  <Link
                    to="/login"
                    className={`inline-flex items-center mx-3 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800`}
                  >
                    Login <FaArrowRight className="ms-4"/>
                  </Link>                
                )}
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  )
}
export default DetailProduct
