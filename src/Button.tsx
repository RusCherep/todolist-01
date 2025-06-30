
type ButonType = {
    title:string
    disabled?:boolean
    onClickHandler?: () => void
}
//Button Template

export const ButtonTemplate = ({title, onClickHandler, disabled}:ButonType) =>{
    return(
        <button disabled={disabled} onClick={onClickHandler}>{title}</button>
    )
}