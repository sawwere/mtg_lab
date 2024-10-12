import * as d3 from "../node_modules/d3";
import {Mtg} from "./api/mtg.js";
import { Card } from "./model/card.js";
import { Deck } from "./model/deck.js";
import {ColorStats} from "./widgets/colorStats.js";
import {ManaCostStats} from "./widgets/manaCostStats.js";



document.addEventListener("DOMContentLoaded", setup)
//npx http-server -o -p 9999
function setup() {
    let cardNameInput = document.getElementById("cardNameInput");
    cardNameInput.addEventListener("input", search);

    const mtg = new Mtg();
    const deck = new Deck();
    mtg.loadCards()
        .then((searchResults) => {

            const menu = document.getElementById('listContainer');
            const list = document.createElement('ul');

            searchResults.forEach(cardDto => {
                const card = new Card(cardDto);
                const listItem = document.createElement('li');

                const button = document.createElement('button');
                button.onclick = function() { showCard(card, deck); }
                button.innerHTML = card.name;
                listItem.appendChild(button);

                listItem.dataset.card=card;
                list.appendChild(listItem);
            })
            menu.innerHTML = ''

            menu.appendChild(list);

            new ColorStats().buildStats(document.getElementById("colorStats"), []);
            new ManaCostStats().buildStats(document.getElementById("manaStats"), deck.manaCostStats());

        })
}

function addCard(card, deck) {
    const addResult = deck.addCard(card);
    // Add image to the deck container if only the first copy of the card was added
    if (addResult === 1) {
        const cardContainer = document.getElementById("cardsContainer");
        const image = document.createElement('img');
        image.classList.add();
        image.src = card.imageUrl;
        image.id = "deck_card_" + card.name;

        image.addEventListener('click', function() {showCard(card, deck)});
        image.addEventListener('mouseover', function () {image.style.cursor="pointer"})

        cardContainer.appendChild(image);
    }
    if (addResult > 0) {
        //const svg = d3.select(document.getElementById("manaStats"));
        //svg.dispatch('my_event', { detail: deck.manaCostStats() } );

        const ee = document.createElement("div");
        ee.id ="manaStats";
        new ManaCostStats().buildStats(ee, deck.manaCostStats());
        var manaStats = document.getElementById("manaStats");
        manaStats.replaceWith(ee);
            
        
    }
    return addResult;
}

function removeCard(card, deck) {
    const removeResult = deck.removeCard(card.name);
    if (removeResult === 0) {
        const cardContainer = document.getElementById("cardsContainer");
        const cardElem = document.getElementById("deck_card_" + card.name);
        cardContainer.removeChild(cardElem);
    }
    return removeResult;
}

function search(e) {
    console.log(e.srcElement.value);
}

function showCard(_card, deck) {
    const selectedCard = document.getElementById('selectedCard');
    const generated = document.createElement('div');
    generated.id = 'card';

    const image = document.createElement('img');
    image.classList.add("center", "selectedCardImage");
    generated.appendChild(image);

    const cardDescription = document.createElement('div');
    _card.text.split('\n').forEach(rule => {
        const rdiv = document.createElement("div");
        rdiv.classList.add("ruleText")
        rdiv.innerHTML = rule;
        cardDescription.appendChild(rdiv);
    });
    cardDescription.classList.add("center");
    generated.appendChild(cardDescription);

    const cardButton = document.createElement('button');
    cardButton.classList.add("center", "addCard");
    cardButton.innerHTML = "Добавить в колоду";
    cardButton.disabled = !deck.canAddCard(_card.name);
    generated.appendChild(cardButton);

    const removeCardButton = document.createElement('button');
    removeCardButton.classList.add("center", "addCard");
    removeCardButton.innerHTML = "Убрать карту";
    if (deck.hasCard(_card.name)) {
        generated.appendChild(removeCardButton);
    }

    cardButton.addEventListener('click', function () {
        if (addCard(_card, deck) === 1) {
            generated.appendChild(removeCardButton);
        }
        cardButton.disabled = !deck.canAddCard(_card.name);
        console.log("Add " + _card.name);
    });
    removeCardButton.addEventListener('click', function () {
        const removeResult = removeCard(_card, deck);
        if (removeResult === 0)
            generated.removeChild(removeCardButton);
        cardButton.disabled = !deck.canAddCard(_card.name);
        console.log("Remove " + _card.name);
    });

    
    generated.getElementsByClassName('selectedCardImage')[0].src = _card.imageUrl;
    selectedCard.replaceChild(generated, selectedCard.firstChild);
}
