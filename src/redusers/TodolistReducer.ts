import {TaskType} from '../Todolist';
import {v1} from 'uuid';

export const TodolistReducer = (state: TaskType[], action: ActionCreatorType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return state.filter(t => t.id !== action.payload.id)
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return [newTask, ...state]

        default:
            return state
    }
}

type ActionCreatorType = RemoveTaskACType | AddTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>

// action creator:

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK' as const,
        payload: {
            id
        }
    }
}

export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK' as const,
        payload: {
            title
        }
    }
}