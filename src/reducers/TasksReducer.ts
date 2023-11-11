import {Dispatch} from 'redux';
import {ItemType, tasksApi, TaskTypeAPI} from '../api/tasksApi';
import {AppThunk} from '../store/store';


export type TaskType = TaskTypeAPI & {
    isDone: boolean
}

type InitialType = {
    [key: string]: TaskType[]
}

let initialState: InitialType = {}

type ActionsType = addTaskACType | GetTasksACType

export const TasksReducer = (state = initialState, action: ActionsType): InitialType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask = {...action.payload.task, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: {...newTask, ...state[action.payload.todolistId]}
            }
        }
        case 'GET-TASKS': {
            return {...state, [action.payload.todolistId]: action.payload.data.map(t => ({...t, isDone: false}))}
        }
        default:
            return state
    }
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, task: ItemType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            task
        }
    } as const
}

export const addTasksTC = (todolistId: string, title: string): AppThunk => async (dispatch: Dispatch) => {
    try {
        console.log('addTasksTC')
        const res = await tasksApi.createTask(todolistId, title)
        dispatch(addTaskAC(todolistId, res.data.data.item))
    } catch (e) {
        console.log(e)
    }
}

type GetTasksACType = ReturnType<typeof getTasksAC>
const getTasksAC = (todolistId: string, data: TaskTypeAPI[]) => {
    return {
        type: 'GET-TASKS' as const,
        payload: {
            todolistId,
            data
        }
    }
}

export const getTasksTC = (todolistId: string): AppThunk => async (dispatch: Dispatch) => {
    try {
        console.log('getTasksTC: ' + todolistId)
        const res = await tasksApi.getTasks(todolistId)
        dispatch(getTasksAC(todolistId, res.data.items))
    } catch (e) {
        console.log(e)
    }
}