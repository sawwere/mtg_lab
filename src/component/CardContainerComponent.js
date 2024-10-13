class CardContainerComponent {
    constructor() {

    }

    build(params, callbacks) {
        const result = document.createElement("div");
        result.classList.add("cardContainer");
        result.id = "deck_cardContainer_" + params.card.name;

        const image = document.createElement('img');
        image.classList.add("cardImage");
        image.src = params.card.imageUrl;

        result.appendChild(image);

        const cardPreview = document.createElement("div");
        cardPreview.innerHTML = params.card.name;
        result.appendChild(cardPreview);

        if (callbacks !== undefined) {
            callbacks.forEach((action, eventType) => {
                result.addEventListener(eventType, action);
            });
        }

        return result;
    }
}

export {CardContainerComponent}