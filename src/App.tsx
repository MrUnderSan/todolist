import React, {useEffect} from 'react';
import './App.css';
import {FilterType, Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTask,
    deleteTask,
    updateTask
} from './state/tasksReducer';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolists
} from './state/todolistsReducer';

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksType = {
    [todolistId: string]: TaskType[]
}

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
                dispatch(setTodolists())
    }, []);

    const tasks = useSelector<AppRootStateType, TasksType>(
        state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodolistType[]>(
        state => state.todolists)


    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const changeFilter = (todolistId: string, filter: FilterType) => {
        dispatch(changeFilterAC(todolistId, filter))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(createTask(todolistId, title))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(updateTask(todolistId, taskId, {title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))

    }

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTask(todolistId, taskId))
    }

    const todolistsMap = todolists.map(t => (
        <Todolist
            key={t.id}
            todolistId={t.id}
            title={t.title}
            filter={t.filter}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeFilter={changeFilter}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
        />
    ))

    return (
        <div className="App">
            <div><AddItemForm addItem={addTodolist}/></div>
            <div className={'todolists-wrapper'}>{todolistsMap}</div>

        </div>
    );
}

export default App;