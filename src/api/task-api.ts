import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

export class TaskAPI {
    static getTasks(todolistId: string) {
        return axiosInstance.get<ResponseTaskType<TaskType[]>>(`todo-lists/${todolistId}/tasks`);
    }

    static createTask(todolistId: string, title: string) {
        return axiosInstance.post<ResponseType<{'item'?: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title});
    }

    static deleteTask(todolistId: string, taskId: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    }

    static updateTask(todolistId: string, taskId: string, task: TaskPutType) {
        return axiosInstance.put<ResponseType<{'item'?: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {task});
    }
}

type TaskType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: Date | null
    deadline: Date | null
    addedDate: Date
}

type TaskPutType = {
    title: string
    description?: string
    status?: number
    priority?: number
    startDate?: Date
    deadline?: Date
}

type ResponseTaskType<I = []> = {
    items: I
    totalCount: number
    error: string | null
}


type ResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}