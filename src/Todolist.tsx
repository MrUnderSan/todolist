import React, {ChangeEvent, useState} from 'react';

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

    const onClickButtonHandler = () => {
        props.addTask(value)
        setValue('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value} onChange={onChangeInputHandler}/>
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            <ul>
                {filterTasks().map(t => {
                    return (
                        <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => props.removeTask(t.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => changeFiler('all')}>All</button>
                <button onClick={() => changeFiler('active')}>Active</button>
                <button onClick={() => changeFiler('completed')}>Completed</button>
            </div>
        </div>
    )
}