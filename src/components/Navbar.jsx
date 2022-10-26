import { Link, useLocation } from "react-router-dom"
import { PencilSquareIcon, UserIcon } from "@heroicons/react/24/outline"

export default function Navbar() {
    const location = useLocation()

    return (
        <nav className="flex justify-between py-6 px-4 sm:px-6 lg:px-20">
            <div>
                <h1 className="text-indigo-700 text-3xl font-bold">Tasky</h1>
            </div>
            {location.pathname === '/' ? (
                <Link className="rounded-lg text-slate-700 text-md px-2 font-semibold transition flex items-center hover:bg-slate-50" to='/profile'>
                    <UserIcon className="h-5 w-5 text-slate-700 mr-1"/>
                    <span>Profile</span>
                </Link>
            ) : (
                <Link className="rounded-lg text-slate-700 text-md px-2 font-semibold transition flex items-center hover:bg-slate-50" to='/'>
                    <PencilSquareIcon className="h-5 w-5 text-slate-700 mr-1"/>
                    <span>My Tasks</span>
                </Link>
            )}
        </nav>
    )
}