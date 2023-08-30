import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

function App() {

    const [task, setTask] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    const removeTask = (id: string) => {
        setTask(task.filter(t => t.id !== id))
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={task} removeTask={removeTask}/>
        </div>
    );
}

export default App;