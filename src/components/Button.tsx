type ButtonPropsType = {
    name: string
    callback: (a?: string) => void
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => props.callback();

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    );
};