import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type PropsType = {
    callback: (title: string) => void
}

export const AddItemForm: FC<PropsType> = ({callback}) => {

    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const isAddTaskPossible = !value

    const addTaskHandler = () => {
        if (value.trim()) {
            callback(value.trim())
        } else {
            setError('Please, enter text')
        }
        setValue('')
    }

    const onClickAddTAskHandler = () => {
        !isAddTaskPossible &&
        addTaskHandler()
    }

    const onChangeSetValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onKeyDownSetValueHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        e.key === 'Enter' && addTaskHandler()
    }

    return (
        <div>
            <input
                value={value}
                onChange={onChangeSetValueHandler}
                onKeyDown={onKeyDownSetValueHandler}
                className={error ? 'empty-value-error' : ''}
            />
            <button onClick={onClickAddTAskHandler} disabled={isAddTaskPossible}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}