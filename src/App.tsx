import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    //BLL:
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},
        {id: crypto.randomUUID(), title: 'Rest API', isDone: false},
        {id: crypto.randomUUID(), title: 'GraphQL', isDone: false},
    ]);

    // crypto.randomUUID() / v1()

    const [filter, setFilter] = useState<FilterValuesType>('all');

    //CRUD:

    const addTask = (taskTitle: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title: taskTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    } // C

    function removeTask(taskId: string) {
        setTasks(tasks.filter(t => t.id !== taskId))
    } // D

    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {

        setTasks(tasks.map(t =>
            t.id === taskId ? {...t, isDone: taskStatus} : t
        ))

    } // U

    const changeTaskTitle = () => {
    } //U

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


    //UI:

    const getTaskForRender = (allTask: TaskType[], nextFiler: FilterValuesType) => {
        switch (nextFiler) {
            case 'active':
                return allTask.filter(t => !t.isDone)
            case 'completed':
                return allTask.filter(t => t.isDone)
            default:
                return allTask
        }
    }

    let tasksForTodolist: TaskType[] = getTaskForRender(tasks, filter)

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;

