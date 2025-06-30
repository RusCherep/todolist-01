import {ButtonTemplate} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {useRef} from "react";


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


export const ToDoListItemRef = ({title, tasks, deleteTasks, changeToDoListFilter, createTask}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/>
                <ButtonTemplate title={"+"} onClickHandler={()=>{
                    if(inputRef.current) {
                        createTask(inputRef.current.value);
                        inputRef.current.value="";
                    }
                }}/>
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
                                    <ButtonTemplate title={"x"} onClickHandler={() => deleteTasks(task.id)}/>

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

