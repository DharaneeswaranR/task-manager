import { TrashIcon } from "@heroicons/react/24/outline"

export default function Task({ id, completed, description, handleChange, deleteTask }) {
    return (
        <div id="task" className={`flex w-full my-4 p-4 rounded-2xl ${completed ? 'bg-green-200': 'bg-indigo-50'}`}>
            <input 
                type="checkbox" 
                name="completed" 
                id="completed" 
                checked={completed} 
                className="w-5 mr-2"
                onChange={(event) => handleChange(id, event)}
            />
            <p className="text-lg font-medium">{description}</p>
            <button onClick={() => deleteTask(id)}>    
                <TrashIcon className="h-5 w-5 ml-auto"/>
            </button>
        </div>
    )
}