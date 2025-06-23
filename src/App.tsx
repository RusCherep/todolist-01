import './App.css'
import {Task, ToDoList} from "./ToDoList.tsx";
import {useState} from "react";

export type FilterValues = "All" | "Active" | "Completed"
//CRUD
export function App() {

//BLL
    const [tasks, setTasks] =
        useState([
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
            {id: 4, title: 'Redux', isDone: false},
            {id: 5, title: 'Typescript', isDone: false},
            {id: 6, title: 'RTK query', isDone: false},
        ])
//UI

    const [filter, setFilter] = useState<FilterValues>("All")

    let filteretdTasks = tasks;

    if (filter === "Active"){
        filteretdTasks = tasks.filter(t=>t.isDone === false)
    }
    if (filter === "Completed"){
        filteretdTasks = tasks.filter(t=>t.isDone === true)
    }

    const changeToDoListFilter = (nextFilter:FilterValues)=>{
        setFilter(nextFilter);
    }

    const deleteTasks = (taskId: Task["id"]) => {
        const nextTasks = tasks.filter(t => t.id !== taskId)
        setTasks(nextTasks);
    }

    return (
        <div className="app">
            <ToDoList tasks={filteretdTasks} title={"What to learn"} deleteTasks={deleteTasks} changeToDoListFilter={changeToDoListFilter}/>
        </div>
    )
}