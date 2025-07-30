import './App.css'
import {useState} from "react";
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

    const todolistsComponents = todoLists.map(tl => {
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
                            <Switch onChange={()=>setIsDarkMode(!isDarkMode)}/>
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