import React, {KeyboardEvent, ChangeEvent, FC, useState} from 'react';

type PropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan: FC<PropsType> = ({title, callback}) => {

    const [editableTitle, setEditableTitle] = useState(title)

    const [isEditable, setIsEditable] = useState(false)

    const toggleEditMode = () => {
        setIsEditable(prev => !prev)
    }

    const updateTask = () => {
        callback(editableTitle)
        toggleEditMode()
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
            updateTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(e.currentTarget.value)
    }


    return (
        isEditable
            ? <input value={editableTitle} onChange={onChangeHandler} autoFocus onKeyUp={onKeyUpHandler} onBlur={updateTask}/>
            : <span onDoubleClick={toggleEditMode}>{title}</span>
    );
};