import { useContext } from "react"
import axios from "axios"
import { UserIcon, ArrowRightOnRectangleIcon, TrashIcon } from "@heroicons/react/24/outline"
import Navbar from "../components/Navbar"
import { UserContext } from "../contexts/UserContext"

export default function Profile() {
    const [user, setUser] = useContext(UserContext)

    async function logOut() {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        localStorage.removeItem('user')
        setUser({})
    }

    async function deleteAccount() {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user/me`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        localStorage.removeItem('user')
        setUser({})
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-[-84px] h-screen">
                <div>
                    <div className="rounded-full h-24 w-24 p-2 my-2 mx-auto bg-slate-200">
                        <UserIcon className="text-slate-600" />
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold text-slate-800">{user.user?.username}</p>
                        <p className="text-slate-500">{user.user?.email}</p>
                    </div>
                    <div className="flex flex-col p-3">
                        <button 
                            className="flex items-center justify-center px-3 py-1 mb-4 rounded-full w-full bg-indigo-700 text-white font-semibold hover:bg-indigo-800 active:bg-indigo-500 duration-300"
                            onClick={logOut}
                        >
                            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />Logout
                        </button>
                        <button 
                            className="flex items-center justify-center px-3 py-1 mb-5 rounded-full w-full bg-red-700 text-white font-semibold hover:bg-red-800 active:bg-red-500 duration-300"
                            onClick={deleteAccount}
                        >
                            <TrashIcon className="h-5 w-5 mr-1" />Delete account
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}