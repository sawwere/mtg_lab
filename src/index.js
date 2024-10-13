import { CardContainerComponent } from "./component/CardContainerComponent.js";
import { SelectedCardComponent } from "./component/SelectedCardComponent.js";
import { Mtg } from "./api/mtg.js";
import { Card } from "./model/card.js";
import { Deck } from "./model/deck.js";
import { ColorStats } from "./widgets/colorStats.js";
import { ManaCostStats } from "./widgets/manaCostStats.js";

const SEARCH_DELAY = 1000
const EMPTY_DECK_PLACEHOLDER_TEXT = "Your deck is empty";

document.addEventListener("DOMContentLoaded", setup)
//npx parcel index.html
function setup() {
    const mtg = new Mtg();
    const deck = new Deck();

    let timer;
    let cardNameInput = document.getElementById("cardNameInput");
    cardNameInput.addEventListener("input", e => {
        clearTimeout(timer);
        timer = setTimeout(x => {
            search(mtg, deck, cardNameInput.value);
        }, SEARCH_DELAY, e)
    });
    const deckPlaceholder = document.getElementById("deckPlaceholder");
    deckPlaceholder.innerHTML = EMPTY_DECK_PLACEHOLDER_TEXT;

    search(mtg, deck, cardNameInput.value);
}

function addCard(card, deck) {
    const addResult = deck.addCard(card);
    // Add image to the deck container if only the first copy of the card was added
    if (addResult === 1) {
        const deckContainer = document.getElementById("deckContainer");
        deckContainer.getElementById
        deckContainer.appendChild(new CardContainerComponent().build(
            {
                card: card,
                deck: deck
            },
            new Map([
                ["click", function () {showCard(card, deck)}],
                ["mouseover", function () { this.style.cursor = "pointer" }]
            ])
        ));
    }
    if (addResult > 0) {
        refreshStats(deck);
        if (deck.size === 1) {
            const deckPlaceholder = document.getElementById("deckPlaceholder");
            deckPlaceholder.innerHTML = "";
        }
    }
    return addResult;
}

function removeCard(card, deck) {
    const removeResult = deck.removeCard(card.name);
    if (removeResult === 0) {
        const deckContainer = document.getElementById("deckContainer");
        const cardElem = document.getElementById("deck_cardContainer_" + card.name);
        deckContainer.removeChild(cardElem);
    }
    refreshStats(deck);
    if (deck.size === 0) {
        const deckPlaceholder = document.getElementById("deckPlaceholder");
        deckPlaceholder.innerHTML = EMPTY_DECK_PLACEHOLDER_TEXT;
    }
    return removeResult;
}

function search(mtg, deck, name = "") {
    mtg.loadCards(name)
        .then((searchResults) => {

            const menu = document.getElementById('listContainer');
            const list = document.createElement('ul');

            searchResults.forEach(cardDto => {
                const card = new Card(cardDto);
                const listItem = document.createElement('li');

                const button = document.createElement('button');
                button.classList.add("buttonCardSearch");
                button.onclick = function () { showCard(card, deck); }
                button.innerHTML = card.name;
                listItem.appendChild(button);

                listItem.dataset.card = card;
                list.appendChild(listItem);
            })
            menu.innerHTML = ''

            menu.appendChild(list);
        })
}

function refreshStats(deck) {
    const manaCostStatsElem = document.createElement("div");
    manaCostStatsElem.id = "manaStats";
    new ManaCostStats().buildStats(manaCostStatsElem, deck.manaCostStats());
    const manaStats = document.getElementById("manaStats");
    manaStats.replaceWith(manaCostStatsElem);

    const colorStatsElem = document.createElement("div");
    colorStatsElem.id = "colorStats";
    new ColorStats().buildStats(colorStatsElem, deck.colorStats());
    const colorStats = document.getElementById("colorStats");
    colorStats.replaceWith(colorStatsElem);
}

function showCard(card, deck) {
    const selectedCard = document.getElementById('selectedCard');

    const generated = new SelectedCardComponent().build(
        {
            card: card,
            deck: deck,
            addCard: addCard,
            removeCard: removeCard
        }
    );
    selectedCard.replaceChild(generated, selectedCard.firstChild);
}
