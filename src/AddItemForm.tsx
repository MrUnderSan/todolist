import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <div>
        <TextField
            variant={'outlined'}
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            error={!!error}
            size={'small'}
            label={'Title'}
            helperText={error}
        />
        <Button
            variant={'contained'}
            color={'primary'}
            onClick={addItem}
            style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
        >+</Button>
    </div>
}