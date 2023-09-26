import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

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
            <Checkbox
                onChange={changeTaskStatusHandler}
                checked={isDone}
            />
            <EditableSpan title={title} callback={changeTaskTitle} />
            <IconButton
                aria-label="delete"
                onClick={removeTask}
                size={'small'}
            >
                <DeleteIcon />
            </IconButton>
        </li>
    )
}