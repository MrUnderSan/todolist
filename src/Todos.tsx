import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {Button} from './components/Button';
import {addTaskAC, getTasksTC} from './reducers/TasksReducer';

type PropsType = {
    todolistId: string
    title: string
    filter: string
}

export const Todos: React.FC<PropsType> = (props) => {
    const {todolistId, title, filter} = props
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(todolistId))
    }, [])

    let tasks = useAppSelector(state => state.tasks[todolistId])

    const tasksBlock = tasks?.map(el => {
        return (
            <li key={el.id}><input type="checkbox" checked={el.status === 1} /> <span>{el.title}</span></li>
        )
    })

    const addTaskHandler = () => {
        dispatch(addTaskAC(todolistId))
    }

    return (
        <div style={{padding: '10px'}}>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button name={'+'} callBack={addTaskHandler}/>
                {/*<button>+</button>*/}
            </div>
            <ul>
                {tasksBlock}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>

    )
}