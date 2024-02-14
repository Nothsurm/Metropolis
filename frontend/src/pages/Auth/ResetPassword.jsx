import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import Axios from 'axios'

export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {token} = useParams()

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (password === '') {
            toast.error('Please enter a password')
            setLoading(false)
            return
        }
        if (password !== confirmPassword) {
            toast.error('Passwords must match')
            setLoading(false)
            return
        } else {
            Axios.post('https://metropolis-k549.onrender.com//resetPassword/'+token, {
                password
            }).then(response => {
                if (response.status) {
                    toast.success('Password has been successfully reset')
                    setLoading(false)
                    navigate('/login')
                    //console.log(response.data)
                } else {
                    toast.error(error.data.message)
                    setLoading(false)
                }
            }).catch(err => {
                //console.log(err);
                toast.error(err.message)
                setLoading(false)
            }) 
        }
    }
  return (
    <div>
        <section className="lg:pl-[7rem] sm:pl-[1rem] flex justify-center items-center flex-wrap text-white">
            <div className="mt-[5rem] lg:w-1/3 sm:w-full w-[90%] ml-[1rem]">
                <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                <form onSubmit={submitHandler} className="container w-full">
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium">New Password</label>
                        <input 
                            type="password" 
                            id='password' 
                            className="mt-1 p-2 border rounded w-full bg-zinc-600" 
                            placeholder="******"
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />                     
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm New Password</label>
                        <input 
                            type="password" 
                            id='confirmPassword' 
                            className="mt-1 p-2 border rounded w-full bg-zinc-600" 
                            placeholder="******" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={loading}
                        type='submit'
                        className="bg-pink-500 px-4 py-2 rounded cursor-pointer my=[1rem] hover:bg-pink-600" 
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </section>
    </div>
  )
}
