import { useState } from 'react'
import { Link } from 'react-router-dom'
import Image from '../../images/login-image.jpg'
import { useForgotPasswordMutation } from '../../redux/api/usersApiSlice'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')

    const [forgotPassword, {isLoading}] = useForgotPasswordMutation()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await forgotPassword({email}).unwrap()
            toast.success('A Link has been sent to your email address')
            //console.log(res);
        } catch (error) {
            toast.error(error.data.message)
        }
    }
  return (
    <div>
        <section className="lg:pl-[7rem] sm:pl-[1rem] flex justify-between flex-wrap text-white">
            <div className="mt-[5rem] lg:w-1/3 sm:w-full w-[90%] ml-[1rem]">
                <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
                <form onSubmit={submitHandler} className="container w-full">
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
                    <button
                        disabled={isLoading}
                        type='submit'
                        className="bg-pink-500 px-4 py-2 rounded cursor-pointer my=[1rem] hover:bg-pink-600" 
                    >
                        {isLoading ? "Sending..." : "Send Link"}
                    </button>
                </form>
                <div className="mt-4">  
                    <p>
                        Already have an account? {" "}
                        <Link to='/login' className="text-pink-500 hover:underline ml-2">Login</Link>
                    </p>      
                    <p className='mt-4'>
                        New Customer? {""}
                        <Link to='/register' className="text-pink-500 hover:underline ml-2">Register</Link>
                    </p>      
                </div>
            </div>
            <img src={Image} alt="person-on-computer" className="xl:mt-[0rem] sm:mt-[5rem] xl:h-[55rem] mr-[1rem] w-[59%] hidden lg:block rounded-lg"/>
        </section>
    </div>
  )
}
