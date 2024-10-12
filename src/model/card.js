class Card {

    constructor(cardDto) {
        this.name = cardDto.name;
        this.text = cardDto.text;
        this.cmc = cardDto.cmc;
        this.imageUrl = cardDto.imageUrl;
        this.colors = cardDto.colors;
        this.kind = "default";
        this.limit = this.getLimit();
    }

    getLimit() {
        switch (this.kind) {
            case "default": return 4;
            case "legendary": return 1;
            case "land": return Number.POSITIVE_INFINITY;
            case "special": return Number.POSITIVE_INFINITY;
            default: return 4;
        }
    }
}


export { Card }
