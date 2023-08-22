import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const [task, setTask] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])

    const removeTask = (id: number) => {
        setTask(task.filter(t => t.id !== id))
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={task} removeTask={removeTask}/>
        </div>
    );
}

export default App;