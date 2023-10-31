import React, {FC, memo, ReactNode} from 'react'
import {Button, ButtonProps} from '@mui/material';

interface IMemoButton extends ButtonProps {
    children: ReactNode
}

export const MemoButton: FC<IMemoButton> = memo(({children, ...rest}) => {
    console.log('MyButton')
    return (
        <Button
            {...rest}
        >
            {children}
        </Button>
    )
})