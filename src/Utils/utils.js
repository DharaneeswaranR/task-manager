export function sortTasks(tasks, sort) {
    if (sort === 0) {
        return tasks
    } else if (sort === 1) {
        return tasks.filter(task => task.completed === true)
    } else {
        return tasks.filter(task => task.completed === false)
    }
}