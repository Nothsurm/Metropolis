import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/auth/authSlice.js";
import { RiArrowDropDownLine } from "react-icons/ri";

import './Navigation.css';
import FavouritesCount from "../Products/FavouritesCount.jsx";

export default function Navigation() {
    const { userInfo } = useSelector((state) => state.auth)
    const { cartItems } = useSelector((state) => state.cart)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div 
        style={{zIndex: 999}} 
        className='xl:flex sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] h-[100vh] fixed'
        id="navigation-container"
    >
        <div className="flex flex-col justify-center space-y-4">
            <Link 
                to='/' 
                className="flex items-center transition-transform transform hover:translate-x-2 hover:text-slate-400"
            >
                <AiOutlineHome className="mr-2 mt-[3rem]" size={26}/>
                <span className="hidden nav-item-name mt-[3rem]">HOME</span>
            </Link>
            <Link 
                to='/shop' 
                className="flex items-center transition-transform transform hover:translate-x-2 hover:text-slate-400"
            >
                <AiOutlineShopping className="mr-2 mt-[3rem]" size={26}/>
                <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
            </Link>
            <Link 
                to='/cart' 
                className="flex items-center transition-transform transform hover:translate-x-2 hover:text-slate-400"
            >
                <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26}/>
                <span className="hidden nav-item-name mt-[3rem]">CART</span>
                <div className="absolute top-9 left-3">
                    {cartItems.length> 0 && (
                        <span>
                            <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        </span>
                    )}
                </div>
            </Link>
            <Link 
                to='/favourite' 
                className="flex items-center transition-transform transform hover:translate-x-2 hover:text-slate-400"
            >
                <FaHeart className="mr-2 mt-[3rem]" size={26}/>
                <span className="hidden nav-item-name mt-[3rem]">FAVOURITES</span>
                <FavouritesCount />
            </Link>
        </div>

        <div className="relative">
            <button onClick={toggleDropdown} className="flex text-gray-800 focus:outline-none">
                {userInfo ? (
                    <span className="text-white">{userInfo.username}</span>
                    ) : (
                    <></>
                )}

                {userInfo && (
                    <RiArrowDropDownLine size={28} className="text-white hover:text-slate-400"/>
                )}
            </button>

            {dropdownOpen && userInfo && (
                <ul className={`absolute right-0 mr-14 space-y-2 bg-zinc-900 text-white ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
                    {userInfo.isAdmin && (
                        <>
                            <li>
                                <Link to='/admin/dashboard' className="block px-4 py-2 hover:bg-zinc-800">Dashboard</Link>
                            </li>
                            <li>
                                <Link to='/admin/productlist' className="block px-4 py-2 hover:bg-zinc-800">Products</Link>
                            </li>
                            <li>
                                <Link to='/admin/categorylist' className="block px-4 py-2 hover:bg-zinc-800">Category</Link>
                            </li>
                            <li>
                                <Link to='/admin/orderlist' className="block px-4 py-2 hover:bg-zinc-800">Orders</Link>
                            </li>
                            <li>
                                <Link to='/admin/userlist' className="block px-4 py-2 hover:bg-zinc-800">Users</Link>
                            </li>
                        </>
                    )}

                    <li>
                        <Link to='/profile' className="block px-4 py-2 hover:bg-zinc-800">Profile</Link>
                    </li>
                    <li>
                        <Link to='/login' onClick={logoutHandler} className="block px-4 py-2 hover:bg-zinc-800">Logout</Link>
                    </li>
                </ul>
            )}
        </div>
        
        {!userInfo && (
        <ul>
            <li>
                <Link 
                    to='/login' 
                    className="flex items-center transition-transform transform hover:translate-x-2 hover:text-slate-400"
                >
                    <AiOutlineLogin className="mr-2 mt-[3rem]" size={26}/>
                    <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>
                </Link>
            </li>
            <li>
                <Link 
                    to='/register' 
                    className="flex items-center transition-transform transform hover:translate-x-2 hover:text-slate-400"
                >
                    <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26}/>
                    <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>
                </Link>
            </li>
        </ul>
        )}
        
    </div>
  )
}
