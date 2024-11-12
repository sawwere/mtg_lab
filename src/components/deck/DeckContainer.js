import './style.css';

import { useSelectedCardContext } from '../../providers/SelectedCardProvider';
import { useDeckContext } from '../../providers/DeckProvider';

const DeckContainer = () => {
    const { deck, deckCounter } = useDeckContext();
    const { setSelectedCard, setCount } = useSelectedCardContext();

    return (
        <div>
            <b>Всего карт в колоде: {deckCounter} / 60</b>
            <div className='deckContainer'>
                {Array.from(deck.deck1.entries()).map(([name, card]) => (

                    <div key={card.card.id} className='cardContainer'>

                        <img className='cardImage' 
                            id={"deck_cardContainer_" + card.card.id} 
                            src={card.card.imageUrl} 
                            alt={name}
                            style={{cursor: 'pointer'}}
                            onClick={() => {
                                setSelectedCard(card.card);
                                setCount(deck.getCard(card.card.name) === undefined ? 0 : deck.getCard(card.card.name).count);
                            }}
                        >
                        </img>
                        Карт в колоде: {card.count}
                    </div>
                ))}
            </div>
        </div>
        
        

    );
}

export default DeckContainer;