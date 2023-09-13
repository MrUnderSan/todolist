import React, {useState} from 'react';
import './App.css';
import {FilterType, Todolist} from './components/Todolist/Todolist';

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

    const todolistId1 = crypto.randomUUID()
    const todolistId2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: crypto.randomUUID(), title: 'Beer', isDone: true},
            {id: crypto.randomUUID(), title: 'Fish', isDone: false},
            {id: crypto.randomUUID(), title: 'Nuts', isDone: false}
        ],

    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistId: string, taskTitle: string) => {
        let newTask = {id: crypto.randomUUID(), title: taskTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        const updatedTasks = {...tasks}
        delete updatedTasks[todolistId]
        setTasks(updatedTasks)
    }

    const todolistsRender = todolists.map(t => (
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
        />
    ))

    return (
        <div className="App">
            {todolistsRender}
        </div>
    );
}

export default App;