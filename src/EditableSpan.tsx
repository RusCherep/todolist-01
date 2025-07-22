import {ChangeEvent, useState} from "react";

type Props = {
    title: string
    className?:string
    changeItemTitle:(newTitle:string)=>void
}

export const EditableSpan = ({title, className, changeItemTitle}: Props) => {

    const [itemTitle, setItemTitle] = useState(title)

    const [isEditMode, setIsEditMode] = useState(false)

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode(false)
        changeItemTitle(itemTitle)
    }

    return (
        isEditMode
            ? <input
                value={itemTitle}
                onChange={onChangeTaskTitleHandler}
                onBlur={offEditMode}
                autoFocus={true}
            />
            : <span className={className} onDoubleClick={onEditMode}>{title}</span>
    )
}