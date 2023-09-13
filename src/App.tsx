import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TasksType, Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'JS for kids book', isDone: false},
            {id: v1(), title: 'React Courses', isDone: true},
            {id: v1(), title: 'Refactoring book', isDone: false},
        ]
    });

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(t=> t.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function removeTask(todolistId: string, taskId: string) {
        let todolistTask = tasks[todolistId]

        tasks[todolistId] = todolistTask.filter(t => t.id !== taskId)

        setTasks({...tasks});

    }

    function addTask(todolistId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTask = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTask]
        setTasks({...tasks });
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {

        let todolistTask = tasks[todolistId]
        let task = todolistTask.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(t => (t.id === todolistId ? {...t, filter: value} : t)));
    }

    function addTodolist(title: string) {
        const newTodolist: TodolistType = {id:  v1(), title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists, ])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=> t.id === taskId ? {...t, title} : t)})
    }

    const changeTodolist = (todolistId: string, todolistTitle: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: todolistTitle} : t))
    }


        return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolists.map(t => {
                let tasksForTodolist = tasks[t.id]

                if (t.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                }
                if (t.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                }
                return (
                    <Todolist
                        key={t.id}
                        id={t.id}
                        filter={t.filter}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolist={changeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
