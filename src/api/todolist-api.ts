import axios from 'axios';

const axiosInstance  = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

export class TodolistAPI {
    static getTodos() {
        return axiosInstance.get<TodolistDomainType[]>('todo-lists');
    }

    static createTodo(title: string) {
        return axiosInstance.post<ResponseType<{ item: TodolistDomainType }>>('todo-lists', { title });
    }

    static deleteTodo(id: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${id}`);
    }

    static updateTodo(id: string, title: string) {
        return axiosInstance.put<ResponseType>(`todo-lists/${id}`, { title });
    }
}

export type TodolistDomainType = {
    id: string
    title: string
    order?: number
    addedDate?: Date
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}