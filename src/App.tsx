import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Button} from './components/Button';
import {Input} from './components/Input';

type TodosType  = {
    userId: number,
    id: number,
    title: string
    completed: boolean
}


function App() {

    const [todos, setTodos] = useState<TodosType[]>([])

    // const [text, setText] = useState('')

    const text = useRef<HTMLInputElement>(null)

    const fetchFunc = () => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(response => response.json())
            .then(json => setTodos(json))
    }

    useEffect(()=> {
        fetchFunc()
    }, [])



    const showMeHandler = () => {
        fetchFunc()
    }

    const deleteMeMeHandler = () => {
        setTodos([])
    }

    const addTodo = () => {

        if(text.current) {

            const newTodo = {
                userId: 666,
                id: todos.length + 1,
                title: text.current.value,
                completed: false
            }

            setTodos([newTodo, ...todos])
            // setText('')
            text.current.value = ''

        }
    }

    return (
        <div className="App">
            <div>
                <Input
                    text={text}
                    // setText={setText}
                />
                <Button name='+' callback={addTodo}/>
            </div>
            <div>
                <Button name='Show me' callback={showMeHandler}/>
                <Button name='Delete me' callback={deleteMeMeHandler}/>
            </div>
            <ul>
                {todos.map(t=> (
                    <li key={t.id}>
                        <div>{t.id}</div>
                        <div>{t.title}</div>
                        <input type="checkbox" checked={t.completed}/>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default App;

