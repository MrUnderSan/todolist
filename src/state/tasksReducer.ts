import {v1} from 'uuid';

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

type ActionsType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType
export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
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