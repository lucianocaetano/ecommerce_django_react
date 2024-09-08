import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon } from '@heroicons/react/20/solid'
import { useDarkMode } from '../store/theme'
import { useQuery } from '@tanstack/react-query'
import {ICategory} from "../Interface"
import { get_categories } from "../api/categories"
import {get_products_filter} from '../api/products'
import { Product } from "../Interface"
import ProductCard from '../components/ProductCard'
import {useParams} from 'react-router-dom'

export default function Example() {
  const { category } = useParams()
  const [filter, setFilter] = useState<undefined | string>(category)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const {darkMode} = useDarkMode()

  const {
    data: categories, isLoading
  } = useQuery({queryKey: ["categories"], queryFn: ()=>get_categories()});

  const products = useQuery({queryKey: ["products_filters"], queryFn: ()=>get_products_filter(filter)});

  const handleChangeFilter = (option: undefined | string) => {
    setFilter(option)
  }

  useEffect(()=>{
    products.refetch()
  }, [filter])

  return (
    <div>
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex ">
            <DialogPanel
              transition
              className="relative ml-auto flex w-full max-w-xs transform flex-col shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className={`${darkMode? "dark": ""} h-full bg-white dark:bg-gray-900 py-4 pb-12 overflow-y-auto`}>
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium dark:text-white text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 dark:text-white text-gray-400"
                  >
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  <div className="space-y-6">
                    <div id="countries" className="border-l-4 p-2  border-r-4 border-gray-600 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <label className="cursor-pointer">
                        <input type="radio" name="category" className="me-1" onClick={()=>handleChangeFilter(undefined)}/>
                        All
                      </label>
                      {!isLoading && categories.map((category: ICategory) => (
                        <div className="my-1" key={category.id}>
                          <label className="cursor-pointer">
                            <input type="radio" name="category" className="me-1" onClick={()=>handleChangeFilter(category.name)}/>
                            {category.name}
                          </label>
                          {
                            category.children?.map((child: ICategory) => (
                              <div className="my-1 ml-4 border-l-4 border-gray-600 p-2" key={child.id}>
                                <label className="cursor-pointer">
                                  <input type="radio" name="category" className="me-1" onClick={()=>handleChangeFilter(child.name)}/>
                                  {child.name}
                                </label>
                              </div>
                            ))
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900">Categories</h1>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="mt-4 max-lg:hidden">
                <div className="space-y-6">
                  <div id="countries" className="border-l-4 p-2  border-r-4 border-gray-600 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <label className="cursor-pointer">
                      <input type="radio" name="category" className="me-1" onClick={()=>handleChangeFilter(undefined)}/>
                      All
                    </label>
                    {!isLoading && categories.map((category: ICategory) => (
                      <div className="my-1" key={category.id}>
                        <label className="cursor-pointer">
                          <input type="radio" name="category" className="me-1" onClick={()=>handleChangeFilter(category.name)}/>
                          {category.name}
                        </label>
                        {
                          category.children?.map((child: ICategory) => (
                            <div className="my-1 ml-4 border-l-4 border-gray-600 p-2" key={child.id}>
                              <label className="cursor-pointer">
                                <input type="radio" name="category" className="me-1" onClick={()=>handleChangeFilter(child.name)}/>
                                {child.name}
                              </label>
                            </div>
                          ))
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="grid pt-11 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {
                    !products.isLoading && products.data.results.map((product: Product)=>(
                      <ProductCard product={product} key={product.id}/>
                    ))
                  }
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

