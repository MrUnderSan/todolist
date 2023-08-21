import React, {useState} from 'react';

type filterType = 'all' | 'active' | 'completed'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}

export function Todolist(props: PropsType) {

    const [filter, setFilter] = useState<filterType>('all')

    const changeFilter = (filter: filterType) => {
        setFilter(filter)
    }

    const filterTask = () => {
        switch (filter) {
            case 'active':
                return props.tasks.filter(f => !f.isDone)
            case 'completed':
                return props.tasks.filter(f => f.isDone)
            default:
                return props.tasks
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filterTask().map(t => (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title} </span>
                    <button onClick={() => props.removeTask(t.id)}>x️</button>

                </li>
            ))}
        </ul>
        <div>
            <button onClick={() => changeFilter('all')}>All</button>
            <button onClick={() => changeFilter('active')}>Active</button>
            <button onClick={() => changeFilter('completed')}>Completed</button>
        </div>
    </div>
}
