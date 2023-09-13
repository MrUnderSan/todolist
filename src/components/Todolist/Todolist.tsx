import React, {ChangeEvent, FC} from 'react';
import {Button} from '../Button/Button';
import {TodolistInput} from './TodolistInput/TodolistInput';
import {Task, TaskType} from './Task/Task';

export type FilterType = 'all' | 'active' | 'completed'

type PropsType = {
    todolistId: string
    title: string
    filter: FilterType
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, taskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist: FC<PropsType> = ({
                                            todolistId,
                                            title,
                                            filter,
                                            tasks,
                                            removeTask,
                                            addTask,
                                            changeTaskStatus,
                                            changeFilter,
                                            removeTodolist
                                        }) => {

    const filterTasks = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const onClickAllButtonHAndler = () => {
        changeFilter(todolistId, 'all')
    }
    const onClickActiveButtonHAndler = () => {
        changeFilter(todolistId, 'active')
    }
    const onClickCompletedButtonHAndler = () => {
        changeFilter(todolistId, 'completed')
    }

    const addTaskCallback = (taskTitle: string) => {
        addTask(todolistId, taskTitle)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const tasksList = filterTasks().map(t => {
        const onClickButtonHandler = () => {
            removeTask(todolistId, t.id)
        }

        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
        }

        return (
            <Task
                key={t.id}
                task={t}
                onChangeCheckboxHandler={onChangeCheckboxHandler}
                onClickButtonHandler={onClickButtonHandler}/>
        )
    })

    return (
        <div className={'todolist'}>
            <Button name={'X'} onClick={removeTodolistHandler}/>
            <h3>{title}</h3>
            <TodolistInput addTask={addTaskCallback}/>
            {tasksList.length !== 0 ?
                <ul>
                    {tasksList}
                </ul> :
                <span>Yor task list is empty</span>
            }
            <div>
                <Button
                    name="All"
                    onClick={onClickAllButtonHAndler}
                    className={filter === 'all' ? 'active-filter' : ''}
                />
                <Button
                    name="Active"
                    onClick={onClickActiveButtonHAndler}
                    className={filter === 'active' ? 'active-filter' : ''}
                />
                <Button
                    name="Completed"
                    onClick={onClickCompletedButtonHAndler}
                    className={filter === 'completed' ? 'active-filter' : ''}
                />
            </div>
        </div>
    )
};