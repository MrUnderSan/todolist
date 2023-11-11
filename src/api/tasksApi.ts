import {instance} from './todolistsApi';

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateTaskType>(`todo-lists/${todolistId}/tasks`, {title});
    },
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskTypeAPI[]
}

export type TaskTypeAPI = {
    description: string
    title: string
    status: boolean
    priority: any
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type CreateTaskType={
    resultCode: number
    messages: string[]
    data: {
        item: ItemType
    }
}

export type ItemType=TaskTypeAPI &{
    isDone: boolean
}

// export type CreateTaskType={
//     resultCode: number
//     messages: string[]
//     data: {
//         item: {
//             description: string
//             title: string
//             status: number
//             priority: number
//             startDate: Date
//             deadline: Date
//             id: string
//             todoListId: string
//             order: number
//             addedDate: Date
//             completed: boolean
//         }
//     }
// }