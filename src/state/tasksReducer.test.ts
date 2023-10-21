import {addTaskAC, tasksReducer, TasksType} from './tasksReducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string


let tasks: TasksType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    tasks = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Fish', isDone: false},
            {id: v1(), title: 'Nuts', isDone: false}
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