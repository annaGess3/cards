import React, {FC} from 'react';
import cls from '../Checkbox/Checkbox.module.css';
import {ICheckbox} from "../../types/ICheckbox/ICheckbox";
export const Checkbox:FC<ICheckbox> = (props) => {
    const {
        text,
        checked,
        onChange,
    } = props;

    return (
        <div className={cls.checkbox_wrapper}>
        <label className={cls.label}>{text}
            <input type="checkbox" checked={checked} onChange={() =>onChange(!checked)}/>
            <span className={cls.checkbox}></span>
        </label>
            </div>
    )
}