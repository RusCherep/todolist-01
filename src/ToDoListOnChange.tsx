// import {ButtonTemplate} from "./Button.tsx";
import {FilterValues, TodolistType} from "./App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {containerSX, GetListItemSX} from "./ToDoListOnChange.style.ts";


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
    changeTaskTitle: (taskId: Task["id"], newTitle: Task["title"], todolistId: TodolistType["id"]) => void
    changeTaskStatus: (taskId: Task["id"], newStatus: Task["isDone"], todolistId: TodolistType["id"]) => void
    changeToDoListTitle: (nextTitle: TodolistType["title"], todolistId: TodolistType["id"]) => void
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
                             changeToDoListFilter,
                             changeToDoListTitle,
                             changeTaskTitle
                         }: Props) => {

    const createTaskHandler = (newItemTitle: string) => {
        createTask(newItemTitle, todolistId);
    }


    const deleteTodolistHandler = () => () => {
        deleteTodolist(todolistId)
    }

    // const maxTaskTitleLength = 15
    const changeItemTitleHandler = (newTitle: string) => {
        changeToDoListTitle(newTitle, todolistId)
    }

    return (
        <div className={"toDoList"}>
            <h3>
                <EditableSpan title={title} changeItemTitle={changeItemTitleHandler}/>

                <IconButton size={"small"}
                            onClick={deleteTodolistHandler()}>
                    <DeleteIcon fontSize={"small"}/>
                </IconButton>
                {/*<ButtonTemplate title={"X"} onClickHandler={deleteTodolistHandler()}/>*/}
            </h3>
            {/*<div>
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

            </div>*/}

            <CreateItemForm createItem={createTaskHandler} maxItemTitleLength={15}/>

            {tasks.length === 0
                ? (
                    <p>Тасок нет</p>
                )
                : (
                    <List>
                        {tasks.map(task => {
                            const changeToDoListTitleHandler = (newTitle: string) => changeTaskTitle(task.id, newTitle, todolistId)
                            return (
                                <ListItem key={task.id} disablePadding
                                          secondaryAction={<IconButton
                                              size={"small"}
                                              onClick={() => deleteTasks(task.id, todolistId)}>
                                              <DeleteIcon fontSize={"small"}/>
                                          </IconButton>}>
                                    <Checkbox
                                        checked={task.isDone}
                                        onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}
                                    />
                                    {/*<span className={task.isDone ? "task-done" : "task"}>{task.title}</span>*/}
                                    <Box sx={GetListItemSX(task.isDone)}>
                                        <EditableSpan title={task.title}
                                                      changeItemTitle={changeToDoListTitleHandler}
                                                      // className={task.isDone ? "task-done" : "task"}
                                        />
                                    </Box>

                                    {/*<ButtonTemplate title={"x"} onClickHandler={() => deleteTasks(task.id, todolistId)}/>*/}
                                </ListItem>
                            )
                        })}
                    </List>
                )}
            <Box sx={containerSX}>
                <Button size={"small"}
                        variant={"contained"}
                        disableElevation
                        color={filter === "All" ? "secondary" : "primary"}
                        onClick={() => changeToDoListFilter("All", todolistId)}>
                    All
                </Button>
                <Button size={"small"}
                        variant={"contained"}
                        disableElevation
                        color={filter === "Active" ? "secondary" : "primary"}
                        onClick={() => changeToDoListFilter("Active", todolistId)}>
                    Active
                </Button>
                <Button size={"small"}
                        variant={"contained"}
                        disableElevation
                        color={filter === "Completed" ? "secondary" : "primary"}
                        onClick={() => changeToDoListFilter("Completed", todolistId)}>
                    Completed
                </Button>

                {/*<ButtonTemplate classes={filter === "All" ? "btn-filter-active" : ""} title={"All"}*/}
                {/*                onClickHandler={() => changeToDoListFilter("All", todolistId)}/>*/}
                {/*<ButtonTemplate classes={filter === "Active" ? "btn-filter-active" : ""} title={"Active"}*/}
                {/*                onClickHandler={() => changeToDoListFilter("Active", todolistId)}/>*/}
                {/*<ButtonTemplate classes={filter === "Completed" ? "btn-filter-active" : ""} title={"Completed"}*/}
                {/*                onClickHandler={() => changeToDoListFilter("Completed", todolistId)}/>*/}
            </Box>
        </div>)
}

