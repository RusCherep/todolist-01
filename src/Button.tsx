
type ButonType = {
    title:string
    onClickHandler?: () => void
}
//Button Template

export const ButtonTemplate = ({title, onClickHandler}:ButonType) =>{
    return(
        <button onClick={onClickHandler}>{title}</button>
    )
}