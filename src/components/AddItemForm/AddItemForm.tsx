import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<PropsType> = ({addItem}) => {

    const [value, setValue] = useState('')

    const [error, setError] = useState<string | null>(null)

    const isButtonDisabled = !value

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addTask = () => {
        if (value.trim() !== '') {
            addItem(value)
        } else {
            setError('Title is required')
        }
        setValue('')
    }

    const onClickButtonHandler = () => {
        addTask()
    }

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>

            <Input
                value={value}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownInputHandler}
                className={error ? 'error' : ''}
            />
            <Button name="+" onClick={onClickButtonHandler} disabled={isButtonDisabled}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
};