import './App.css'
import {useState} from "react";
import {v1} from "uuid";
import {Task, ToDoList} from "./ToDoListOnChange.tsx";

export type FilterValues = "All" | "Active" | "Completed"
//CRUD
export function App() {

//BLL
    const [tasks, setTasks] =
        useState([
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ])
//UI

    //create task
    const createTask=(title:string)=>{
        const newTask:Task={
            id: v1(),
            title: title,
            isDone: false
        }
         const newTasks = [newTask, ...tasks]
         setTasks(newTasks)
    }


    //filter
    const [filter, setFilter] = useState<FilterValues>("All")

    let filteretdTasks = tasks;

    if (filter === "Active"){
        filteretdTasks = tasks.filter(t=>!t.isDone)
    }
    if (filter === "Completed"){
        filteretdTasks = tasks.filter(t=>t.isDone)
    }

    const changeToDoListFilter = (nextFilter:FilterValues)=>{
        setFilter(nextFilter);
    }

    //delete task
    const deleteTasks = (taskId: Task["id"]) => {
        const nextTasks = tasks.filter(t => t.id !== taskId)
        setTasks(nextTasks);
    }

    return (
        <div className="app">
            <ToDoList tasks={filteretdTasks}
                      title={"What to learn"}
                      deleteTasks={deleteTasks}
                      changeToDoListFilter={changeToDoListFilter}
                      createTask={createTask} />
        </div>
    )
}