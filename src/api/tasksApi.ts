import {instance} from './todolistsApi';

export type TaskType = {
    'id': string
    'title': string
    'description': null | string
    'todoListId': string
    'order': number
    'status': number
    'priority': number
    'startDate': null | string
    'deadline': null | string
    'addedDate': string
}

export type TaskApiType = {
    items: TaskType[]
    totalCount: number
    error: null | string
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TaskApiType>(`todo-lists/${todolistId}/tasks`)
    },
}