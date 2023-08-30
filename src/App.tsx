import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const addTask = (taskTitle: string) => {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;