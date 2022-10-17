import { TrashIcon } from "@heroicons/react/24/outline"

export default function Task({ id, completed, description, handleChange, deleteTask }) {
    return (
        <div className={`flex w-full my-4 p-4 rounded-2xl ${completed ? 'bg-green-200': 'bg-indigo-50'}`}>
            <input 
                type="checkbox" 
                name="completed" 
                id={id} 
                checked={completed} 
                className="w-5 mr-2 accent-green-600"
                onChange={(event) => handleChange(id, event)}
            />
            <label htmlFor={id} className="text-lg font-medium">{description}</label>
            <button onClick={() => deleteTask(id)} aria-label='delete'>    
                <TrashIcon className="h-5 w-5 ml-auto"/>
            </button>
        </div>
    )
}