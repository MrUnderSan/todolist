import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

type ActionsType = AddTodolistActionType | RemoveTodolistActionType | ChangeFilterActionType | ChangeTodolistTitleActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.payload.id)
        case 'CHANGE-FILTER':
            return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
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
export const changeFilterAC = (id: string, filter: FilterType) => (
    {
        type: 'CHANGE-FILTER' as const,
        payload: {
            id,
            filter
        }
    }
)
export const changeTodolistTitleAC = (id: string, title: string) => (
    {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        payload: {
            id,
            title
        }
    }
)