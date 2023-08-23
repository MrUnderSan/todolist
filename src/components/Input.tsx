import React, {ChangeEvent, useState} from 'react'
import {Button} from './Button'

type InputPropsType = {
    callback: (text: string) => void
}

export const Input = (props: InputPropsType) => {

    const [text, setText] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const submitText = () => {
        props.callback(text)
    }

    const ClearInput = () => {
        setText('')
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitText()
            ClearInput()
        }
    }

    const buttonCallbackHandler = () => {
        submitText()
        ClearInput()
    }

    return (
        <div>
            <input value={text} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <Button name="+" callback={buttonCallbackHandler}/>
        </div>
    )
}