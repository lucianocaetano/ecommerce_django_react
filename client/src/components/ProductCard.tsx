import { Link } from "react-router-dom"
import React, {useContext} from "react"
import { FaArrowRight } from "react-icons/fa";
import {Product} from "../Interface"
import { CartContext } from "../context/cart.context";
import {useAuthStore} from "../store/auth";

const ProductCard: React.FC<{product: Product}> = ({product}) => {
  const {isAuth} = useAuthStore()
  const {handleAddOrUpdateItem} = useContext(CartContext)

  return(
    <div>
      <div
        className="max-w-sm bg-white border border-gray-200
        shadow dark:bg-gray-800 dark:border-gray-700 mt-4"
      >
        <Link to={`/product/${product.slug}`} className="cursor-pointer flex items-center justify-center bg-gray-200 dark:bg-gray-600 h-40 bg-cover bg-no-repeat">
          <img
            src={product.images[0].image}
            alt="Louvre"
          />
        </Link>
        <div className="p-5 ">
          <Link to={`/product/${product.slug}`}>
            <h5
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {product.name}
            </h5>
            <div className="flex justify-between">
              <h5
                className="mb-2 text-2xl font-bold tracking-tight
                text-gray-900 dark:text-slate-200"
              >
                $ {product.price}
              </h5>
            </div>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.description}
          </p>

        </div>
        <div className="flex items-center justify-between mb-4">

          {isAuth && (
            <button
              onClick={()=>handleAddOrUpdateItem(product)}
              className="inline-flex rounded-md items-center mx-3 px-3 py-2 text-sm font-medium
              bg-red-500 text-white text-center focus:ring-4
              focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800"
            >
              Add To Cart <FaArrowRight className="ms-4"/>
            </button>
          )}

          {!isAuth && (
            <Link
              to="/login"
              className={`inline-flex items-center mx-3 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800`}
            >
              Login <FaArrowRight className="ms-4"/>
            </Link>
          )}

          <Link
            to={`/product/${product.slug}`}
            className="inline-flex items-center mx-3 py-2
            px-3 py-2 text-sm font-medium text-center text-black
            focus:outline-none focus:ring-blue-300 dark:text-white
            dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FaArrowRight />
          </Link>

        </div>

      </div>
    </div>
  )
}

export default ProductCard
