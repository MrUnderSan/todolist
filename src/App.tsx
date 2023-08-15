import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

const task1 = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: false},
]
const task2 = [
    {id: 1, title: 'Hello world', isDone: true},
    {id: 2, title: 'I am happy', isDone: false},
    {id: 3, title: 'Yo', isDone: false},
]

const title1 = "What to learn";
const title2 = "Songs";

function App() {
    return (
        <div className="App">
            <Todolist title={title1} tasks={task1}/>
            <Todolist title={title2} tasks={task2}/>
        </div>
    );
}

export default App;