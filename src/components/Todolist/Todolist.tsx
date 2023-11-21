import React, {ChangeEvent, FC, useEffect} from 'react';
import {Button} from '../Button/Button';
import {Task} from './Task/Task';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {useAppDispatch, useAppSelector} from '../../state/store';
import {TodolistType} from '../../state/todolistsReducer';
import {setTasks, TaskType} from '../../state/tasksReducer';

export type FilterType = 'all' | 'active' | 'completed'

type PropsType = {
    todolistId: string
    title: string
    filter: FilterType
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, taskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist: FC<PropsType> = ({
                                            todolistId,
                                            title,
                                            filter,
                                            removeTask,
                                            addTask,
                                            changeTaskStatus,
                                            changeFilter,
                                            removeTodolist,
                                            changeTaskTitle,
                                            changeTodolistTitle
                                        }) => {

    const dispatch = useAppDispatch()
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[todolistId])

    useEffect(() => {
        dispatch(setTasks(todolistId))
    }, []);

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

    const addTaskHandler = (taskTitle: string) => {
        addTask(todolistId, taskTitle)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }

    const tasksList = filterTasks()?.map(t => {
        const onClickButtonHandler = () => {
            removeTask(todolistId, t.id)
        }

        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
        }

        const changeTaskTitleHandler = (taskId: string, title: string) => {
            changeTaskTitle(todolistId, taskId, title)
        }

        return (
            <Task
                key={t.id}
                task={t}
                onChangeCheckboxHandler={onChangeCheckboxHandler}
                onClickButtonHandler={onClickButtonHandler}
                changeTaskTitle={changeTaskTitleHandler}
            />
        )
    })

    return (
        <div className={'todolist'}>
            <Button name={'X'} onClick={removeTodolistHandler}/>
            <h3><EditableSpan text={title} changeText={changeTodolistTitleHandler}/></h3>
            <AddItemForm addItem={addTaskHandler}/>
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