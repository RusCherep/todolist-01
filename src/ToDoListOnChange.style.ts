import {SxProps} from "@mui/material";


export const containerSX: SxProps = {
    display: "flex",
    justifyContent: "space-between"
}

export const GetListItemSX = (isDone:boolean): SxProps =>     ({
    fontWeight: isDone ? "normal" : "bold",
    opacity: isDone ?"0.5" : "1"
})
