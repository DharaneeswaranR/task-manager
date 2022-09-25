import { useState, useEffect } from "react"
import { PlusIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import axios from "axios"
import Navbar from "../components/Navbar"

export default function Home() {
    const [tasks, setTasks] = useState([])
    const [description, setDescription] = useState("")
    const [sort, setSort] = useState(0) // 0: all, 1: completed, 2: Uncompleted

    useEffect(() => {
        async function fetchTasks() {
            const tasks = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/task`)
            setTasks([...tasks.data])
        }

        fetchTasks()
    }, [])

    async function addTask() {
        const newTask = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/task`, { description, completed: false })

        setTasks(prevTasks => {
            return [
                ...prevTasks,
                newTask.data
            ]
        })

        setDescription("")
    }

    async function handleChange(id, event) {
        const updatedTask = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/task/${id}`, { completed: event.target.checked })

        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task => task._id === id ? updatedTask.data : task)

            return updatedTasks
        })
    }

    async function deleteTask(id) {
        const deletedTask = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/task/${id}`)

        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter(task => task._id !== deletedTask.data._id)         

            return updatedTasks
        })
    }

    function sortTasks() {
        if (sort === 0) {
            return tasks
        } else if (sort === 1) {
            return tasks.filter(task => task.completed === true)
        } else {
            return tasks.filter(task => task.completed === false)
        }
    }
    
    return (
        <> 
            <Navbar />
            <div className="w-3/4 lg:w-1/2 mt-10 mx-auto text-slate-800">
                <h1 className="text-4xl font-semibold">Hello Dharani 👋</h1>
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
                    <h3 className="font-semibold text-xl mb-2">Your tasks 📝</h3>
                    <div className="mb-3">
                        <span 
                            className={`sort-btn ${sort === 0 ? 'bg-indigo-50' : ''}`} 
                            onClick={() => setSort(0)}
                        >All tasks
                        </span>
                        <span 
                            className={`sort-btn ${sort === 1 ? 'bg-indigo-50' : ''}`} 
                            onClick={() => setSort(1)}
                        >Completed
                        </span>
                        <span 
                            className={`sort-btn ${sort === 2 ? 'bg-indigo-50' : ''}`}
                            onClick={() => setSort(2)}
                        >Uncompleted
                        </span>
                    </div> 
                        {sortTasks(tasks).map(({ _id, description, completed }) => {
                            return (
                                <div id="task" className={`flex w-full my-4 p-4 rounded-2xl ${completed ? 'bg-green-100': 'bg-indigo-50'}`} key={_id}>
                                    <input 
                                        type="checkbox" 
                                        name="completed" 
                                        id="completed" 
                                        checked={completed} 
                                        className="w-5 mr-2"
                                        onChange={(event) => handleChange(_id, event)}
                                    />
                                    <p className="text-lg font-medium">{description}</p>
                                    <button onClick={() => deleteTask(_id)}>    
                                        <TrashIcon className="h-5 w-5 ml-auto"/>
                                    </button>
                                </div>
                            )
                        })}
                    
                </div>
            </div>
        </>   
    )
}
