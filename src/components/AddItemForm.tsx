import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

    const buttonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px'
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label={error ? error : 'Type something'}
                variant="outlined"
                value={value}
                onChange={onChangeSetValueHandler}
                onKeyDown={onKeyDownSetValueHandler}
                className={error ? 'empty-value-error' : ''}
                size={'small'}
                error={!!error}
            />

            <Button
                variant="contained"
                size="small"
                style={buttonStyle}
                onClick={onClickAddTAskHandler}
                disabled={isAddTaskPossible}
            >+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
}