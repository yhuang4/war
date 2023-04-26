"use strict";
// Since suits are irrelevant in war, we represent each card with an int,
// which represent its rank.
// Each player's hand is represented with a queue.
Object.defineProperty(exports, "__esModule", { value: true });
exports.playGame = exports.simulateGame = exports.dealDeck = exports.shuffleDeck = void 0;
const queue_1 = require("@datastructures-js/queue");
// Randomize deck in-place using Durstenfeld shuffle algorithm
let shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
};
exports.shuffleDeck = shuffleDeck;
let dealDeck = () => {
    const deck = [];
    // Four cards for each rank
    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < 4; j++)
            deck.push(i);
    }
    (0, exports.shuffleDeck)(deck);
    let p1 = new queue_1.Queue();
    let p2 = new queue_1.Queue();
    // Start dealing one by one
    for (let i = 0; i < 52; i++) {
        if (i % 2 === 0)
            p1.enqueue(deck[i]);
        else
            p2.enqueue(deck[i]);
    }
    return [p1, p2];
};
exports.dealDeck = dealDeck;
let enqArray = (q, arr) => {
    for (let x of arr)
        q.enqueue(x);
};
let hasWinner = (deck1, deck2) => {
    return deck1.isEmpty() || deck2.isEmpty();
};
// It is possible that there is a draw, in which case we return 0
let getWinner = (deck1, deck2) => {
    if (deck1.isEmpty() && deck2.isEmpty())
        return 0;
    if (deck1.isEmpty())
        return 2;
    return 1;
};
let simulateGame = (deck1, deck2) => {
    while (!hasWinner(deck1, deck2)) {
        // Each player turns up one card face up
        let p1 = deck1.dequeue();
        let p2 = deck2.dequeue();
        // Each pile represents all cards a player turns up 
        // in a round
        let pile1 = [p1];
        let pile2 = [p2];
        // Start comparing the cards face up
        if (p1 > p2) {
            // Player 1 wins, takes both the piles
            enqArray(deck1, pile1);
            enqArray(deck1, pile2);
        }
        else if (p2 > p1) {
            enqArray(deck2, pile2);
            enqArray(deck2, pile1);
        }
        else {
            let startWar = true;
            // War won't end unless a turned-up card is higher rank
            // or there's a winner
            while (startWar && !hasWinner(deck1, deck2)) {
                // Each player first turns up one card face down
                pile1.push(deck1.dequeue());
                pile2.push(deck2.dequeue());
                // A player may lose after turning up one card
                if (hasWinner(deck1, deck2))
                    return getWinner(deck1, deck2);
                // Each player then turns up on card face up
                p1 = deck1.dequeue();
                p2 = deck2.dequeue();
                pile1.push(p1);
                pile2.push(p2);
                // Compare the cards face up
                if (p1 > p2) {
                    enqArray(deck1, pile1);
                    enqArray(deck1, pile2);
                    startWar = false;
                }
                else if (p2 > p1) {
                    enqArray(deck2, pile2);
                    enqArray(deck2, pile1);
                    startWar = false;
                }
            }
        }
    }
    return getWinner(deck1, deck2);
};
exports.simulateGame = simulateGame;
let playGame = () => {
    let deck1, deck2;
    [deck1, deck2] = (0, exports.dealDeck)();
    return (0, exports.simulateGame)(deck1, deck2);
};
exports.playGame = playGame;
