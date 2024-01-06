import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";
import Image from '../../images/login-image.jpg';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await login({email, password}).unwrap()
            console.log(res)
            dispatch(setCredentials({...res}))
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    document.body.style.backgroundColor = 'rgb(16,16,16)'

  return (
    <div>
        <section className="pl-[10rem] flex flex-wrap text-white">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                        <input 
                            type="email" 
                            id='email' 
                            className="mt-1 p-2 border rounded w-full bg-zinc-600" 
                            placeholder="Enter your email..."
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />                     
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input 
                            type="password" 
                            id='password' 
                            className="mt-1 p-2 border rounded w-full bg-zinc-600"
                            placeholder="Enter your password..." 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        disabled={isLoading} 
                        type="submit" 
                        className="bg-pink-500 px-4 py-2 rounded cursor-pointer my=[1rem] hover:bg-pink-600 transition-bg ease-in-out duration-200"
                    >
                        {isLoading ? "Signing In..." : "Sign In"}

                        {isLoading && <Loader />}
                    </button>
                </form>
                <div className="mt-4">
                    <p>
                        New Customer? {""}
                        <Link to={redirect ? `/register?redirect=${redirect}` : `/register`} className="text-pink-500 hover:underline ml-2">Register</Link>
                    </p>
                </div>
            </div>
             <img src={Image} alt="person-on-computer" className="h-[57rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"/>
        </section>
    </div>
  )
}
