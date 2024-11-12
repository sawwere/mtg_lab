import './style.css';

import React, { useRef, useState } from 'react';
import { useSelectedCardContext } from '../../providers/SelectedCardProvider';
import { useDeckContext } from '../../providers/DeckProvider';
import { Mtg } from "../../api/mtg";

const SEARCH_DELAY = 1000;


function SearchMenu() {
    const mtg = new Mtg();

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const queryTimeoutRef = useRef(null);
    
    const [cards, setCards ] = useState([]);

    const { setSelectedCard, setCount } = useSelectedCardContext();
    const { deck } = useDeckContext();
    return (
        <div ref={containerRef} id="menu">
            <h2>Поиск карт</h2>
            <input ref={inputRef} id="cardNameInput"
                type="text"
                defaultValue="" 
                placeholder="Введите имя карты" 
                onInput={() => {
                    clearTimeout(queryTimeoutRef.current);
                    queryTimeoutRef.current = setTimeout(() => {
                        mtg.loadCards(inputRef.current.value).then(x => setCards(x));
                    }, SEARCH_DELAY);
                }}
            />
            <div id="listContainer">
                <ul>
                    {cards.map(card => (
                        <li key={card.id}>
                            <button className='buttonCardSearch' 
                                    onClick={ () => {
                                        setSelectedCard(card);
                                        setCount(deck.getCard(card.name) === undefined ? 0 : deck.getCard(card.name).count);
                                        }}
                            >
                                {card.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchMenu;