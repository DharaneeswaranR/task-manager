import { Route, Routes } from "react-router-dom"
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { PrivateRoute } from "./utils/utils";

export default function App() {
    const [user, setUser] = useState({})

    return (
        <div className="App h-screen">
            <UserContext.Provider value={[user, setUser]}>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route element={<PrivateRoute />} >
                        <Route exact path='/' element={<Home />} />
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                </Routes>
            </UserContext.Provider>    
        </div>   
    )
}
