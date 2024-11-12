import React, { createContext, useContext, useState } from 'react';
import { Deck } from '../model/deck';

const DeckContext = createContext();

export function DeckProvider({ children }) {
    const _deck = new Deck();
    const [deck, setDeck] = useState(_deck);
    const [deckCounter, setDeckCounter] = useState(0);

    const addCard = (card) => {
        const newDeck = deck;
        const c = newDeck.addCard(card);
        if (c > 0) {
            setDeckCounter(deckCounter + 1);
        }
        setDeck(newDeck);
        return c;
    };

    const removeCard = (name) => {
        if (!deck.getCard(name)) {
            return 0;
        }
        const newDeck = deck;
        const c = newDeck.removeCard(name);
        setDeckCounter(deckCounter - 1);
        setDeck(newDeck);
        return c;
    };

    return (
        <DeckContext.Provider value={{ deck: deck, deckCounter: deckCounter, addCard, removeCard }}>
            {children}
        </DeckContext.Provider>
    );
};

export function useDeckContext() {
    return useContext(DeckContext);
};