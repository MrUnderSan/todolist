import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Task} from './task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
}

export const Todolist: React.FC<PropsType> = (
    {
        title,
        tasks,
        filter,
        ...props
    }) => {

    // const title = props.title
    // const {title} = props

    const [value, setValue] = useState('')

    const [error, setError] = useState<string | null>(null)

    // HOF higher order functions
    // Функции высшего порядка (HOF)
    // (функция котрая принимает функцию в пропсах или возвращает функцию)

    const changeFilterOnClickHandlerCreator = (nextFilter: FilterValuesType) => {
        return () => props.changeFilter(nextFilter)
    }
    // const changeFilterOnClickHandlerCreator = (nextFilter: FilterValuesType) => () => props.changeFilter(nextFilter)
    // }

    const tasksList: JSX.Element =
        tasks.length
            ? <ul>
                {
                    tasks.map(t =>
                        <Task {...t} removeTask={props.removeTask}
                              changeTaskStatus={props.changeTaskStatus}/>)
                }
            </ul>
            : <span>Your task list is empty</span>


    const isAddTaskPossible = !value


    const addTask = () => {

        if (value.trim()) {
            props.addTask(value.trim())
        } else {
            setError('Please, enter text')
        }

        setValue('')

    }
    const onClickAddTAskHandler = () => {
        !isAddTaskPossible &&
        addTask()
    }

    const onChangeSetValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onKeyDownSetValueHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        e.key === 'Enter' && addTask()
    }


    return <div className="todolist">
        <h3>{title}</h3>
        <div>
            <input
                value={value}
                onChange={onChangeSetValueHandler}
                onKeyDown={onKeyDownSetValueHandler}
                className={error ? 'empty-value-error' : ''}
            />
            <button onClick={onClickAddTAskHandler} disabled={isAddTaskPossible}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        {tasksList}
        <div>
            <button
                className={filter === 'all' ? 'btn-filter-active' : 'btn-filter'}
                onClick={changeFilterOnClickHandlerCreator('all')}
            >
                All
            </button>
            <button
                className={filter === 'active' ? 'btn-filter-active' : 'btn-filter'}
                onClick={changeFilterOnClickHandlerCreator('active')}
            >
                Active
            </button>
            <button
                className={filter === 'completed' ? 'btn-filter-active' : 'btn-filter'}
                onClick={changeFilterOnClickHandlerCreator('completed')}
            >
                Completed
            </button>
        </div>
    </div>
}
