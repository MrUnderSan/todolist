import React, {useState} from 'react';
import {FilterType, TaskType} from './App';
import {Input} from './components/Input';


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (taskTitle: string) => void
}

export function Todolist(props: PropsType) {

    const [filter, setFilter] = useState<FilterType>('all')

    let filteredTask =
        filter === 'active' ? props.tasks.filter(t => !t.isDone)
            : filter === 'completed' ? props.tasks.filter(t => t.isDone)
                : props.tasks;

    function changeFilter(f: FilterType) {
        setFilter(f)
    }

    return <div>
        <h3>{props.title}</h3>
        <Input callback={props.addTask}/>
        <ul>
            {filteredTask.map(t =>
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title} </span>
                    <button onClick={() => props.removeTask(t.id)}>✖️</button>
                </li>
            )}
        </ul>
        <div>
            <button onClick={() => {
                changeFilter('all')
            }}>All
            </button>
            <button onClick={() => {
                changeFilter('active')
            }}>Active
            </button>
            <button onClick={() => {
                changeFilter('completed')
            }}>Completed
            </button>
        </div>
    </div>
}
