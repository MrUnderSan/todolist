import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolistsReducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [todolistId: string]: TaskType[]
}

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

const initState: TasksType = {}

export const tasksReducer = (state: TasksType = initState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId]
                        .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId]
                        .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.id]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        default:
            return state
    }
}

export const addTaskAC = (todolistId: string, title: string) => (
    {type: 'ADD-TASK' as const, payload: {todolistId, title}}
)

export const removeTaskAC = (todolistId: string, taskId: string) => (
    {type: 'REMOVE-TASK' as const, payload: {todolistId, taskId}}
)

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => (
    {type: 'CHANGE-TASK-STATUS' as const, payload: {todolistId, taskId, isDone}}
)

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => (
    {type: 'CHANGE-TASK-TITLE' as const, payload: {todolistId, taskId, title}}
)