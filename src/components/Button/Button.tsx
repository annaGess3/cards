import React, {FC} from "react";
import cls from './Button.module.css';
import {IButton} from "../../types/IButton/IButton";

export const Button: FC<IButton> = (props) => {
    const {
        text,
        onClick,
        ...rest
    } = props;
    return (
        <button {...rest} className={cls.button} onClick={() => onClick()}>{text}</button>
    )
}