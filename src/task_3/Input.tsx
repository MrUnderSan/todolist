import {FC, useRef} from 'react';

export const Input: FC = () => {
    console.log('Input');

    const ref = useRef<HTMLInputElement>(null);

    return <input ref={ref} type="text"/>;
};