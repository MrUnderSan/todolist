import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';

type TaskPropsType = {
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
} & TaskType

export const Task: React.FC<TaskPropsType> = (
    {
        id,
        title,
        isDone,
        removeTask,
        changeTaskStatus
    }) => {

    const RemoveTaskHandler = () => removeTask(id)

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, e.currentTarget.checked)

    return (
        <li key={id} className={isDone ? 'task-done' : 'task'}>
            <input type="checkbox" onChange={changeTaskStatusHandler} checked={isDone}/>
            <span>{title}</span>
            <button onClick={RemoveTaskHandler}>&times;</button>
        </li>
    )
}