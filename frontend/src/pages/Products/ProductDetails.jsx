import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice.js";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa';
import moment from "moment";
import HeartIcon from "./HeartIcon";

export default function ProductDetails() {
    const { id: productId } = useParams()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)

    const { userInfo } = useSelector(state => state.auth)

    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation()
  return (
    <>
        <div>
            <Link to='/' className="text-white font-semibold hover:underline ml-[10rem]">
                Go Back
            </Link>
        </div>
        {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.message}</Message>) : (
            <>
                <div className="flex flex-wrap relative justify-between mt-[2rem] ml-[10rem]">
                    <div>
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full xl:w-[40rem] l:w-[35rem] md:w-[30rem] sm:w-[20rem] mr-[8rem]"
                        />
                        <HeartIcon product={product} />
                    </div>
                    <div className="flex flex-col justify-between">
                        <h2 className="text-2xl font-semibold">{product.name}</h2>
                        <p className="my-4 xl:w-[35rem] lg:w-[30rem] md:w-[25rem] text-[#B0B0B0]">{product.description}</p>
                        <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>
                        <div className="flex items-center justify-between w-[30rem]">
                            <div className="one w-[14rem]">
                                <h1 className="flex items-center mb-6">
                                    <FaStore className="mr-2 text-white"/> Brand: {product.brand}
                                </h1>
                                <h1 className="flex items-center mb-6">
                                    <FaClock className="mr-2 text-white"/> Added: {moment(product.createAt).fromNow()}
                                </h1>
                                <h1 className="flex items-center mb-6">
                                    <FaStar className="mr-2 text-white"/> Reviews: {product.numReviews}
                                </h1>
                            </div>
                            <div className="ml-2 w-[14rem]">
                                <h1 className="flex items-center mb-6">
                                    <FaStar className="mr-2 text-white" /> Ratings: {product.rating}
                                </h1>
                                <h1 className="flex items-center mb-6">
                                    <FaShoppingCart className="mr-2 text-white" /> Quantity: {product.quantity}
                                </h1>
                                <h1 className="flex items-center mb-6">
                                    <FaBox className="mr-2 text-white" /> In Stock: {product.countInStock}
                                </h1>
                            </div>
                        </div>
                        <div className="flex justify-between flex-wrap">
                            {/* Ratings*/}
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
  )
}
