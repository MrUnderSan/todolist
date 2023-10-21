import {FilterType} from '../components/Todolist/Todolist';
import {v1} from 'uuid';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type ActionsType = AddTodolistActionType | RemoveTodolistActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.payload.id)
        default:
            return state
    }
}

export const addTodolistAC = (title: string) => (
    {
        type: 'ADD-TODOLIST' as const,
        payload: {
            id: v1(),
            title
        }
    }
)
export const removeTodolistAC = (id: string) => (
    {
        type: 'REMOVE-TODOLIST' as const,
        payload: {
            id
        }
    }
)