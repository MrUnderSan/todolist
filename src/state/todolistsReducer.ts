import {v1} from 'uuid';
import {TodolistAPI, TodolistDomainType} from '../api/todolist-api';
import {Dispatch} from 'redux';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = TodolistDomainType & {
    filter: FilterType
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistAC>

export type TodolistsActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeFilterActionType
    | ChangeTodolistTitleActionType
    | SetTodolistActionType

const initState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initState, action: TodolistsActionsType): TodolistType[] => {
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
        case 'SET-TODOS':
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

export const setTodolistAC = (todos: TodolistDomainType[]) => ({
    type: 'SET-TODOS', todos
} as const)

export const setTodolists = () => (dispatch: Dispatch) => {
    TodolistAPI.getTodos()
        .then(res => {
            dispatch(setTodolistAC(res.data))
        })
}

export const addTodolistAC = (title: string) => (
    {
        type: 'ADD-TODOLIST',
        payload: {
            id: v1(),
            title
        }
    } as const
)

export const removeTodolistAC = (id: string) => (
    {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
)
export const changeFilterAC = (id: string, filter: FilterType) => (
    {
        type: 'CHANGE-FILTER',
        payload: {
            id,
            filter
        }
    } as const
)
export const changeTodolistTitleAC = (id: string, title: string) => (
    {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
)