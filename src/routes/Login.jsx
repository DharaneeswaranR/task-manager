import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoginImg from '../assets/login-image.svg'

export default function Login() {
    const inputEl = useRef(null)
    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    )

    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await axios.get('http://localhost:5000/hello')
    //         console.log(res.data)
    //     }

    //     fetchData()
    // }, [])

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        if (inputEl.current.checkValidity()) {
            event.preventDefault()
            
            await axios.post('http://localhost:5000/user', { })
        }
    }

    return (
        <div className='flex justify-center bg-indigo-100 h-screen text-slate-800'>
            <div className='hidden sm:flex items-center justify-center w-[55%] p-10'>
                <img src={LoginImg} className="lg:max-w-md" alt="login page" />
            </div>
            <div className='flex justify-center flex-col bg-white p-4 w-full md:p-10 lg:p-20 sm:w-[45%] sm:rounded-l-3xl'>
                <h1 className='font-bold text-4xl pb-3'>Welcome!</h1>
                <p className='pb-10 font-semibold'>Please login to continue.</p>
                <form>
                    <label htmlFor="email" className='block py-2 text-lg'>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='input-field'
                        placeholder='email'
                        onChange={handleChange}
                        value={formData.email}
                        ref={inputEl}
                        required
                    />
                    <label htmlFor="password" className='block py-2 text-lg'>Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        className='input-field'
                        placeholder='password'
                        onChange={handleChange}
                        value={formData.password}
                        minLength={8}
                        ref={inputEl}
                        required
                    />
                    <button onClick={handleSubmit} className='p-3 mt-10 mb-5 rounded-lg w-full bg-indigo-700 text-white text-lg font-semibold hover:bg-indigo-800 active:bg-indigo-500 duration-300'>
                        Login
                    </button>
                    <p className='text-center'>Don't have an account yet?
                        <Link to="/register" className='text-indigo-700 font-semibold'> Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
