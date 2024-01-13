import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice.js";
import Image from '../../images/register-image.jpg';
import './Register.css'

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector(state => state.auth);

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({username, email, password}).unwrap()
                dispatch(setCredentials({...res}))
                toast.success('User successfully registered');
            } catch (error) {
                //console.log(error)
                toast.error(error)
            }
        }
    }

  return (
    <section className="lg:pl-[7rem] sm:pl-[1rem] flex justify-between flex-wrap text-white">
        <div className="mt-[5rem] lg:w-1/3 sm:w-full register-container">
            <h1 className="text-2xl font-semibold mb-4">Register</h1>
            <form onSubmit={submitHandler} className="container w-full">
                <div className="my-[2rem]">
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input 
                        type="text" 
                        id='name' 
                        className="mt-1 p-2 border rounded w-full bg-zinc-600" 
                        placeholder="Enter your name..." 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                    <input 
                        type="email" 
                        id='email' 
                        className="mt-1 p-2 border rounded w-full bg-zinc-600" 
                        placeholder="Enter your email..." 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                    <input 
                        type="password" 
                        id='confirmPassword' 
                        className="mt-1 p-2 border rounded w-full bg-zinc-600" 
                        placeholder="Confirm your password..." 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button disabled={isLoading} type='submit' className="bg-pink-500 px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading ? "Registering..." : "Register"}</button>

                {isLoading && <Loader />}
            </form>
            <div className="mt-4">
                <p>Already have an account? {" "}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-pink-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
        <img src={Image} alt="colourful-picture" className="xl:mt-[0rem] sm:mt-[5rem] register-image-hide xl:h-[55rem] mr-[1rem] w-[59%] lg:block md:hidden sm:hidden rounded-lg"/>
    </section>
  )
}
