import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from '../../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist: FC<PropsType> = (
    {
        id,
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        removeTodolist
    }) => {

    const onAllClickHandler = () => changeFilter(id, 'all');
    const onActiveClickHandler = () => changeFilter(id, 'active');
    const onCompletedClickHandler = () => changeFilter(id, 'completed');

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    const addItemHandler = (title: string) => (
        addTask(id, title)
    )

    return (
        <div>
            <h3 style={{display: 'inline-block'}}>{title}</h3>
            <button onClick={removeTodolistHandler}>x</button>
            <AddItemForm addItem={addItemHandler}/>
            <ul>
                {
                    tasks.map(t => {
                        const onClickHandler = () => removeTask(id, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, t.id, e.currentTarget.checked);
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
