import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import { delete_product, get_products_search } from "../../api/products";
import {
  useMutation,
  useQueryClient,
  useQuery
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Product } from "../../Interface";
import { useEffect } from "react";

interface Props {
  search: string | null
}

const Products = ({ search }: Props) => {
  const queryClient = useQueryClient();
  
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({queryKey: ["products_search"], queryFn: ()=>get_products_search(search)});

  useEffect(()=>{refetch()}, [search])
  
  const deleteProdMutation = useMutation({
    mutationFn: (id: number)=>delete_product(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["products_search"]})
      toast.success("Product deleted!");
    },
    onError: () => {
      toast.error("Error!");
    },
  });

  if (deleteProdMutation.isLoading) {return <p>loading...</p>}

  if (error instanceof Error) {return <>{toast.error(error.message)}</>;}

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Detail 
            </th>
            <th scope="col" className="px-4 py-3">
              Name
            </th>

            <th scope="col" className="px-4 py-3">
              Price
            </th>

            <th scope="col" className="px-4 py-3">
              Count in stock
            </th>

            <th
              scope="col"
              className="px-4 py-3 flex justify-center gap-4"
            >
              Actions
              <Link to="add">
                <AiFillPlusSquare
                  size={22}
                  className="text-green-300 cursor-pointer"
                />
              </Link>
            </th>
          </tr>
        </thead>
        <>
          <tbody>
            {data?.results.map((product: Product, index: number) => (
              <tr className="border-b dark:border-gray-700" key={index}>
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/product/${product.slug}`} className="px-3 rounded-md py-2 bg-orange-400">Ir</Link>
                </th>

                <td className="px-4 py-3">
                  {product.name}
                </td>

                <td className="px-4 py-3">
                  $ {product.price}
                </td>

                <td className="px-4 py-3">
                  {product.in_stock ? product.quantity: ("dd")}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-4">
                    <BsFillTrashFill
                      onClick={() => {
                        if (
                          product.id !==
                          undefined
                        ) {
                          deleteProdMutation.mutate(
                            product.id
                          );
                        }
                      }}
                      size={22}
                      className="text-red-300 cursor-pointer"
                    />

                    <Link
                      to={`edit/${product.id}`}
                    >
                      <AiFillEdit
                        size={22}
                        className="text-green-300 cursor-pointer"
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          
          {!isLoading &&
            data?.pages?.length !== undefined &&
            data.pages.length > 0 &&
            <div>
              {isLoading? (
                <p>loading...</p>
              ) : null}
            </div>
          }
        </>
      </table>
    </div>
  );
};
export default Products;
