import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed';

function App() {

    const [tasks, setTasks] = useState<TaskType[]>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ]
    )

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const addTask = (taskTitle: string) => {
        setTasks([{id: v1(), title: taskTitle, isDone: false}, ...tasks])
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
