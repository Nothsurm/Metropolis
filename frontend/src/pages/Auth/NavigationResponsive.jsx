import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/auth/authSlice.js";
import { RiArrowDropDownLine } from "react-icons/ri";
import FavouritesCount from "../Products/FavouritesCount.jsx";
import './NavigationResponsive.css';

export default function NavigationResponsive() {
    const { userInfo } = useSelector((state) => state.auth)
    const { cartItems } = useSelector((state) => state.cart)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

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
        className='w-[100%] min-h-20 fixed xl:hidden sm:flex sm:items-center bg-black'
    >
        <div className="flex flex-row justify-around w-[100%] sm:hidden md:flex" id='navigation-responsive'>
            <Link 
                to='/' 
                className="flex items-center hover:text-slate-400"
            >
                <span className="">HOME</span>
            </Link>
            <Link 
                to='/shop' 
                className="flex items-center hover:text-slate-400"
            >
                <span className="">SHOP</span>
            </Link>
            <Link 
                to='/cart' 
                className="flex items-center hover:text-slate-400"
            >
                <span className="">CART</span>
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
                className="flex items-center hover:text-slate-400"
            >
                <span className="">FAVOURITES</span>
                <FavouritesCount />
            </Link>

            {!userInfo && (
                <>
                    <Link 
                        to='/login' 
                        className="flex items-center hover:text-slate-400"
                    >
                        <span>LOGIN</span>
                    </Link>
                    <Link 
                        to='/register' 
                        className="flex items-center hover:text-slate-400"
                    >
                        <span>REGISTER</span>
                    </Link>
                </>
            )}
        </div>

        {userInfo ? (
            <div className="relative flex justify-around w-full md:hidden">
                <div className="flex items-center">
                    <button onClick={toggleMenu}>
                        <div className="w-6 h-1 bg-gray-200 my-1"></div>
                        <div className="w-6 h-1 bg-gray-200 my-1"></div>
                        <div className="w-6 h-1 bg-gray-200 my-1"></div>
                    </button>
                </div>
                <button onClick={toggleDropdown} className="flex items-center text-gray-800 focus:outline-none ">
                    {userInfo ? (
                        <span className="text-white">{userInfo.username}</span>
                        ) : (
                        <></>
                    )}

                    {userInfo && (
                        <RiArrowDropDownLine size={28} className="text-white hover:text-slate-400"/>
                    )}
                </button>
            </div>
        ) : (
            <></>
        )}

        {!userInfo ? (
            <div className="relative flex justify-around w-full md:hidden">
                <div className="flex items-center">
                    <button onClick={toggleMenu}>
                        <div className="w-6 h-1 bg-gray-200 my-1"></div>
                        <div className="w-6 h-1 bg-gray-200 my-1"></div>
                        <div className="w-6 h-1 bg-gray-200 my-1"></div>
                    </button>
                </div>
                <button onClick={toggleDropdown} className="flex items-center text-gray-800 focus:outline-none">
                    {userInfo ? (
                        <span className="text-white">{userInfo.username}</span>
                        ) : (
                        <></>
                    )}

                    {userInfo && (
                        <RiArrowDropDownLine size={28} className="text-white hover:text-slate-400"/>
                    )}
                </button>
                <>
                    <Link 
                        to='/login' 
                        className="flex items-center hover:text-slate-400"
                    >
                        <span>LOGIN</span>
                    </Link>
                    <Link 
                        to='/register' 
                        className="flex items-center hover:text-slate-400"
                    >
                        <span>REGISTER</span>
                    </Link>
                </>
            </div>
        ) : (
            <></>
        )}
        
        {dropdownOpen && userInfo && (
            <div>
                <ul className={`absolute right-10 top-14 space-y-2 bg-zinc-900 text-white`}>
                    {userInfo.isAdmin && (
                        <>
                            <li>
                                <Link to='/admin/dashboard' className="px-4 py-2 hover:bg-zinc-800">Dashboard</Link>
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
            </div>
        )}


        {isMenuOpen && (
            <section className="bg-[#151515] p-4 fixed left-10 top-14">
                <ul className="list-none mt-2">
                    <li>
                        <Link 
                            to='/' 
                            className="flex items-center hover:text-slate-400"
                        >
                            <span className="">HOME</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/shop' 
                            className="flex items-center hover:text-slate-400"
                        >
                            <span className="">SHOP</span>
                        </Link>
                    </li>
                    <li>
                    <Link 
                        to='/cart' 
                        className="flex items-center hover:text-slate-400"
                    >
                        <span className="">CART</span>
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
                    </li>
                    <li>
                        <Link 
                            to='/favourite' 
                            className="flex items-center transition-transform transform hover:translate-x-2 hover:text-slate-400"
                        >
                            <span className="">FAVOURITES</span>
                            <FavouritesCount />
                        </Link>
                    </li>
                </ul>
            </section>
        )}
    </div>
  )
}
