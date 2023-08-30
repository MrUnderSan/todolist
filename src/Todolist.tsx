import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (taskTitle: string) => void
}

export const Todolist = (props: PropsType) => {

    type filterType = 'all' | 'active' | 'completed'

    const [filter, setFilter] = useState<filterType>('all')

    const [value, setValue] = useState('')

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

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addTask = () => {
        props.addTask(value)
        setValue('')
    }

    const onClickButtonHandler = () => {
        addTask()
    }

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const tasksList = filterTasks().map(t => {
        return (
            <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownInputHandler}/>
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={() => changeFiler('all')}>All</button>
                <button onClick={() => changeFiler('active')}>Active</button>
                <button onClick={() => changeFiler('completed')}>Completed</button>
            </div>
        </div>
    )
}