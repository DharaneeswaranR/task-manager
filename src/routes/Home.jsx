import { useState, useEffect, useRef, useContext } from "react"
import { PlusIcon } from '@heroicons/react/20/solid'
import autoAnimate from '@formkit/auto-animate'
import axios from "axios"
import { sortTasks } from "../utils/utils"
import Navbar from "../components/Navbar"
import Task from "../components/Task"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export default function Home() {
    const [tasks, setTasks] = useState([])
    const [description, setDescription] = useState("")
    const [user, setUser] = useContext(UserContext)
    const [sort, setSort] = useState(0) // 0: all, 1: completed, 2: Uncompleted
    const listRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        listRef.current && autoAnimate(listRef.current);
    }, [listRef])


    useEffect(() => {
        try {
            async function fetchTasks() {
                const tasks = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/task`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })

                setTasks([...tasks.data])
            }

            fetchTasks()
        } catch (error) {
            navigate('/login')
        }   
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function fetchUser() {
        const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/me`, { 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        setUser(user.data)
    }

    if (Object.keys(user).length === 0) {
        fetchUser()
    }  

    async function addTask() {
        const newTask = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/task`, { description, completed: false }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        setTasks(prevTasks => {
            return [
                ...prevTasks,
                newTask.data
            ]
        })

        setDescription("")
    }

    async function handleChange(id, event) {
        const updatedTask = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/task/${id}`, { completed: event.target.checked }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task => task._id === id ? updatedTask.data : task)

            return updatedTasks
        })
    }

    async function deleteTask(id) {
        const deletedTask = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/task/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter(task => task._id !== deletedTask.data._id)         

            return updatedTasks
        })
    }
    
    return (
        <> 
            <Navbar />
            <div className="w-3/4 lg:w-1/2 mt-10 mx-auto text-slate-800">
                <h1 className="text-4xl font-semibold">Hello {user.username} 👋</h1>
                <div className="flex justify-center mb-10 mt-8">
                    <div className="flex w-full">
                        <input 
                            type="text" 
                            className="p-2.5 w-full bg-indigo-50 mr-3 rounded-md outline-none"
                            placeholder="add some task"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            onKeyDown={(event) => event.key === "Enter" && addTask()}
                        />
                        <button 
                            className="py-2.5 pl-4 pr-5 flex items-center rounded-full bg-indigo-700 text-white text-md font-semibold hover:bg-indigo-800 active:bg-indigo-500 duration-300"
                            onClick={addTask}
                        >
                            <PlusIcon className="h-6 w-6"/>
                            Add
                        </button>
                    </div>    
                </div>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-xl mb-2">Your tasks 📝</h2>
                    <div className="mb-3">
                        <button 
                            className={`sort-btn ${sort === 0 ? 'bg-indigo-700 text-white' : 'bg-indigo-50'}`} 
                            onClick={() => setSort(0)}
                        >All tasks
                        </button>
                        <button 
                            className={`sort-btn ${sort === 1 ? 'bg-indigo-700 text-white' : 'bg-indigo-50'}`} 
                            onClick={() => setSort(1)}
                        >Completed
                        </button>
                        <button 
                            className={`sort-btn ${sort === 2 ? 'bg-indigo-700 text-white' : 'bg-indigo-50'}`}
                            onClick={() => setSort(2)}
                        >Uncompleted
                        </button>
                    </div> 
                    <div className="mt-2" ref={listRef}>
                        {sortTasks(tasks, sort).map(({ _id, description, completed }) => {
                            return (
                                <Task 
                                    description={description}
                                    completed={completed}
                                    id={_id}
                                    key={_id}
                                    handleChange={handleChange}
                                    deleteTask={deleteTask}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>   
    )
}
