import React from 'react';

type PropsType = {
    name: string
    onClick: () => void
    className?: string
    disabled?: boolean
}

export const Button :React.FC<PropsType> = ({name, onClick, className, disabled}) => {

    return (
        <button
            onClick={onClick}
            className={className ? className : ''}
            disabled={disabled}
        >
            {name}
        </button>
    );
};