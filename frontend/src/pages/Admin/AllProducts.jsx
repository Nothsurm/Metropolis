import { Link } from "react-router-dom";
import moment from 'moment';
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

export default function AllProducts() {
    const {data: products, isLoading, isError} = useAllProductsQuery()

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <div>Error loading products</div>
    }

  return (
    <div className="container xl:mx-[9rem] mt-20">
        <div className="flex flex-col flex-wrap">
            <div className="p-3">
                <div className="xl:ml-[2rem] sm:ml=[0rem] text-xl font-bold h-12">
                    All Products ({products.length})
                </div>
                <div className="flex flex-wrap xl:justify-around sm:justify-start">
                    {products.map((product) => (
                        <Link 
                            key={product._id} 
                            to={`/admin/product/update/${product._id}`} 
                            className="block mb-4 overflow-hidden"
                        >
                            <div className="flex">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-[8rem] sm:w-[10rem] object-cover"
                                />
                                <div className="p-4 flex flex-col justify-around">
                                    <div className="flex justify-between">
                                        <h5 className="sm:text-xl font-semibold mb-2">
                                            {product?.name}
                                        </h5>
                                        <p className="text-gray-400 text-sm hidden sm:block">
                                            {moment(product.createAt).format('MMMM Do YYYY')}
                                        </p>
                                    </div>
                                    <p className="text-gray-400 xl:w-[30rem] text-sm mb-4 hidden sm:block">
                                        {product?.description?.substring(0, 160)}...
                                    </p>
                                    <div className="flex justify-between">
                                        <Link 
                                            to={`/admin/product/update/${product._id}`} 
                                            className="inline-flex flex-items px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                                        >
                                            Update Product
                                        </Link>
                                        <p className="hidden sm:block">$ {product?.price}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="md:w-1/4 p-3 mt-2">
                <AdminMenu />
            </div>
        </div>
    </div>
  )
}
