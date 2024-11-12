import './style.css';

import { React, useRef } from 'react';
import ColorStats from './colorStats';
import ManaCostStats from './manaCostStats';

import { useDeckContext } from '../../providers/DeckProvider';

function Stats() {
    const { deck } = useDeckContext();
    const colorStatsRef = useRef(null);
    const manaCostStatsRef = useRef(null);

    ColorStats(colorStatsRef.current, deck.colorStats());
    ManaCostStats(manaCostStatsRef.current, deck.manaCostStats());

    return (
        <div id="stats">
            <h2>Статистика</h2>
            <div className="widgets">
                <div ref={manaCostStatsRef} id="manaStats"></div>
                <div ref={colorStatsRef} id="colorStats"></div>
            </div>
        </div>
    );
}

export default Stats;