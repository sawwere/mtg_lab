import React, { createContext, useContext, useState } from 'react';

const CardContext = createContext();

export function SelectedCardProvider({ children }) {
    const [selectedCard, setSelectedCard] = useState(null);
    const [count, setCount] = useState(0);
    return (
        <CardContext.Provider value={{ selectedCard, setSelectedCard, count, setCount }}>
            {children}
        </CardContext.Provider>
    );
};

export function useSelectedCardContext() {
    return useContext(CardContext);
};