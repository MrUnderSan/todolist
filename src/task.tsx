import React from 'react';

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    removeTask: (taskId: string) => void
}

export const Task: React.FC<TaskPropsType> = ({id, title, isDone, removeTask}) => {
    const onClickRemoveTaskHandler = () => {
        removeTask(id)
    }

    return (
        <li key={id}>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
            <button onClick={onClickRemoveTaskHandler}>&times;</button>
        </li>
    )
}