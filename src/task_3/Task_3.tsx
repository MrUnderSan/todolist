import React, {ReactNode} from 'react';
import {Input} from './Input';


//find the problem and fix it as part of composition optimization, memo, children

type Task_3PropsType = {
    children: ReactNode
}

export const Task_3 = (props: Task_3PropsType) => {

    console.log('Task_3')

    return (
        <div>
            <div>Lags when change value</div>
            <Input/>
            {props.children}
        </div>
    );
};