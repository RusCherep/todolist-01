import {TasksStateType, TodolistType} from "../App.tsx";
import {ActionType} from "./todolists-reducer.ts";
import {v1} from "uuid";
import {Task} from "../ToDoListOnChange.tsx";


export const tasksReducer = (
    tasks: TasksStateType,
    action: ActionType
): TasksStateType => {
    switch (action.type) {
        case "create_task":
            return {
                ...tasks,
                [action.payload.todolistId]: [...tasks[action.payload.todolistId], {
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }]
            }

        case"change_task_status":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.newStatus
                } : t)
            }

        case "change_task_title":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }

        case "delete_tasks":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }



        case "create_todolist":
            return {...tasks, [action.payload.id]: []};

        case "delete_todolist": {
            const copyState = {...tasks}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return tasks;
    }
}


export const createTaskAC = (payload: { title: Task["title"], todolistId: TodolistType["id"] }) => ({
    type: "create_task",
    payload: payload
} as const)

export const changeTaskStatusAC = (payload: {
                                       taskId: Task["id"],
                                       newStatus: Task["isDone"],
                                       todolistId: TodolistType["id"]
                                   }
) => (
    {
        type: "change_task_status",
        payload: payload
    } as const)


export const changeTaskTitleAC = (payload: {
                                      taskId: Task["id"],
                                      newTitle: Task["title"],
                                      todolistId: TodolistType["id"]
                                  }
) => ({
    type: "change_task_title",
    payload: payload
} as const)

export const deleteTasksAC = (payload: { taskId: Task["id"], todolistId: TodolistType["id"] }) => ({
    type: "delete_tasks",
    payload: payload
} as const)


