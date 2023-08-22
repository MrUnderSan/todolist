import React, {useState} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
}

export const Todolist = (props: PropsType) => {

    type filterType = 'all' | 'active' | 'completed'

    const [filter, setFilter] = useState<filterType>('all')

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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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