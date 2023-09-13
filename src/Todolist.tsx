import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist: React.FC<PropsType> = (
    {
        todolistId,
        title,
        filter,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        removeTodolist
    }) => {

    // const title = props.title
    // const {title} = props

    const [value, setValue] = useState('')

    const [error, setError] = useState<string | null>(null)

    // HOF higher order functions
    // Функции высшего порядка (HOF)
    // (функция, которая принимает функцию в пропсах или возвращает функцию)

    const changeFilterOnClickHandlerCreator = (nextFilter: FilterValuesType) => {
        return () => changeFilter(todolistId, nextFilter)
    }
    // const changeFilterOnClickHandlerCreator = (nextFilter: FilterValuesType) => () => props.changeFilter(nextFilter)
    // }

    const tasksList: JSX.Element =
        tasks.length
            ? <ul>
                {tasks.map(t => {
                    const removeTaskCallback = () => {
                        removeTask(todolistId, t.id)
                    }
                    const changeTaskStatusCallback = (isDone: boolean) => {
                        changeTaskStatus(todolistId, t.id, isDone)
                    }
                    return (
                        <Task
                            key={t.id}
                            {...t}
                            removeTask={removeTaskCallback}
                            changeTaskStatus={changeTaskStatusCallback}
                        />
                    )
                })}
            </ul>
            : <span>Your task list is empty</span>


    const isAddTaskPossible = !value


    const addTaskHandler = () => {

        if (value.trim()) {
            addTask(todolistId, value.trim())
        } else {
            setError('Please, enter text')
        }

        setValue('')

    }
    const onClickAddTAskHandler = () => {
        !isAddTaskPossible &&
        addTaskHandler()
    }

    const onChangeSetValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onKeyDownSetValueHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        e.key === 'Enter' && addTaskHandler()
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    return <div className="todolist">
        <div>
            <button onClick={removeTodolistHandler}>x</button>
            <h3>{title}</h3>
        </div>
        <div>
            <input
                value={value}
                onChange={onChangeSetValueHandler}
                onKeyDown={onKeyDownSetValueHandler}
                className={error ? 'empty-value-error' : ''}
            />
            <button onClick={onClickAddTAskHandler} disabled={isAddTaskPossible}>+</button>
            {error && <div className="error-message">{error}</div>}
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
