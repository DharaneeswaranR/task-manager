import { TrashIcon } from "@heroicons/react/24/outline"

export default function Task({ id, title, completed, description, handleChange, deleteTask }) {
    return (
        <div className={`flex w-full my-4 p-4 rounded-2xl ${completed ? 'bg-green-200': 'bg-indigo-50'}`}>
            <div>
                <input 
                    type="checkbox" 
                    name="completed" 
                    id={id} 
                    checked={completed} 
                    className="w-5 h-5 mt-1.5 accent-green-600"
                    onChange={(event) => handleChange(id, event)}
                />
            </div>
            <div className="flex flex-col w-full px-3">
                <label htmlFor={id} className="text-lg font-medium">{title}</label>
                <p className="text-slate-700 text-md">{description}</p>
            </div>
            <div>
                <button onClick={() => deleteTask(id)} aria-label='delete'>    
                    <TrashIcon className="h-5 w-5 ml-auto"/>
                </button>
            </div>
        </div>
    )
}