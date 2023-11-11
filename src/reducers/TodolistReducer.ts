import {todolistsApi, TodolistType} from '../api/todolistsApi';
import {AppDispatch, AppThunk} from '../store/store';
import {getTasksTC} from './TasksReducer';

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

export const getTodolistsTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        console.log('getTodolistsTC')
        const result = await todolistsApi.getTodolists()
        dispatch(getTodolistsAC(result.data))
        result.data.map(t => dispatch(getTasksTC(t.id)))
    } catch (e) {
        console.log(e)
    }
}