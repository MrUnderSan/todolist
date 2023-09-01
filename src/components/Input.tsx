import React, {RefObject} from 'react';

type PropsType = {
    text: RefObject<HTMLInputElement>
    // setText: (text: string)=>void

}

export const Input: React.FC<PropsType> = ({text}) => {

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setText(e.currentTarget.value)
    // }

    return (
        <input
            type="text"
            ref={text}
            // value={text}
            // onChange={onChangeHandler}
        />
    );
};