import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

export default function UsersOrder() {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery()
  return (
    <div className="container mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
        {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.error || error.error}</Message>) : (
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="py-2">IMAGE</td>
                        <td className="py-2 invisible sm:visible">ID</td>
                        <td className="py-2 invisible sm:visible">DATE</td>
                        <td className="py-2 invisible sm:visible">TOTAL</td>
                        <td className="py-2">PAID</td>
                        <td className="py-2">DELIVERED</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <img 
                                src={order.orderItems[0].image} 
                                alt={order.user} 
                                className="w-[6rem] mb-5"
                            />
                            <td className="py-2 invisible sm:visible">{order._id}</td>
                            <td className="py-2 invisible sm:visible">{order.createdAt.substring(0, 10)}</td>
                            <td className="py-2 invisible sm:visible">$ {order.totalPrice}</td>

                            <td className="py-2 larger-screen-size">
                                {order.isPaid ? (
                                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                                        Completed
                                    </p>
                                ) : (
                                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                        Pending
                                    </p>
                                )}
                            </td>
                            <td className="px-2 py-2 larger-screen-size">
                                {order.isDelivered ? (
                                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                                        Delivered
                                    </p>
                                ) : (
                                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                        Pending
                                    </p>
                                )}
                            </td>
                            <td className="px-2 py-2 larger-screen-size">
                                <Link to={`/order/${order._id}`}>
                                    <button className="bg-pink-400 text-black py-2 px-3 rounded ">
                                        View Details
                                    </button>
                                </Link>
                            </td>
                            <td className="py-2 smaller-screen-size">
                                {order.isPaid ? (
                                    <p className="text-center">
                                        ✅
                                    </p>
                                ) : (
                                    <p className="text-center">
                                        ❌
                                    </p>
                                )}
                            </td>
                            <td className="px-2 py-2 smaller-screen-size">
                                {order.isDelivered ? (
                                    <p className="text-center">
                                        ✅
                                    </p>
                                ) : (
                                    <p className="text-center">
                                        ❌
                                    </p>
                                )}
                            </td>
                            <td className="px-2 py-2 smaller-screen-size">
                                <Link to={`/order/${order._id}`}>
                                    <button className="bg-pink-400 text-black py-2 px-3 rounded">
                                        View Details
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}
