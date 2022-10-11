import { UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser() {
            const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/me`, { 
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            setUser(user.data)
        }

        fetchUser()
    }, [])

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center h-screen">
                <div>
                    <div className="rounded-full h-24 w-24 p-2 my-2 mx-auto bg-slate-200">
                        <UserIcon />
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold text-slate-800">{user.username}</p>
                        <p className="text-slate-500">{user.email}</p>
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}