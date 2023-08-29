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
}

export const Todolist: React.FC<PropsType> = ({title, tasks, ...props}) => {

    // const title = props.title
    // const {title} = props

    const [value, setValue] = useState('')

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
                            <Task {...t} removeTask={props.removeTask} />)
                }
            </ul>
            : <span>Your task list is empty</span>


    const isAddButtonDisabled = !value


    const addTask = () => {
        props.addTask(value)
        setValue('')
    }
    const onClickAddTAskHandler = () => {
        !isAddButtonDisabled &&
        addTask()
    }

    const onChangeSetValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onKeyDownSetValueHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && !isAddButtonDisabled && addTask()
    }




    return <div className="todolist">
        <h3>{title}</h3>
        <div>
            <input value={value} onChange={onChangeSetValueHandler} onKeyDown={onKeyDownSetValueHandler}/>
            <button onClick={onClickAddTAskHandler} disabled={isAddButtonDisabled}>+</button>
        </div>
            {tasksList}
        <div>
            <button onClick={changeFilterOnClickHandlerCreator('all')}>
                All
            </button>
            <button onClick={changeFilterOnClickHandlerCreator('active')}>
                Active
            </button>
            <button onClick={changeFilterOnClickHandlerCreator('completed')}>
                Completed
            </button>
        </div>
    </div>
}
