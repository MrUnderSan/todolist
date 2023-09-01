import React from 'react';

type PropsType = {
    name: string
    callback: ()=>void

}

export const Button: React.FC<PropsType> = ({name, callback}) => {
    const onClickHandler = () => {
        callback()
    }
    return (
        <button onClick={onClickHandler}>
            {name}
        </button>
    );
};