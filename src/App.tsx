import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState<TaskType[]>(
        [
            { id: 1, title: "HTML&CSS", isDone: true },
            { id: 2, title: "JS", isDone: true },
            { id: 3, title: "ReactJS", isDone: false },
            { id: 4, title: "RestAPI", isDone: false },
            { id: 5, title: "GraphQL", isDone: false }
        ]
    )

    let [filter, setFilter] = useState<FilterType>('all')

    function removeTask(id: number) {
        setTasks(tasks.filter(t=> t.id !== id))
    }

    let filteredTask = tasks;
    if (filter === 'active') {
        filteredTask = tasks.filter(t=> !t.isDone)
    }
    if (filter === 'completed') {
        filteredTask = tasks.filter(t=> t.isDone)
    }

    function changeFilter(f: FilterType) {
        setFilter(f)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
