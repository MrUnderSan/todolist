import React, {ChangeEvent} from 'react';
import {Button} from '../../Button/Button';
import {EditableSpan} from '../../EditableSpan/EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    task: TaskType
    onChangeCheckboxHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onClickButtonHandler: () => void
    changeTaskTitle: (id: string, title: string) => void
}

export const Task: React.FC<PropsType> = (
    {
        task,
        onChangeCheckboxHandler,
        onClickButtonHandler,
        changeTaskTitle
    }) => {
    const changeTaskTitleHandler = (title: string) => {
        changeTaskTitle(task.id, title)
    }
    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={task.isDone} onChange={onChangeCheckboxHandler}/>
            <EditableSpan text={task.title} changeText={changeTaskTitleHandler} />
            <Button name="X" onClick={onClickButtonHandler}/>
        </li>
    );
};