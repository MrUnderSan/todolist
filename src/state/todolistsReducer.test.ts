import {addTodolistAC, todolistsReducer, TodolistType} from './todolistsReducer';
import {v1} from 'uuid';

let todolistId1
let todolistId2

let todolists: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    todolists = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be added', () => {

    const title = 'New title'

    const action = addTodolistAC(title)

    const endState = todolistsReducer(todolists, action)

    expect(todolists.length).toBe(2)
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New title')
})