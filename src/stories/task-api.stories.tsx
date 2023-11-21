import React, {useEffect, useState} from 'react'
import {TaskAPI} from '../api/task-api';

export default {
    title: 'API/Task'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '06fddc88-822f-467d-a554-5f9992cef9ea'
        TaskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '06fddc88-822f-467d-a554-5f9992cef9ea'
        const title = 'New TAsk'
        TaskAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '06fddc88-822f-467d-a554-5f9992cef9ea'
        const taskId = '888b9663-f91e-4f26-810b-adae82ca331c'
        TaskAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '06fddc88-822f-467d-a554-5f9992cef9ea'
//         const taskId = '77d634fb-9119-4e51-b604-75974cb64153'
//         const task = {
//             title: 'Updated Task'
//         }
//         TaskAPI.updateTask(todolistId, taskId, task)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }