class Deck {

    constructor() {
        this.deck1 = new Map();
    }

    #calcCost(strCost) {
        return res = [
            { color: 'White', count: String(strCost).match(`\{W\}`).length - 1 },
            { color: 'Blue', count: String(strCost).match(`\{U\}`).length - 1 },
            { color: 'Black', count: String(strCost).match(`\{B\}`).length - 1 },
            { color: 'Red', count: String(strCost).match(`\{R\}`).length - 1 },
            { color: 'Green', count: String(strCost).match(`\{G\}`).length - 1 },
            { color: 'Colorless', count: String(strCost).match(`\{\d+\}`).length - 1 }
        ];
    }

    addCard(card) {
        const item = this.deck1.get(card.name);
        if (item !== undefined) {
            if (item.count < item.card.limit) {
                item.count += 1;
                return item.count;
            }
            else {
                return 0;
            }
        }
        else {
            this.deck1.set(card.name, {
                count: 1,
                card: card
            });
            return 1;
        }
    }

    removeCard(cardName) {
        if (this.deck1.has(cardName)) {
            const item = this.deck1.get(cardName);
            if (item.count == 1) {
                this.deck1.delete(cardName);
                return 0;
            }
            else {
                item.count -= 1;
                return item.count;
            }
        }
        else {
            throw new Error("Key not found: " + card.name);
        }
    }

    hasCard(cardName) {
        return this.deck1.get(cardName) !== undefined;
    }

    canAddCard(cardName) {
        const item = this.deck1.get(cardName);
        if (item === undefined) {
            return true;
        }
        return (item.count < item.card.limit);
    }

    colorStats() {
        const res = [
            { color: 'White', count: 0 },
            { color: 'Blue', count: 0 },
            { color: 'Black', count: 0 },
            { color: 'Red', count: 0 },
            { color: 'Green', count: 0 },
            { color: 'Colorless', count: 0 }
        ];


        return res;
    }

    manaCostStats() {
        const res = [
            { cost: 0, count: 0 },
            { cost: 1, count: 0 },
            { cost: 2, count: 0 },
            { cost: 3, count: 0 },
            { cost: 4, count: 0 },
            { cost: 5, count: 0 },
            { cost: 6, count: 0 },
            { cost: '7+', count: 0 }
        ];
        this.deck1.forEach(item => {
            const cmc = item.card.cmc;
            if (cmc >= 7) {
                res[7].count += item.count;
            }
            else {
                res[cmc].count += item.count;
            }
        });
        return res
    }
}


export { Deck }
