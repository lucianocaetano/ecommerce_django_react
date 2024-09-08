export interface ICartItem {
  id: number
  product: Product 
  quantity: number
}

export interface ICategory {
  id: number
  name: string
  children?: Array<ICategory>
}

export interface Cart {
  id: number
  subtotal: number
  count: number
}

export interface Product {
  url: string
  id: number 
  slug: string
  in_stock: boolean
  reviews_set: Array<string>
  images: Image[]
  name: string
  description: string
  price: number
  rating?: number
  category: string
  quantity: number
  user: string
  created: string
  num_reviews?: number
}

export interface Image {
  image: string
}

export interface Page {
  next: string | null
  previous: string | null
  count: number
  results: Array<Product>
}

export interface Token {
    exp: number
    is_staff: boolean
    user_id: number
    avatar: string
}
