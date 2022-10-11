import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between py-3 px-5">
            <div>
                <h1 className="text-indigo-700 text-3xl font-bold">Tasky</h1>
            </div>
            <div>
                <UserIcon className="h-6 w-6 m-0 inline-block"/>
                <Link to='/profile'>
                    Profile
                </Link>
            </div>
        </nav>
    )
}