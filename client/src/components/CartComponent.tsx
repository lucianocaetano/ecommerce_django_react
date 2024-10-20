import React, {useEffect, useState} from "react"
import {useDarkMode} from "../store/theme"
import { toast } from "react-hot-toast";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {destroy_cart_item, get_cart, create_cart, get_cart_items, update_cart} from "../api/carts"
import {ICartItem, Cart} from "../Interface"
import {CartCard} from "./CartCard"
import Checkout from "./Checkout";

export const CartComponent: React.FC<{hiddenMenu: boolean, toggleHiddenMenu: () => void}> = ({hiddenMenu, toggleHiddenMenu}) => {
  const [checkout, setCheckout] = useState(false)

  const {darkMode} = useDarkMode(state => state)
  const queryClient = useQueryClient()

  const mutateUpdateCart = useMutation({mutationFn: (params: {id: number, count: number, subtotal: number})=>update_cart(params.id, params.count, params.subtotal), onSuccess: () => {
    queryClient.invalidateQueries(["cart"])
  }, onError: (err) => console.error(err)})

  const mutateCreateCart = useMutation({
    mutationFn: create_cart,
    onSuccess: (cart: Cart) => {
      let count: number = 0;
      let subtotal: number = 0;

      const data: ICartItem[] | undefined = queryClient.getQueryData(["cart_items"])

      queryClient.invalidateQueries(["cart"])
      if(data){
        data.forEach((item: ICartItem) => {
          count += item.quantity
          subtotal += item.product.price * item.quantity
        })

        if(cart){
          mutateUpdateCart.mutate({id: cart.id, count, subtotal})
        }
      }

    }
  })

  const {data: cart, isLoading: isLoadingCart} = useQuery({
    queryKey: ["cart"], queryFn: ()=>get_cart(),
    onError: (err) => {
      if(err.response.status === 404){
        mutateCreateCart.mutate()
      }
    }
  })

  const {data: cart_items, isLoading: isLoadingCartItems} = useQuery({
    queryKey: ["cart_items"],
    queryFn: ()=>get_cart_items(),
  })

  const mutateDestroyCartItem = useMutation({mutationFn: (id:number)=>destroy_cart_item(id), onSuccess : (id: number) => {

    toast.success("Remove from cart")
    queryClient.setQueryData(["cart_items"], (cart_items: ICartItem[] | undefined) => {
      if(cart_items){
        const cart_item = cart_items.filter((item: ICartItem) => (item.id === id))[0]

        if(!mutateCreateCart.isLoading){
          const subtotal: number = cart.subtotal - (cart_item.product.price * cart_item.quantity)
          const count: number = cart.count - cart_item.quantity

          mutateUpdateCart.mutate({
            id: cart.id,
            count,
            subtotal
          })
        }
        return cart_items.filter((item: ICartItem) => (item.id !== id))

      }
      return cart_items
    })
  }})

  useEffect(()=>{
    setCheckout(false)
  }, [hiddenMenu])

  const handleDeleteCartItem = (id: number) => { mutateDestroyCartItem.mutate(id) }

  return (
    <>
      <Transition show={hiddenMenu}>
        <Dialog className={`relative z-10 ${darkMode? "dark": ""}`} onClose={toggleHiddenMenu}>
          <Transition.Child
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="bg-white flex h-full dark:bg-gray-900 flex-col overflow-y-scroll shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex item.product.-start justify-between">
                          <Dialog.Title className="text-lg font-medium dark:text-white text-gray-900">Shopping cart</Dialog.Title>
                          <div className="ml-3 flex h-7 item.product.-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={toggleHiddenMenu}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200 overflow-y">
                              {!isLoadingCartItems && cart_items?.map((item: ICartItem) => (
                                <CartCard key={item.id} item={item} handleDeleteCartItem={handleDeleteCartItem}/>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        {!isLoadingCart && (
                          <>
                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                              <p>Total Products:</p>
                              <p>{cart.count}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                              <p>Subtotal:</p>
                              <p>${cart.subtotal}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

                            <button onClick={()=>setCheckout(true)} className="flex ml-auto w-full text-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                              Checkout
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
      {
        hiddenMenu && checkout && (
          <Checkout amount={cart.subtotal}/>
        )
      }
    </>
  )
}
