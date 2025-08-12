import './App.css'
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {Task, ToDoList} from "./ToDoListOnChange.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Container, CssBaseline, Grid, Paper, Switch} from "@mui/material";
import {containerSX} from "./ToDoListOnChange.style.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from "@mui/material";
import {green, orange} from "@mui/material/colors";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, createTodolistAC,
    deleteTodoListAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTasksAC,
    tasksReducer
} from "./model/tasks-reducer.ts";


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

    // const [todoLists, setTodoLists] = useState<TodolistType[]>([
    //     {id: todolistId_1, title: "what to learn", filter: "All"},
    //     {id: todolistId_2, title: "what to buy", filter: "All"}
    // ])

    const [todolists, dispatchTodoList] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: "what to learn", filter: "All"},
        {id: todolistId_2, title: "what to buy", filter: "All"}
    ])

    // const [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId_1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false}
    //     ],
    //     [todolistId_2]: [
    //         {id: v1(), title: 'Beer', isDone: true},
    //         {id: v1(), title: 'Meat', isDone: true},
    //         {id: v1(), title: 'Cheese', isDone: false}
    //     ]
    // });


    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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


    //CRUD tasks

    const createTask = (title: Task["title"], todolistId: TodolistType["id"]) => {
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]})
        dispatchTasks(createTaskAC({title, todolistId}))
    }

    const changeTaskStatus = (taskId: Task["id"], newStatus: Task["isDone"], todolistId: TodolistType["id"]) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatus} : t)
        // })
        dispatchTasks(changeTaskStatusAC({taskId, newStatus, todolistId}))
    }

    const changeTaskTitle = (taskId: Task["id"], newTitle: Task["title"], todolistId: TodolistType["id"]) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        // })
        dispatchTasks(changeTaskTitleAC({taskId, newTitle, todolistId}))
    }

    const deleteTasks = (taskId: Task["id"], todolistId: TodolistType["id"]) => {
        //     setTasks({
        //         ...tasks,
        //         [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        //     })
        dispatchTasks(deleteTasksAC({taskId, todolistId}))
    }


    //CRUD todolists

    const changeToDoListFilter = (nextFilter: FilterValues, todolistId: TodolistType["id"]) => {
        dispatchTodoList(changeTodolistFilterAC({filter: nextFilter, id: todolistId}))
    }

    const changeToDoListTitle = (nextTitle: TodolistType["title"], todolistId: TodolistType["id"]) => {
        dispatchTodoList(changeTodolistTitleAC({title: nextTitle, id: todolistId}))
    }


    const deleteTodolist = (todolistId: TodolistType["id"]) => {
        const action = deleteTodoListAC(todolistId)
        dispatchTodoList(action)
        // dispatchToTasks(action)
    }

    const createTodolist = (title: TodolistType["title"]) => {
        const action = createTodolistAC(title)
        dispatchTodoList(action)
        // dispatchToTasks(action)

        // setTasks({...tasks, [newTodolistID]: []})
    }


    //UI - read
    const [isDarkMode, setIsDarkMode] = useState(false)
    const theme = createTheme(
        {
            palette: {
                primary: orange,
                secondary: green,
                mode: isDarkMode ? "dark" : "light"
            },
        }
    )

    const todolistsComponents = todolists.map(tl => {
        let filteredTasks = tasks[tl.id];

        if (tl.filter === "Active") {
            filteredTasks = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "Completed") {
            filteredTasks = tasks[tl.id].filter(t => t.isDone)
        }

        return (
            <Grid key={tl.id}>
                <Paper elevation={6} sx={{p: "15px"}}>
                    <ToDoList
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
                    />
                </Paper>
            </Grid>)

    })


    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar sx={containerSX}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Box>
                            <NavButton color="inherit">Sign in</NavButton>
                            <NavButton color="inherit">Sign up</NavButton>
                            <NavButton color="inherit" background={theme.palette.secondary.main}>Faq</NavButton>
                            <Switch onChange={() => setIsDarkMode(!isDarkMode)}/>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={"lg"}>
                    <Grid container sx={{p: "10px 0", justifyContent: "center"}}>
                        <CreateItemForm createItem={createTodolist} maxItemTitleLength={15}/>
                    </Grid>
                    <Grid container spacing={5}>
                        {todolistsComponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}