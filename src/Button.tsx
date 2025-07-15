
type ButonType = {
    title:string
    disabled?:boolean
    onClickHandler?: () => void
    classes?: string
}
//Button Template

export const ButtonTemplate = ({title, onClickHandler, disabled, classes}:ButonType) =>{
    return(
        <button className={classes} disabled={disabled} onClick={onClickHandler}>{title}</button>
    )
}