import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {Todos} from './Todos';
import {getTodolistsTC} from './reducers/TodolistReducer';


function App() {

    const todos = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    return (
        <div className="App">
            {todos.map(el => {
                return (
                    <Todos
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        filter={el.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;