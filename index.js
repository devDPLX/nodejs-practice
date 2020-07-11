const Deck = require('./deck.js');
var newDeck = new Deck('All');
//--
newDeck.shuffle();
console.log(newDeck.draw());