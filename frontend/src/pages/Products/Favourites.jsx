import { useSelector } from "react-redux";
import { selectFavouriteProduct } from "../../redux/features/favourites/favouriteSlice.js";
import Product from "./Product.jsx";

export default function Favourites() {
    const favourites = useSelector(selectFavouriteProduct)

  return (
    <div className="mt-20 md:ml-[10rem] sm:ml-[0rem]">
        <h1 className="text-xl font-bold ml-[3rem] mt-[3rem]">
            FAVOURITE PRODUCTS
        </h1>
        <div className="flex flex-wrap">
            {favourites.map((product) => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    </div>
  )
}
