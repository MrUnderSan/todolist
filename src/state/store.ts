import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from './tasksReducer';
import {todolistsReducer} from './todolistsReducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector