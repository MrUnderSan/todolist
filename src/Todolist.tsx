import React, {useState} from 'react';
import {FilterType, TaskType} from './App';
import {Input} from './components/Input';
import {Button} from './components/Button';


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

    const changeFilter = (f: FilterType) => {
        setFilter(f);
    };

    return <div>
        <h3>{props.title}</h3>
        <Input callback={props.addTask}/>
        <ul>
            {filteredTask.map(t => {
                const onClickHandler = () => props.removeTask(t.id)
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title} </span>
                        <Button name="✖" callback={onClickHandler}/>
                    </li>
                )

            })}
        </ul>
        <div>
            <Button name="All" callback={() => {
                changeFilter('all')
            }}/>
            <Button name="Active" callback={() => {
                changeFilter('active')
            }}/>
            <Button name="Completed" callback={() => {
                changeFilter('completed')
            }}/>
        </div>
    </div>
}
