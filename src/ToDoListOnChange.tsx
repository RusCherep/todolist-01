import {ButtonTemplate} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";



export type Task = {
    id: string
    title: string
    isDone: boolean


}

type Props = {
    title: string
    tasks: Task[]
    deleteTasks: (taskId: Task["id"]) => void
    createTask:(title:string)=>void;
    changeToDoListFilter:(nextFilter:FilterValues)=>void

}



export const ToDoList = ({title, tasks, deleteTasks, changeToDoListFilter, createTask}: Props) => {
    const [taskTitle, setTaskTitle]= useState("")

    const createTaskHandler=() =>{
        createTask(taskTitle);
        setTaskTitle("");
    }
    const IsAddTaskPossible = taskTitle !== "" && taskTitle.length <= 15

    const onChangeTascTitleHandler = (e:ChangeEvent<HTMLInputElement>)=>setTaskTitle(e.currentTarget.value)

    const onKeyDownCreateTaskHandler = (e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === "Enter" && IsAddTaskPossible){
            createTaskHandler()
        }
    }

    const maxTaskTitleLenght = 15

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    placeholder={`Max ${maxTaskTitleLenght} charters`}
                    onChange={onChangeTascTitleHandler}
                    onKeyDown={onKeyDownCreateTaskHandler}
                />

                <ButtonTemplate title={"+"}
                                disabled={!IsAddTaskPossible}
                                onClickHandler={()=>createTaskHandler()}/>
                {taskTitle && taskTitle.length < maxTaskTitleLenght && <div>rest {maxTaskTitleLenght-taskTitle.length}</div>}
                {taskTitle && taskTitle.length === maxTaskTitleLenght && <div>Max charters for task</div>}
                {taskTitle && taskTitle.length >maxTaskTitleLenght && <div>More then {maxTaskTitleLenght} charters</div>}
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
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <ButtonTemplate title={"x"}
                                                    onClickHandler={() => deleteTasks(task.id)}/>

                                </li>
                            )
                        })}
                    </ul>
                )}
            <div>
                <ButtonTemplate title={"All"} onClickHandler={()=>changeToDoListFilter("All")}/>
                <ButtonTemplate title={"Active"} onClickHandler={()=>changeToDoListFilter("Active")}/>
                <ButtonTemplate title={"Completed"} onClickHandler={()=>changeToDoListFilter("Completed")}/>
            </div>
        </div>)
}

