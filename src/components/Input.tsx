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

    const buttonCallbackHandler = () => {
        props.callback(text)
        setText('')
    }

    return (
        <div>
            <input value={text} onChange={e => onChangeHandler(e)}/>
            <Button name='+' callback={buttonCallbackHandler} />
        </div>
    )
}