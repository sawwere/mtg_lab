import { useSelectedCardContext } from '../../providers/SelectedCardProvider'
import { useDeckContext } from '../../providers/DeckProvider';
import React from "react";

const SelectedCard = () => {
    const { selectedCard, count, setCount } = useSelectedCardContext();
    const { addCard, removeCard } = useDeckContext();
    
    if (!selectedCard) {
        return null;
    }

    return (
        <div id="card">
            <img className="center cardImage" src={selectedCard.imageUrl} alt={selectedCard.name} />
            <div className="center">
                {
                    selectedCard.text.split('\n').map((rule, index) => (
                        <div className='cardText' key={"key"+index}>
                            {rule}
                        </div>))
                }
            </div>
            <hr></hr>
            <div>
                Карт в колоде: {count} / {selectedCard.limit}
            </div>
            
            <button className="center addCard" onClick={() => {
                const newCount = addCard(selectedCard);
                if (newCount > 0) {
                    setCount(newCount);
                }
            }} disabled={(count === selectedCard.limit)}>
                Добавить в колоду
            </button>
            <button className="center addCard" onClick={() => {
                const newCount = removeCard(selectedCard.name);
                setCount(newCount);
            }} disabled={count === 0}>
                Убрать из колоды
            </button>
        </div>
    );
}

export default SelectedCard;