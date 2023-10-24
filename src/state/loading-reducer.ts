import {
    AddTodolistActionType,
    RemoveTodolistActionType
} from './todolists-reducer';

export type LoadingType = {
    [todolistID: string]: boolean
}

export type ChangeLoadingStatusActionType = {
    type: 'CHANGE-LOADING-STATUS'
    todolistId: string
    isLoading: boolean
}

type LoadingActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeLoadingStatusActionType

const initialState: LoadingType = {}
export const loadingReducer = (state = initialState, action: LoadingActionsType): LoadingType => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: false}
        case 'CHANGE-LOADING-STATUS': {
            return {...state, [action.todolistId]: action.isLoading}
        }
        default:
            return state
    }
}

export const changeLoadingStatusAC = (todolistId: string, isLoading: boolean): ChangeLoadingStatusActionType => {
    return { type: 'CHANGE-LOADING-STATUS', isLoading, todolistId}
}