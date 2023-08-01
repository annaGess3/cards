import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Modal} from '../components/Modal/Modal';
import {getDeckID, getOneDeck, reshuffleDeck} from "../cardsAPIservices/servisesFunctions";
import {Button} from "../components/Button/Button";
import {Card} from "../components/Card/Card";
import {cardDTO} from "../types/cardDTO/cardDTO";

function App() {
    const initialSuits = {
        isHearts: true,
        isDiamonds: true,
        isSpades: true,
        isClubs: true,
    }
    const [cards, setCards] = useState<cardDTO[]>([]);
    const [filteredCards, setFilteredCards] = useState(cards);
    const [deckID, setDeckID] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const refSuits = useRef(initialSuits);
    const refCur = refSuits.current;
    const changeSuits = () => {
        setFilteredCards(() => cards.filter((elem) => {
            if ((refCur.isClubs && elem.suit === 'CLUBS')) return elem;
            if (refCur.isDiamonds && elem.suit === 'DIAMONDS') return elem;
            if (refCur.isHearts && elem.suit === 'HEARTS') return elem;
            if (refCur.isSpades && elem.suit === 'SPADES') return elem;
        }));
    };
    const onClose = (isClubs: boolean, isDiamonds: boolean, isHearts: boolean, isSpades: boolean, isShuffle: boolean) => {
        refCur.isDiamonds = isDiamonds;
        refCur.isHearts = isHearts;
        refCur.isSpades = isSpades;
        refCur.isClubs = isClubs;
        if (isShuffle) {
            reshuffleDeck(deckID).then(() => {
                setShuffle(!shuffle);
            });
        }
        changeSuits();
        setIsOpen(false);
    }

    useEffect(() => {
        if (deckID === '') {
            getDeckID().then(
                (res) => {
                    setDeckID(res)
                },
                (error) => {
                    setError(error)
                }
            );
        }
    }, [])
    useEffect(() => {
        if (deckID !== '') {
            getOneDeck(deckID).then(
                (res) => {
                    setLoading(false);
                    setCards(res.cards);
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            );
        }
    }, [deckID, shuffle])
    useEffect(() => {
        if (cards) {
            changeSuits();
        }
    })

    return (
        <div className="App">
            {error && <div>Server error. Try later</div>}
            {loading && <div>Loading...</div>}
            <div className="modal_button">
                <Button
                    type='button'
                    onClick={() => setIsOpen(true)}
                    text='Настроить'/>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            />
            {filteredCards && filteredCards.map((card) => (
                <Card {...card}/>
            ))
            }
        </div>
    );
}
export default App;
