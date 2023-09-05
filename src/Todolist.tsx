import React, {ChangeEvent, useState} from 'react';
import {Button} from './components/Button';
import {TodolistInput} from './TodolistInput';
import {Task, TaskType} from './Task';

type filterType = 'all' | 'active' | 'completed'

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {

    const [filter, setFilter] = useState<filterType>('all')

    const changeFiler = (filter: filterType) => {
        setFilter(filter)
    }
    const filterTasks = () => {
        switch (filter) {
            case 'active':
                return props.tasks.filter(t => !t.isDone)
            case 'completed':
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }


    const tasksList = filterTasks().map(t => {
        const onClickButtonHandler = () => {
            props.removeTask(t.id)
        }

        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }

        return (
            <Task task={t} onChangeCheckboxHandler={onChangeCheckboxHandler} onClickButtonHandler={onClickButtonHandler} />
        )
    })

    const onClickAllButtonHAndler = () => {
        changeFiler('all')
    }
    const onClickActiveButtonHAndler = () => {
        changeFiler('active')
    }
    const onClickCompletedButtonHAndler = () => {
        changeFiler('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <TodolistInput addTask={props.addTask} />
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button
                    name="All"
                    callback={onClickAllButtonHAndler}
                    className={filter === 'all' ? 'active-filter' : ''}
                />
                <Button
                    name="Active"
                    callback={onClickActiveButtonHAndler}
                    className={filter === 'active' ? 'active-filter' : ''}
                />
                <Button
                    name="Completed"
                    callback={onClickCompletedButtonHAndler}
                    className={filter === 'completed' ? 'active-filter' : ''}
                />
            </div>
        </div>
    )
};