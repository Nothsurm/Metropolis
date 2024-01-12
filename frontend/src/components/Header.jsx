import { useGetTopProductQuery } from "../redux/api/productApiSlice.js";
import Loader from "./Loader.jsx";
import SmallProduct from "../pages/Products/SmallProduct.jsx";
import ProductCarousel from "../pages/Products/ProductCarousel.jsx";
import './Header.css'

export default function Header() {
    const { data, isLoading, error } = useGetTopProductQuery();
    
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <h1>ERROR</h1>
    }

  return (
    <>
        <div className="flex justify-around flex-wrap">
            <div className="xl:block lg:block md:hidden sm:hidden">
                <div className="grid grid-cols-2" id='small-products'>
                    {data.map((product) => (
                        <div key={product._id}>
                            <SmallProduct product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <ProductCarousel />
        </div>
    </>
  )
}
