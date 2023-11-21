import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from './todolistsReducer';
import {Dispatch} from 'redux';
import {TaskAPI, TaskDomainType} from '../api/task-api';
import {AppRootStateType} from './store';

export type TaskType = TaskDomainType & {
    isDone: boolean
}

export type TasksType = {
    [todolistId: string]: TaskType[]
}

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type TaskActionsType =
    AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType
    | UpdateTaskActionType

const initState: TasksType = {}

export const tasksReducer = (state: TasksType = initState, action: TaskActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks.map(t => ({...t, isDone: false}))
            }
        case 'ADD-TASK':
            return {...state, [action.payload.todolistId]: [{...action.payload.task, isDone: false}, ...state[action.payload.todolistId]]}
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
        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'UPDATE-TASK':
            return {
            ...state,
            [action.payload.todolistId]:
                state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...action.payload.task, isDone: false} : t)
        }
        default:
            return state
    }
}

export const addTaskAC = (todolistId: string, task: TaskDomainType) => (
    {type: 'ADD-TASK' as const, payload: {todolistId, task}}
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


export const setTasksAC = (todolistId: string, tasks: TaskDomainType[]) => (
    {type: 'SET-TASKS' as const, todolistId, tasks} as const
)

export const setTasks = (todolistId: string) => (dispatch: Dispatch) => {
    TaskAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}

export const deleteTask = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    TaskAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const createTask = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    TaskAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(todolistId, res.data.data.item))
        })
}


export const updateTaskAC = (todolistId: string, taskId: string, task: TaskType) => (
    {type: 'UPDATE-TASK' as const, payload: {todolistId, taskId, task}}
)


export type TaskPutType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: Date
    deadline?: Date
}

export const updateTask = (todolistId: string, taskId: string, task: TaskPutType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const oldTask = getState().tasks[todolistId].find(t => t.id === taskId)

    if (oldTask) {
        const model = {
            title: oldTask.title,
            description: oldTask.description,
            startDate: oldTask.startDate,
            priority: oldTask.priority,
            deadline: oldTask.deadline,
            status: oldTask.status,
            ...task
        }

        TaskAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, {...res.data.data.item, isDone: false}))
            })
    }
}

