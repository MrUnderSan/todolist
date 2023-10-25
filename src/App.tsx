import React from 'react';
import './App.css';
import {FilterType, Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasksReducer';
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolistsReducer';

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

    const tasks = useSelector<AppRootStateType, TasksType>(
        state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodolistType[]>(
        state => state.todolists)

    const dispatch = useDispatch()

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

    const addTask = (todolistId: string, taskTitle: string) => {
        dispatch(addTaskAC(todolistId, taskTitle))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    const todolistsMap = todolists.map(t => (
        <Todolist
            key={t.id}
            todolistId={t.id}
            title={t.title}
            filter={t.filter}
            tasks={tasks[t.id]}
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