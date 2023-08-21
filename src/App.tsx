import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const [tasks, setTask] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
        ])
    const removeTask = (id: number) => {
        setTask(tasks.filter(t => t.id !== id))
    }

    // const [filter, setFilter] = useState<filterType>('all')
    //
    // let filteredTask = tasks
    //
    // const changeFilter = (filter: filterType) => {
    //     setFilter(filter)
    // }
    //
    // if (filter === 'active') {
    //     filteredTask = filteredTask.filter(f=> !f.isDone)
    // }
    // if (filter === 'completed') {
    //     filteredTask = filteredTask.filter(f=> f.isDone)
    // }



    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />
        </div>
    );
}

export default App;
