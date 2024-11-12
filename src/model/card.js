class Card {

    constructor(cardDto) {
        this.id = cardDto.id;
        this.name = cardDto.name;
        this.text = cardDto.text === undefined ? "" : cardDto.text;
        this.cmc = cardDto.cmc;
        this.imageUrl = cardDto.imageUrl === undefined ? "https://titlecounter.ru/api/images/games/0.jpg" : cardDto.imageUrl;
        this.colors = cardDto.colors === undefined ? new Array("C") : cardDto.colors;
        this.kind = cardDto.type;
        
        this.rules = this.#calcRules(cardDto);

        this.limit = this.#calcLimit();
    }

    #calcLimit() {
        if (String(this.kind).startsWith("Basic Land"))
            return Number.POSITIVE_INFINITY;
        if (this.rules.some((v, i) => v.startsWith("A deck can have any number of cards named")))
            return Number.POSITIVE_INFINITY;
        return 4;
    }

    #calcRules(cardDto) {
        const res = [];
        this.text.split('\n').forEach(rule => {
            res.push(rule);
        });
        return res;
    }
}


export { Card }
