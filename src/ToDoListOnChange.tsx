import {ButtonTemplate} from "./Button.tsx";
import {FilterValues, TodolistType} from "./App.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";


export type Task = {
    id: string
    title: string
    isDone: boolean


}

type Props = {
    title: string
    tasks: Task[]
    filter: FilterValues
    todolistId: TodolistType["id"]
    deleteTasks: (taskId: Task["id"], todolistId: TodolistType["id"]) => void
    deleteTodolist: (todolistId: TodolistType["id"]) => void
    createTask: (title: Task["title"], todolistId: TodolistType["id"]) => void;
    changeToDoListFilter: (nextFilter: FilterValues, todolistId: TodolistType["id"]) => void
    changeTaskStatus: (taskId: Task["id"], newStatus: Task["isDone"], todolistId:TodolistType["id"]) => void
    // deleteAllTasks: () => void
}


export const ToDoList = ({
                             title,
                             tasks,
                             filter,
                             createTask,
                             todolistId,
                             deleteTasks,
                             deleteTodolist,
                             changeTaskStatus,
                             // deleteAllTasks,
                             changeToDoListFilter
                         }: Props) => {
    const [taskTitle, setTaskTitle] = useState("")

    const [error, setError] = useState(false)


    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(trimmedTitle, todolistId);
        } else {
            setError(true)
        }
        setTaskTitle("");
    }
    const IsAddTaskPossible = taskTitle !== "" && taskTitle.length <= 15

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && IsAddTaskPossible) {
            createTaskHandler()
        }
    }

const deleteTodolistHandler = ()=> ()=>{deleteTodolist(todolistId)}

    const maxTaskTitleLength = 15

    return (
        <div>
            <h3>
                {title}
                <ButtonTemplate title={"X"} onClickHandler={deleteTodolistHandler()}/>
            </h3>
            <div>
                <input
                    value={taskTitle}
                    className={error ? "error" : ""}
                    placeholder={`Max ${maxTaskTitleLength} charters`}
                    onChange={onChangeTaskTitleHandler}
                    onKeyDown={onKeyDownCreateTaskHandler}
                />

                <ButtonTemplate title={"+"}
                                disabled={!IsAddTaskPossible}
                                onClickHandler={() => createTaskHandler()}/>

                {taskTitle && taskTitle.length < maxTaskTitleLength &&
                    <div>rest {maxTaskTitleLength - taskTitle.length}</div>}
                {taskTitle && taskTitle.length === maxTaskTitleLength && <div>Max charters for task</div>}
                {taskTitle && taskTitle.length > maxTaskTitleLength &&
                    <div>More then {maxTaskTitleLength} charters</div>}
                {error && <div style={{color: "red"}}>Enter valid title</div>}

            </div>

            {tasks.length === 0
                ? (
                    <p>Тасок нет</p>
                )
                : (
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input
                                        type="checkbox"
                                        checked={task.isDone}
                                        onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}
                                    />
                                    <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                                    <ButtonTemplate title={"x"}
                                                    onClickHandler={() => deleteTasks(task.id, todolistId)}/>

                                </li>
                            )
                        })}
                    </ul>
                )}
            <div>
                <ButtonTemplate classes={filter === "All" ? "btn-filter-active" : ""} title={"All"}
                                onClickHandler={() => changeToDoListFilter("All", todolistId)}/>
                <ButtonTemplate classes={filter === "Active" ? "btn-filter-active" : ""} title={"Active"}
                                onClickHandler={() => changeToDoListFilter("Active", todolistId)}/>
                <ButtonTemplate classes={filter === "Completed" ? "btn-filter-active" : ""} title={"Completed"}
                                onClickHandler={() => changeToDoListFilter("Completed", todolistId)}/>
            </div>

            {/*<div>
                <ButtonTemplate title={"Delete All"} onClickHandler={() => {
                    deleteAllTasks()
                }}/>
            </div>*/}
        </div>)
}

