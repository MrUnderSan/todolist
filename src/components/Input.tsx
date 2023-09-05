import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    className?: string
}

export const Input: React.FC<PropsType> = (
    {
        value,
        onChange,
        onKeyDown,
        className
    }) => {

    return (
        <input value={value}
               onChange={onChange}
               onKeyDown={onKeyDown}
               className={className ? className : ''}
        />
    );
};