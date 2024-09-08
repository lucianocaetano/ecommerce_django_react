import React from "react"
import {ICartItem} from "../Interface"

export const CartCard: React.FC<{item: ICartItem, handleDeleteCartItem: (id: number)=>void}> = ({item, handleDeleteCartItem}) => {

  return (
    <li className="flex py-6 ">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.product.images[0].image}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="dark:text-white">
              {item.product.name}
            </h3>
            <p className="ml-4 dark:text-white">{item.product.price * item.quantity}</p>
          </div>
        </div>
        <div className="flex flex-1 item.product.-end mt-8 justify-between text-sm">
          <p className="text-gray-500 dark:text-white">quantity: <span className="text-gray-700 dark:text-white">({item.quantity})</span> </p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={()=>handleDeleteCartItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>

  )
}
