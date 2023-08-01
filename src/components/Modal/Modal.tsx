import React, {ReactNode, useState} from 'react';
import cls from './Modal.module.css';
import {Button} from "../Button/Button";
import {Checkbox} from "../Checkbox/Checkbox";

interface ModalProps {
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: ((
        isClubs: boolean,
        isDiamonds: boolean,
        isHearts: boolean,
        isSpades: boolean,
        isShuffle: boolean) => void);
}

export const Modal = (props: ModalProps) => {
    const {
        children,
        isOpen,
        onClose,
    } = props;

    const [isShuffle, setIsShuffle] = useState(false);
    const [isHearts, setIsHearts] = useState(true);
    const [isSpades, setIsSpades] = useState(true);
    const [isDiamonds, setIsDiamonds] = useState(true);
    const [isClubs, setIsClubs] = useState(true);
    const onContentClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    }
    const closeHundler = () => {
        if (onClose) {
            onClose(isClubs, isDiamonds, isHearts, isSpades, isShuffle);
        }

    }
    return (
        <div className={isOpen ? cls.opened : cls.Modal}>
            <div className={cls.overlay}>
                <div className={cls.content} onClick={onContentClick}>
                    {children}
                    <div className={cls.checkbox}>
                        <Checkbox checked={isHearts} onChange={setIsHearts} text='Hearts'/>
                        <Checkbox checked={isClubs} onChange={setIsClubs} text='Clubs'/>
                        <Checkbox checked={isSpades} onChange={setIsSpades} text='Spades'/>
                        <Checkbox checked={isDiamonds} onChange={setIsDiamonds} text='Diamonds'/>
                    </div>
                    <div className={cls.shuffle}>
                        <Checkbox text='Перемешать' checked={isShuffle} onChange={setIsShuffle}></Checkbox>
                    </div>
                    <Button type='button' onClick={closeHundler} text='Применить'></Button>
                </div>
            </div>
        </div>
    )
}