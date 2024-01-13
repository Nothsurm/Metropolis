import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

export default function OrderList() {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
        {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
            <table className="order-list-container mx-auto mt-28 w-[70%] sm:text-sm">
                <AdminMenu />
                <thead className="w-full border">
                    <tr className="mb-[5rem]">
                        <th className="text-left pl-1">ITEMS</th>
                        <th className="text-left pl-1">ID</th>
                        <th className="text-left pl-1 larger-screen-size">USER</th>
                        <th className="text-left pl-1 larger-screen-size">DATE</th>
                        <th className="text-left pl-1">TOTAL</th>
                        <th className="text-left pl-1">PAID</th>
                        <th className="text-left pl-1">DELIVERED</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>
                                <img 
                                    src={order.orderItems[0].image} 
                                    alt={order._id} 
                                    className="pt-4 w-[5rem]"
                                />
                            </td>
                            <td>{order._id}</td>
                            <td className="larger-screen-size">
                                {order.user ? order.user.username : 'N/A'}
                            </td>

                            <td className="larger-screen-size">
                                {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}
                            </td>

                            <td>$ {order.totalPrice}</td>

                            <td className="py-2 large-screen-size">
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
                            <td className="px-2 py-2 large-screen-size">
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
                            <td className="py-2 small-screen-size">
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
                            <td className="px-2 py-2 small-screen-size">
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
                            <td className="w-[6.5rem]">
                                <Link to={`/order/${order._id}`} className="bg-pink-400 text-black py-2 px-3 rounded">
                                    Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </>
  )
}
