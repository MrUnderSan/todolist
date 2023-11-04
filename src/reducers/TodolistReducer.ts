import {todolistsApi, TodolistType} from '../api/todolistsApi';
import {Dispatch} from 'redux';

type InitialType = TodolistType & {
    filter: string
}

let initialState: InitialType[] = []

type TodolistActionsType = GetTodolistsType

export const TodolistReducer = (state = initialState, action: TodolistActionsType): InitialType[] => {
    switch (action.type) {
        case 'GET-TODOS': {
            return action.payload.data.map(t => ({...t, filter: 'all'}))
        }
        default:
            return state
    }
}

type GetTodolistsType = ReturnType<typeof getTodolistsAC>

const getTodolistsAC = (data: TodolistType[]) => {
    return {
        type: 'GET-TODOS' as const,
        payload: {
            data
        }
    }
}

export const getTodolistsTC = () => async (dispatch: Dispatch) => {
    try {
        const result = await todolistsApi.getTodolists()
        dispatch(getTodolistsAC(result.data))
    } catch (e) {
        console.log(e)
    }
}
