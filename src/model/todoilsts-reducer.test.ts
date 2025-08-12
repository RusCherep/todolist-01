import {v1} from 'uuid'
import {beforeEach, expect, test} from 'vitest'
import type {TodolistType} from '../App'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodoListAC,
    todolistsReducer
} from './todolists-reducer'

let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]
})


test('correct todolist should be deleted', () => {
    // 2. Действие

    const endState = todolistsReducer(startState, deleteTodoListAC(todolistId1) )

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

// test('correct todolist should be created', () => {
//     const title = 'New todolist'
//     const endState = todolistsReducer(startState, createTodolistAC(title))
//
//     expect(endState.length).toBe(3)
//     expect(endState[2].title).toBe(title)
// })

test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})


test('correct todolist should change its filter', () => {
    const filter = 'Completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter}))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(filter)
})