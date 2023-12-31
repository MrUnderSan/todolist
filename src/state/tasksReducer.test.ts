import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from './tasksReducer';
import {addTodolistAC, removeTodolistAC} from './todolistsReducer';

let todolistId1: string
let todolistId2: string

let tasks: TasksType

beforeEach(() => {
    todolistId1 = '1'
    todolistId2 = '2'

    tasks = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Beer', isDone: true},
            {id: '2', title: 'Fish', isDone: false},
            {id: '3', title: 'Nuts', isDone: false}
        ]
    }
})

test('correct task should be added in correct todolist', () => {
    const action = addTaskAC(todolistId1, 'Redux')

    const endState = tasksReducer(tasks, action)

    expect(tasks[todolistId1].length).toBe(3)
    expect(tasks[todolistId2].length).toBe(3)
    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe('Redux')

})
test('correct task should be removed in correct todolist', () => {
    const action = removeTaskAC(todolistId1, '1')

    const endState = tasksReducer(tasks, action)

    expect(tasks[todolistId1].length).toBe(3)
    expect(tasks[todolistId2].length).toBe(3)
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)

})
test('task status should be changed in correct task in correct todolist', () => {
    const action = changeTaskStatusAC(todolistId1, '3', true)

    const endState = tasksReducer(tasks, action)

    expect(tasks[todolistId1][2].isDone).toBeFalsy()
    expect(tasks[todolistId2][2].isDone).toBeFalsy()
    expect(endState[todolistId1][2].isDone).toBeTruthy()
    expect(endState[todolistId2][2].isDone).toBeFalsy()

})
test('task title should be changed in correct task in correct todolist', () => {
    const action = changeTaskTitleAC(todolistId1, '3', 'Vue')

    const endState = tasksReducer(tasks, action)

    expect(tasks[todolistId1][2].title).toBe('React')
    expect(tasks[todolistId2][2].title).toBe('Nuts')
    expect(endState[todolistId1][2].title).toBe('Vue')
    expect(endState[todolistId2][2].title).toBe('Nuts')

})

test('arr for tasks should be created with add new todolist', () => {
    const action = addTodolistAC('New todolist')

    const endState = tasksReducer(tasks, action)

    expect(Object.keys(tasks).length).toBe(2)
    expect(Object.keys(endState).length).toBe(3)
})

test('correct arr with tasks should be deleted with delete todolist', () => {
    const action = removeTodolistAC('1')

    const endState = tasksReducer(tasks, action)

    expect(Object.keys(tasks).length).toBe(2)
    expect(Object.keys(endState).length).toBe(1)
})