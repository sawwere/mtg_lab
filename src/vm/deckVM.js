const mtg = require('mtgsdk')

class DeckVM {

    constructor(baseUrl = "https://api.magicthegathering.io/v1/") {
        this.baseUrl = baseUrl;
        this.deck = new Map();
    }

    async loadCards() {
        return mtg.card.where({ pageSize: 100 });
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
        if (this.deck.has(card.name)) {
            const item = this.deck[card.name];
            if (item.count < 4) {
                item.count += 1;
                return true;
            }
            else {
                return false;
            }
        }
        else {
            this.deck[card.name] = {
                count: 1,
                card: card
            };
        }
        return true;

    }

    removeCard(cardName) {
        if (this.deck.has(cardName)) {
            const item = this.deck[card.name];
            if (item.count == 1) {
                this.deck.delete(cardName);
            }
            else {
                item.count -= 1;
            }
        }
        else {
            throw new Error("Key not found: " + card.name);
        }
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
        this.deck.forEach(cardKV => {
            const cmc = cardKV.value.cmc;
            if (cmc >= 7) {
                res[7].count += 1;
            }
            else {
                res[cmc].count += 1;
            }
        });
        console.log(res);
        return res
    }
}


export { Mtg }
