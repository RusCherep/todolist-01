
type ButonType = {
    title:string
    onClickHandler?: () => void
}

export const ButtonTemplate = ({title, onClickHandler}:ButonType) =>{
    return(
        <button onClick={onClickHandler}>{title}</button>
    )
}