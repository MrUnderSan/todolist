import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from './components/Button';
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            // addTask();
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = () => {
        props.addTask(title, props.id)
        setTitle('')
    }

    const taskList = props.tasks.map(t => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
        }

        const removeTaskHandler = () => {
            props.removeTask(t.taskId, props.id)
        }

        return (
            <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name='x' callback={removeTaskHandler}/>
            </li>
        )
    })

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.id)
    }


    return <div>
        <h3> {props.title}
            <Button name='x' callback={removeTodolistHandler}/>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button name='+' callback={addTaskHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {taskList}
        </ul>
        <div>
            <Button name='All' callback={()=>changeFilterHandler('all')} />
            <Button name='Active' callback={()=>changeFilterHandler('active')} />
            <Button name='Completed' callback={()=>changeFilterHandler('completed')} />
        </div>
        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}