import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type filterType = 'all' | 'active' | 'completed'

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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {

    const [filter, setFilter] = useState<filterType>('all')

    const [value, setValue] = useState('')

    const [error, setError] = useState<string | null>(null)

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
        setValue('')
        if (value.trim() !== '') {
            props.addTask(value)
        } else {
            setError('Title is required')
        }
    }

    const onClickButtonHandler = () => {
        addTask()
    }

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
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
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={t.isDone} onChange={onChangeCheckboxHandler}/>
                <span>{t.title}</span>
                <button onClick={onClickButtonHandler}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownInputHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={onClickButtonHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    onClick={() => changeFiler('all')}
                    className={filter === 'all' ? 'active-filter' : ''}
                >All</button>
                <button onClick={() => changeFiler('active')}
                        className={filter === 'active' ? 'active-filter' : ''}
                >Active</button>
                <button
                    onClick={() => changeFiler('completed')}
                    className={filter === 'completed' ? 'active-filter' : ''}
                >Completed</button>
            </div>
        </div>
    )
}