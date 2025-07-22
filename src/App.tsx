import './App.css'
import {useState} from "react";
import {v1} from "uuid";
import {Task, ToDoList} from "./ToDoListOnChange.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";

export type FilterValues = "All" | "Active" | "Completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksStateType = {
    [ToDoListId: string]: Task[]
}

//CRUD
export function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "what to learn", filter: "All"},
        {id: todolistId_2, title: "what to buy", filter: "All"}
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Cheese', isDone: false}
        ]
    });

//BLL

//UI

    //create task
    const createTask = (title: Task["title"], todolistId: TodolistType["id"]) => {
        // const newTask: Task = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // const updatedTasks = [...tasks[todolistId],newTask]
        // const nexTasksState = {...tasks,[todolistId]:updatedTasks}
        // setTasks(nexTasksState)

        setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]})
    }


    //update
    const changeTaskStatus = (taskId: Task["id"], newStatus: Task["isDone"], todolistId: TodolistType["id"]) => {
        // const todolistTasks = tasks[todolistId]
        // const updatedTasks = todolistTasks.map(t=>t.id ===taskId?{...t,isDone:newStatus} :t)
        // const nextState = {...tasks,[todolistId] :updatedTasks}
        // setTasks(nextState)

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatus} : t)
        })
    }

    const changeTaskTitle = (taskId: Task["id"], newTitle: Task["title"], todolistId: TodolistType["id"]) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        })

    }

    //delete task
    const deleteTasks = (taskId: Task["id"], todolistId: TodolistType["id"]) => {
        // const todolistTasks = tasks[todolistId]
        // const updatedTasks = todolistTasks.filter(t => t.id !== taskId)
        // const nextState = {...tasks,[todolistId]:updatedTasks}
        // setTasks(nextState);

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    }

    const changeToDoListFilter = (nextFilter: FilterValues, todolistId: TodolistType["id"]) => {
        const nextState = todoLists.map(tl => tl.id === todolistId ? {...tl, filter: nextFilter} : tl)
        setTodoLists(nextState)
    }

    const changeToDoListTitle = (nextTitle: TodolistType["title"], todolistId: TodolistType["id"]) => {
        const nextState = todoLists.map(tl => tl.id === todolistId ? {...tl, title: nextTitle} : tl)
        setTodoLists(nextState)
    }

    /*const deleteAllTasks = (todolistId: string) => {
        setTasks([todolistId]:[])
    }*/

    const deleteTodolist = (todolistId: TodolistType["id"]) => {
        const nextState = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(nextState)
    }

    const createTodolist = (title: string) => {
        // {id: v1(), title: 'HTML&CSS', isDone: true},
        const newTodolistID = v1();
        const newTodolist: TodolistType = {
            id: newTodolistID,
            title: title,
            filter: "All"
        }
        const nextState = [...todoLists, newTodolist]
        setTodoLists(nextState)
        setTasks({...tasks, [newTodolistID]: []})
    }


    //UI - read

    const todolistsComponents = todoLists.map(tl => {
        let filteredTasks = tasks[tl.id];

        if (tl.filter === "Active") {
            filteredTasks = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "Completed") {
            filteredTasks = tasks[tl.id].filter(t => t.isDone)
        }

        return (<ToDoList
            key={tl.id}
            tasks={filteredTasks}
            title={tl.title}
            filter={tl.filter}
            todolistId={tl.id}
            deleteTasks={deleteTasks}
            deleteTodolist={deleteTodolist}
            changeToDoListFilter={changeToDoListFilter}
            changeTaskTitle={changeTaskTitle}
            changeToDoListTitle={changeToDoListTitle}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            // deleteAllTasks={deleteAllTasks}
        />)

    })


    return (
        <div className="app">

            <CreateItemForm createItem={createTodolist} maxItemTitleLength={15}/>
            {todolistsComponents}
        </div>
    )
}