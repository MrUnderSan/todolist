import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';

type TaskPropsType = {
    removeTask: () => void
    changeTaskStatus: (taskStatus: boolean) => void
} & TaskType

export const Task: React.FC<TaskPropsType> = (
    {
        id,
        title,
        isDone,
        removeTask,
        changeTaskStatus,

    }) => {


    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(e.currentTarget.checked)

    return (
        <li key={id} className={isDone ? 'task-done' : 'task'}>
            <input type="checkbox" onChange={changeTaskStatusHandler} checked={isDone}/>
            <span>{title}</span>
            <button onClick={removeTask}>&times;</button>
        </li>
    )
}