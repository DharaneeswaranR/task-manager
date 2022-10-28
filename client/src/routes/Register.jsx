import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import registerImg from '../assets/register-image.svg'

export default function Register() {
    const inputEl = useRef(null)
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [formData, setFormData] = useState(
        {
            username: "",
            email: "",
            password: ""
        }
    )

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [navigate])

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
            const { username, email, password } = formData

            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user`, { username, email, password })
                localStorage.setItem("token", res.data.token)
                navigate('/')
            } catch (e) {
                setError(true)
                setFormData({
                    username: "",
                    email: "",
                    password: ""
                })
            }  
            
        }
    }

    return (
        <div className='flex justify-center h-screen text-slate-800'>
            <div className='hidden sm:flex items-center justify-center w-[55%] p-10'>
                <img src={registerImg} className="lg:max-w-lg" alt="login page" />
            </div>
            <div className='flex justify-center flex-col bg-indigo-100 p-4 w-full md:p-10 lg:p-20 sm:w-[45%] sm:rounded-l-3xl'>
                <h1 className='font-bold text-4xl pb-3'>Register</h1>
                <p className='pb-10 font-semibold'>Please register to continue.</p>
                {error && 
                    <p className='text-red-600'>Email already exists! Try logging in.</p>
                }
                <form>
                    <label htmlFor="username" className='block mt-2 mb-1 text-lg'>Username</label>
                    <input
                        type="text"
                        name="username"
                        id="user-name"
                        placeholder='username'
                        className='input-field'
                        onChange={handleChange}
                        value={formData.username}
                        required
                    />
                    <label htmlFor="email" className='block mt-2 mb-1 text-lg'>Email</label>
                    <input
                        type="email"
                        name='email'
                        id="email"
                        className='input-field'
                        placeholder='email'
                        onChange={handleChange}
                        value={formData.email}
                        ref={inputEl}
                        required
                    />
                    <label htmlFor="password" className='block mt-2 mb-1 text-lg'>Password</label>
                    <input
                        type="password"
                        name='password'
                        id="password"
                        className='input-field'
                        placeholder='password'
                        minLength={8}
                        onChange={handleChange}
                        value={formData.password}
                        ref={inputEl}
                        required
                    />
                    <button onClick={handleSubmit} className='p-3 mt-10 mb-5 rounded-lg w-full bg-indigo-700 text-white text-lg font-semibold hover:bg-indigo-800 active:bg-indigo-500 duration-300'>
                        Register
                    </button>
                    <p className='text-center'>Already have an account?
                        <Link to="/login" className='text-indigo-700 font-semibold'> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
