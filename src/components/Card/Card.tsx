import React from "react";
import cls from './Card.module.css';
import {cardDTO} from "../../types/cardDTO/cardDTO";

export const Card = (card: cardDTO) => {
    return (
        <div className={cls.card}
             key={`${card.value} ${card.suit}`}>
            <img
                alt={`${card.value} ${card.suit}`}
                src={card.image}
                width="150px"
                height='200px'>

            </img>
            <div>{card.value} {card.suit}</div>
        </div>
    )
}