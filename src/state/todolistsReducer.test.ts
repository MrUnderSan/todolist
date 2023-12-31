import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
    TodolistType
} from './todolistsReducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string

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

test('correct todolist should be removed', () => {

    const action = removeTodolistAC(todolistId1)

    const endState = todolistsReducer(todolists, action)

    expect(todolists.length).toBe(2)
    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
})

test('correct todolist filter should be changed', () => {

    const action = changeFilterAC(todolistId1, 'completed')

    const endState = todolistsReducer(todolists, action)

    expect(todolists[0].filter).toBe('all')
    expect(todolists[1].filter).toBe('all')
    expect(endState[0].filter).toBe('completed')
    expect(endState[1].filter).toBe('all')
})

test('correct todolist title should be changed', () => {

    const action = changeTodolistTitleAC(todolistId1, 'What to read')

    const endState = todolistsReducer(todolists, action)

    expect(todolists[0].title).toBe('What to learn')
    expect(todolists[1].title).toBe('What to buy')
    expect(endState[0].title).toBe('What to read')
    expect(endState[1].title).toBe('What to buy')
})