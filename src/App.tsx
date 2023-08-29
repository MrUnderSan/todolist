import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import * as crypto from 'crypto';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    //BLL:
    let [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    //CRUD:
    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    // crypto.randomUUID() / v1()

    const addTask = (taskTitle: string) => {
        const newTask: TaskType = {
                id: v1(),
                title: taskTitle,
                isDone: false
        }
        setTasks([newTask, ...tasks])
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
            />
        </div>
    );
}

export default App;

