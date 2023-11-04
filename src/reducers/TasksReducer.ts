import {Dispatch} from 'redux';
import {tasksApi, TaskType} from '../api/tasksApi';

type InitialType = {
    [key: string]: TaskType[]
}

let initialState: InitialType = {}

export const TasksReducer = (state = initialState, action: ActionsType): InitialType => {
    switch (action.type) {
        // case "ADD-TASK": {
        //     const newTask = {id: v1(), title: "NEW-NEW", isDone: true}
        //     return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        // }
        case 'GET-TASKS': {
                        return {...state, [action.payload.todolistId]: action.payload.data}
        }
        default:
            return state
    }
}

type ActionsType = addTaskACType | GetTasksACType
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {todolistId}
    } as const
}

type GetTasksACType = ReturnType<typeof getTasksAC>
const getTasksAC = (todolistId: string, data: TaskType[]) => {
    return {
        type: 'GET-TASKS',
        payload: {
            todolistId,
            data
        }
    }
}

export const getTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        const res = await tasksApi.getTasks(todolistId)
        dispatch(getTasksAC(todolistId, res.data.items))
    } catch (e) {
        console.log(e)
    }
}