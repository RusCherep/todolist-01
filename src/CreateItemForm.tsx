import {ButtonTemplate} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props={
    createItem:(newItemTitle:string)=>void
    maxItemTitleLength: number
}


export const CreateItemForm = ({createItem, maxItemTitleLength}:Props) => {

    const [taskTitle, setTaskTitle] = useState("")

    const [error, setError] = useState(false)



    const IsAddTaskPossible = taskTitle !== "" && taskTitle.length <= 15

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle);
        } else {
            setError(true)
        }
        setTaskTitle("");
    }

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && IsAddTaskPossible) {
            createTaskHandler()
        }
    }

    return (
        <div>
            <input
                value={taskTitle}
                className={error ? "error" : ""}
                placeholder={`Max ${maxItemTitleLength} charters`}
                onChange={onChangeTaskTitleHandler}
                onKeyDown={onKeyDownCreateTaskHandler}
            />

            <ButtonTemplate title={"+"}
                            disabled={!IsAddTaskPossible}
                            onClickHandler={() => createTaskHandler()}/>

            {taskTitle && taskTitle.length < maxItemTitleLength &&
                <div>rest {maxItemTitleLength - taskTitle.length}</div>}
            {taskTitle && taskTitle.length === maxItemTitleLength && <div>Max charters for task</div>}
            {taskTitle && taskTitle.length > maxItemTitleLength &&
                <div>More then {maxItemTitleLength} charters</div>}
            {error && <div style={{color: "red"}}>Enter valid title</div>}

        </div>
    );
};

