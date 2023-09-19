import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';
import {EditableSpan} from './components/EditableSpan';

type TaskPropsType = {
    removeTask: () => void
    changeTaskStatus: (taskStatus: boolean) => void
    changeTaskTitle: (title: string) => void
} & TaskType

export const Task: React.FC<TaskPropsType> = (
    {
        id,
        title,
        isDone,
        removeTask,
        changeTaskStatus,
        changeTaskTitle
    }) => {


    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(e.currentTarget.checked)

    return (
        <li key={id} className={isDone ? 'task-done' : 'task'}>
            <input type="checkbox" onChange={changeTaskStatusHandler} checked={isDone}/>
            <EditableSpan title={title} callback={changeTaskTitle} />
            <button onClick={removeTask}>&times;</button>
        </li>
    )
}