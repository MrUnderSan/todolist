import React from 'react';

type PropsType = {
    name: string
    callback: () => void
    className?: string
}

export const Button :React.FC<PropsType> = ({name, callback, className}) => {
    const onClickHandler = () => {
        callback()
    }
    return (
        <button
            onClick={onClickHandler}
            className={className ? className : ''}
        >
            {name}
        </button>
    );
};