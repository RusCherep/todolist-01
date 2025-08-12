import {FilterValues, TodolistType} from "../App.tsx";
import {v1} from "uuid";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTasksAC} from "./tasks-reducer.ts";

export type DeleteTodoListsActionType = ReturnType<typeof deleteTodoListAC>
export type CreateTodoListsActionType = ReturnType<typeof createTodolistAC>
export type CreateTodoListsTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type CreateTodoListsFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type createTaskActionType = ReturnType<typeof createTaskAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type deleteTasksActionType = ReturnType<typeof deleteTasksAC>

export type ActionType =
    DeleteTodoListsActionType |
    CreateTodoListsActionType |
    CreateTodoListsTitleActionType |
    CreateTodoListsFilterActionType|

    createTaskActionType|
    changeTaskStatusActionType|
    changeTaskTitleActionType|
    deleteTasksActionType


export const todolistsReducer = (
    todoLists: TodolistType[],
    action: ActionType
): TodolistType[] => {
    switch (action.type) {
        case "delete_todolist":
            return todoLists.filter(tl => tl.id !== action.payload.id);

        case "create_todolist": {
            const newTodolist: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: "All"
            }
            return [...todoLists, newTodolist]
        }

        case "change_toDoList_title":
            return todoLists.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)

        case "change_toDoList_filter":
            return todoLists.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)

        default:
            return todoLists;
    }
}
//AC === ActionCreator
export const deleteTodoListAC = (id: TodolistType["id"]) => ({
    type: "delete_todolist",
    payload: {
        id: id
    }
} as const)


export const createTodolistAC = (title: TodolistType["title"]) => ({
    type: "create_todolist",
    payload: {
        id: v1(),
        title
    }
} as const)


export const changeTodolistTitleAC = (payload: { id: TodolistType["id"], title: TodolistType["title"] }) => ({
    type: "change_toDoList_title",
    payload: payload
} as const)

export const changeTodolistFilterAC = (payload: { id: TodolistType["id"], filter: FilterValues }) => ({
    type: "change_toDoList_filter",
    payload: payload
} as const)



