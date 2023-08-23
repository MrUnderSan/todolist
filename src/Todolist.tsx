import React from 'react';
import {FilterType, TaskType} from './App';
import {Input} from './components/Input';


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask:  (taskTitle: string) => void
    changeFilter: (f: FilterType) => void
}

export function Todolist(props: PropsType) {


    return <div>
        <h3>{props.title}</h3>
        <Input callback={props.addTask}/>
        <ul>
            {props.tasks.map(t =>
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title} </span>
                    <button onClick={() => props.removeTask(t.id)}>✖️</button>
                </li>
            )}
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter('all')
            }}>All
            </button>
            <button onClick={() => {
                props.changeFilter('active')
            }}>Active
            </button>
            <button onClick={() => {
                props.changeFilter('completed')
            }}>Completed
            </button>
        </div>
    </div>
}
