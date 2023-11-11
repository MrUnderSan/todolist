import React from 'react';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {Button} from './components/Button';
import {addTasksTC} from './reducers/TasksReducer';

type PropsType = {
    todolistId: string
    title: string
    filter: string
}

export const Todos: React.FC<PropsType> = (props) => {
    const {todolistId, title} = props
    const dispatch = useAppDispatch()

    let tasks = useAppSelector(state => state.tasks[todolistId])

    const tasksBlock = tasks?.map(el => {
        return (
            <li key={el.id}><input type="checkbox" checked={el.status} /> <span>{el.title}</span></li>
        )
    })

    const addTaskHandler = () => {
        dispatch(addTasksTC(todolistId, 'TASK'))
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