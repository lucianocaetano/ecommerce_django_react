import { create } from "zustand"
import { persist } from "zustand/middleware";
import { Product, Cart, CartItem } from "../Interface";

interface State {
  cart: Cart | null
  cartItems: CartItem[]
  hiddenMenu: boolean
  totalPrice: number
}

interface Actions {
  addToCart: (Item: Product) => void
  toggleHiddenMenu: () => void
  removeFromCart: (Item: Product) => void
  removeAll: () => void
}

const State = {
  cart: null,
  cartItems: [],
  totalPrice: 0,
}

export const useCartStore = create(persist<State & Actions>((set, get) => ({
  cart: State.cart,
  cartItems: State.cartItems,
  totalPrice: State.totalPrice,
  hiddenMenu: false,
  removeAll: () => {
    set({
       cart: null,
       totalPrice: 0,
    })
  },
  toggleHiddenMenu: () => {set(state => ({...state, hiddenMenu: !state.hiddenMenu}))},
  addToCart: (product: Product) => {
   const cartItems = get().cartItems
   const items = cartItems?.find((item: CartItem) => item.product.url === product.url)

   if (items) {
    const updatedCart = cartItems?.map((item: CartItem) =>
     item.product.url === product.url ? { ...item, quantity: (item.quantity as number) + 1 } : item
    )
    set(state => ({
     cartItems: updatedCart,
     totalPrice: state.totalPrice + Number(product.price),
    }))
   } else {
    const updatedCartItems = cartItems?.concat([{product, quantity: 1 }])
    set(state => ({
     ...state,
     cartItems: updatedCartItems,
     totalPrice: state.totalPrice + Number(product.price),
    }))
   }
  },

  removeFromCart: (product: Product) => {
   const cartItems = get().cartItems
   const cartItem = cartItems?.find((item: CartItem) => item.product.url === product.url)

   if (cartItem && cartItem.quantity && cartItem.quantity > 1) {
    const updatedCart = cartItems.map((item: CartItem) =>
     item.product.url === product.url ? { ...item, quantity: (item.quantity as number) - 1 } : item
    )
    set(state => ({
     cartItems: updatedCart,
     totalPrice: state.totalPrice - Number(product.price),
    }))
   } else {
     set(state => ({
       ...state,
       cartItems: state.cartItems?.filter((item: CartItem) => item.product.url !== product.url),
       totalPrice: state.totalPrice - Number(product.price),
     }))
   }
  },
}),{name: "cartItems-storage",}))
