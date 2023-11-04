import axios from 'axios';

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'bde9abe2-6298-40ef-b9d3-8bd4f4bd5d6a'
    }
})

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
}