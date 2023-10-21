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

type ActionsType = AddTaskActionType
export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        default:
            return state
    }
}

export const addTaskAC = (todolistId: string, title: string) => (
    {type: 'ADD-TASK', payload: {todolistId, title}}
)