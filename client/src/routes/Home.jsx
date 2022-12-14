import { useState, useEffect, useRef, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import autoAnimate from '@formkit/auto-animate'
import axios from "axios"
import { ArrowPathIcon, PlusIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { sortTasks } from "../utils/utils"
import { UserContext } from "../contexts/UserContext"
import Navbar from "../components/Navbar"
import Task from "../components/Task"

export default function Home() {
    const [user, setUser] = useContext(UserContext)
    const [tasks, setTasks] = useState([])
    const [addTaskField, setAddTaskField] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [update, setUpdate] = useState("")
    const [sort, setSort] = useState(0) // 0: all, 1: completed, 2: Uncompleted
    const listRef = useRef()
    const navigate = useNavigate()

    const sortedTask = useMemo(() => {
        return sortTasks(tasks, sort)
    }, [tasks, sort])

    useEffect(() => {
        listRef.current && autoAnimate(listRef.current);
    }, [listRef])

    useEffect(() => {
        async function fetchTasks() {
            try {
                const tasks = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/task`, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                    }
                })

                setTasks([...tasks.data])
            } catch (error) {
                localStorage.removeItem('user')
                navigate("/")
            } 
        }

        function fetchUser() {
            if (Object.keys(user).length === 0) {
                setUser(JSON.parse(localStorage.getItem('user')))
            }
        }

        fetchUser()
        fetchTasks()
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps  

    async function addTask() {
        const newTask = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/task`, { title, description, completed: false }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        setTasks(prevTasks => {
            return [
                ...prevTasks,
                newTask.data
            ]
        })

        clearFields()
    }

    function handleChange(id, event) {
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/task/${id}`, { completed: event.target.checked }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task => task._id === id ? {...task, completed: !task.completed } : task)

            return updatedTasks
        })
    }

    function handleUpdate(id, title, description) {
        setAddTaskField(true)
        setTitle(title)
        setDescription(description)
        setUpdate(id)
    }

    async function updateTask() {
        const updatedTask = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/task/${update}`, { title, description }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task => task._id === update ? updatedTask.data : task)

            return updatedTasks
        })

        clearFields()
        setUpdate("")
    }

    function deleteTask(id) {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/task/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter(task => task._id !== id)         

            return updatedTasks
        })
    }

    function clearFields() {
        setTitle("")
        setDescription("")
    }

    return (
        <> 
            <Navbar />
            <div className="w-3/4 lg:w-1/2 mt-10 mx-auto text-slate-800">
                <h1 className="text-4xl font-semibold">Hello {user.user?.username} ????</h1>
                {!addTaskField ? (
                    <button 
                        className="py-1 mt-4 mb-8 pl-3 pr-4 flex items-center rounded-full bg-slate-100 text-md font-semibold hover:bg-slate-200 duration-300"
                        onClick={() => setAddTaskField(true)}
                    >
                        <PlusIcon className="h-6 w-6"/>
                        Add Task
                    </button>
                ) : ( 
                    <div className="mb-10 mt-5 bg-indigo-50 p-3 rounded-xl">
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between mb-3">
                                <h2 className="text-lg font-semibold">{update ? "Update task" : "Create new task"}</h2>
                                <button aria-label="close" onClick={() => {
                                    setAddTaskField(false)
                                    clearFields()
                                    if (update) {
                                        setUpdate(false)
                                    }
                                }}>
                                    <XMarkIcon className="h-5 w-5 rounded-lg"/>
                                </button>
                            </div>
                            <input 
                                type="text" 
                                className="p-2 w-full mr-3 rounded-md outline-none"
                                placeholder="title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                onKeyDown={(event) => event.key === "Enter" && (update ? updateTask() : addTask())}
                            />
                            <textarea 
                                type="text" 
                                className="p-2 mt-3 mb-2 w-full mr-3 rounded-md outline-none"
                                placeholder="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div> 
                        <div className="flex space-x-2">
                            {!update ? (
                                <button 
                                    className="task-field-btn"
                                    onClick={addTask}
                                >
                                    <PlusIcon className="h-5 w-5 mr-1"/>
                                    Add
                                </button> 
                                ) : (
                                    <button 
                                    className="task-field-btn"
                                    onClick={updateTask}
                                >
                                    <ArrowPathIcon className="h-5 w-5 mr-1"/>
                                    Update
                                </button>
                            )}
                            <button 
                                className="task-field-btn"
                                onClick={() => clearFields()}
                            >
                                <XCircleIcon className="h-5 w-5 mr-1"/>
                                Clear
                            </button> 
                        </div>    
                    </div>
                )}
                <div className="flex flex-col mt-4">
                    <h2 className="font-semibold text-xl mb-2">Your tasks ????</h2>
                    
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
                        {sortedTask.map(({ _id, title, description, completed }) => {
                            return (
                                <Task 
                                    title={title}
                                    description={description}
                                    completed={completed}
                                    id={_id}
                                    key={_id}
                                    handleChange={handleChange}
                                    deleteTask={deleteTask}
                                    handleUpdate={handleUpdate}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>   
    )
}
