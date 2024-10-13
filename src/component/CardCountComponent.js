class CardCountComponent {
    constructor() {

    }

    build(params, callbacks) {
        const result = document.createElement('div');
        result.classList.add("cardText");
        let actualNumberInDeck = params.deck.getCard(params.card.name);
        if (actualNumberInDeck === undefined)
            actualNumberInDeck = 0;
        else
            actualNumberInDeck = actualNumberInDeck.count;

        result.innerHTML = `Cards in your deck: ${actualNumberInDeck} / ${params.card.limit}`;

        if (callbacks !== undefined) {
            callbacks.forEach((action, eventType) => {
                result.addEventListener(eventType, action);
            });
        }

        return result
    }
}

export {CardCountComponent}