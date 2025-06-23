import {ButtonTemplate} from "./Button.tsx";
import {FilterValues} from "./App.tsx";


export type Task = {
    id: number
    title: string
    isDone: boolean


}

type Props = {
    title: string
    tasks: Task[]
    deleteTasks: (taskId: Task["id"]) => void
    changeToDoListFilter:(nextFilter:FilterValues)=>void
}


export const ToDoList = ({title, tasks, deleteTasks, changeToDoListFilter}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <ButtonTemplate title={"+"}/>
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

