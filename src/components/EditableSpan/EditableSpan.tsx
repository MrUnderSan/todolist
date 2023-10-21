import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type PropsType = {
    text: string
    changeText: (text: string) => void
}

export const EditableSpan = React.memo(({text, changeText}: PropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string>(text)

    const changeEditMode = (isActive: boolean) => {
        setEditMode(isActive)
    }

    const onDoubleClickHandler = () => {
        changeEditMode(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }


    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeText(value)
            setEditMode(false)
        }
    }
    const onBlurHandler = () => {
        changeText(value)
        setEditMode(false)
    }

    return editMode
        ? <input type="text" value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} onBlur={onBlurHandler} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{text}</span>
})