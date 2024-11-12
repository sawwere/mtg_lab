import { Card } from "../model/card";

class Mtg {

    constructor(baseUrl = "https://api.magicthegathering.io/v1/cards") {
        this.baseUrl = baseUrl;
    }

    async loadCards(name = '') {
        const url = this.baseUrl + '?name=' + name;
        return fetch(url).then(response => response.json()).then(json => json.cards).then(cards => cards.map(x => new Card(x)))
    }
}


export {Mtg}
