import {FilterType} from '../components/Todolist/Todolist';
import {v1} from 'uuid';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ActionsType = AddTodolistActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        default:
            return state
    }
}

export const addTodolistAC = (title: string) => (
    {
        type: 'ADD-TODOLIST',
        payload: {
            id: v1(),
            title
        }
    }
)