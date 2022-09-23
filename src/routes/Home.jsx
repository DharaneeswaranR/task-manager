import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "../components/Navbar"
import "../database/tasks"
// import tasksData from "../database/tasks"

export default function Home() {
    const [tasks, setTasks] = useState([])
    const [description, setDescription] = useState("")

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
    
    return (
        <> 
            <Navbar />
            <div className="w-3/4 lg:w-1/2 mt-10 mx-auto text-slate-800">
                <h1 className="text-4xl font-semibold">Hello Dharani 👋</h1>
                <div className="flex justify-center mb-10 mt-8">
                    <div className="flex w-full">
                        <input 
                            type="text" 
                            className="p-2.5 w-full bg-indigo-100 mr-3 rounded-md outline-none"
                            placeholder="add some task"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <button 
                            className="py-2.5 pl-4 pr-5 flex items-center rounded-full bg-indigo-700 text-white text-md font-semibold hover:bg-indigo-800 active:bg-indigo-500 duration-300"
                            onClick={addTask}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 m-0">
                                <path stroke={"white"} stroke-width={1.5} d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            Add
                        </button>
                    </div>
                    
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold text-xl">Your tasks 📝</h3>
                    {tasks.map(({ _id, description, completed }) => {
                        return (
                            <div className="flex w-full my-2" key={_id}>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>   
    )
}
