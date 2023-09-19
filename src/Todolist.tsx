import React from 'react';
import {FilterValuesType} from './App';
import {Task} from './Task';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';

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
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    editTodolistTitle: (title: string) => void
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
        removeTodolist,
        changeTaskTitle,
        editTodolistTitle
    }) => {

    // const title = props.title
    // const {title} = props



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
                    const changeTaskTitleCallback = (title: string) => {
                        changeTaskTitle(todolistId, t.id, title)
                    }

                    return (
                        <Task
                            key={t.id}
                            {...t}
                            removeTask={removeTaskCallback}
                            changeTaskStatus={changeTaskStatusCallback}
                            changeTaskTitle={changeTaskTitleCallback}
                        />
                    )
                })}
            </ul>
            : <span>Your task list is empty</span>


    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }

    return <div className="todolist">
        <div>
            <button onClick={removeTodolistHandler}>x</button>
            <EditableSpan title={title} callback={editTodolistTitle} />
        </div>
        <AddItemForm callback={addTaskHandler} />
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
