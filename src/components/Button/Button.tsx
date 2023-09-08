import React from 'react';

type PropsType = {
    name: string
    callback: () => void
    className?: string
    disabled?: boolean
}

export const Button :React.FC<PropsType> = ({name, callback, className, disabled}) => {

    return (
        <button
            onClick={callback}
            className={className ? className : ''}
            disabled={disabled}
        >
            {name}
        </button>
    );
};