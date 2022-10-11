import { Route, Routes } from "react-router-dom"
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";

export default function App() {
    return (
        <div className="App h-screen">
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </div>   
    )
}
