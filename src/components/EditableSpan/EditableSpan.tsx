import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type PropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}
export const EditableSpan: FC<PropsType> = ({title, changeTitle}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const activeEditingMode = () => {
        setValue(title)
        setIsEditing(true)
    }

    const activeReadMode = () => {
        changeTitle(value)
        setIsEditing(false)
    }

    const onBlurHandler = () => {
        activeReadMode()
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activeReadMode()
        }
    }

    return (
        isEditing
            ? <input type="text" value={value} onChange={onChangeInput} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler} autoFocus/>
            : <span onDoubleClick={activeEditingMode}>{title}</span>
    )
};