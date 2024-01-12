import { useGetTopProductQuery } from "../../redux/api/productApiSlice.js";
import Message from "../../components/Message";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from 'react-icons/fa';
import './ProductCarousel.css'

export default function ProductCarousel() {
    const {data: products, isLoading, error} = useGetTopProductQuery();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }
  return (
    <div className="mb-4 xl:block lg:block md:block bg-black rounded-lg" id='product-carousel'>
        {isLoading ? null : error ? (
            <Message variant='danger'>
                {error?.data?.message || error.message}
            </Message>
        ) : <Slider {...settings} className="xl:w-[50rem] lg:w-[45rem] md:w-[40rem] sm:w-[35rem] w-75 sm:block">
                {
                    products.map(({image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock}) => (
                        <div key={_id}>
                            <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem]"/>
                            <div className="flex flex-wrap justfiy-between w-full p-4">
                                <div className="one">
                                    <h2>{name}</h2>
                                    <p>$ {price}</p>
                                    <p className="w-[20rem] mt-4">{description.substring(0, 150)}...</p>
                                </div>
                                <div className="flex justify-between w-[49%] m-4">
                                    <div className="one">
                                        <h1 className="flex items-center mb-6">
                                            <FaStore className="mr-2 text-white"/> Brand: {brand}
                                        </h1>
                                        <h1 className="flex items-center mb-6">
                                            <FaClock className="mr-2 text-white"/> Added: {moment(createdAt).fromNow()}
                                        </h1>
                                        <h1 className="flex items-center mb-6">
                                            <FaStar className="mr-2 text-white"/> Reviews: {numReviews}
                                        </h1>
                                    </div>
                                    <div className="two">
                                        <h1 className="flex items-center mb-6">
                                            <FaStar className="mr-2 text-white"/> Ratings: {Math.round(rating)}
                                        </h1>
                                        <h1 className="flex items-center mb-6">
                                            <FaShoppingCart className="mr-2 text-white"/> Quantity: {quantity}
                                        </h1>
                                        <h1 className="flex items-center mb-6">
                                            <FaBox className="mr-2 text-white"/> In Stock: {countInStock}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>}
    </div>
  )
}
