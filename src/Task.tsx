import React, {ChangeEvent} from 'react';
import {Button} from './components/Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    task: TaskType
    onChangeCheckboxHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onClickButtonHandler: () => void
}

export const Task: React.FC<PropsType> = (
    {
        task,
        onChangeCheckboxHandler,
        onClickButtonHandler
    }) => {
    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={task.isDone} onChange={onChangeCheckboxHandler}/>
            <span>{task.title}</span>
            <Button name="X" callback={onClickButtonHandler}/>
        </li>
    );
};