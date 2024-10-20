import { Link } from "react-router-dom"
import React from "react"
import {Product} from "../Interface"

const ProductCardHorizontal: React.FC<{product: Product}> = ({product}) => {

  return(
      <li className="pt-3 pb-0 sm:pt-4">
        <Link to={`/product/${product.slug}`}>
          <div className="flex items-center ">
            <div className="flex-shrink-0">
              <img className="max-w-32 max-h-24" src={product.images[0].image} alt="Thomas image" />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {product.name} 
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {product.category.name} 
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              ${product.price}
            </div>
          </div>
        </Link>
      </li>
  )
}

export default ProductCardHorizontal
