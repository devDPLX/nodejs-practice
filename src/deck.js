const { Card, validSuites, validNumbers } = require('./card.js');

let Deck = function(fillOption = 'empty', maxCardAmount = 0, aceHigh = false) {
  let numberOrder = [...validNumbers];
  let suiteOrder = [...validSuites];
  if (aceHigh) {
    let shiftAce = numberOrder.shift();
    numberOrder.push(shiftAce);
  }
  let cards = [];
  
  let deckProperties = {
    fill: {
      value: function(fillOption) {
        switch (fillOption) {
          case 'All':
            for (let suite of this.suiteOrder) {
              for (let number of this.numberOrder) {
                this.add(number, suite);
              }
            }
            break;
          default:
            if (this.numberOrder.find(number => number == fillOption)) {
              for (let suite of this.suiteOrder) {
                this.add(fillOption,suite);
              }
            } else if (this.suiteOrder.find(suite => suite == fillOption)) {
              for (let number of this.numberOrder) {
                this.add(number,fillOption);
              }
            }
        }
      }
    },
    add: {
      value: function(cardOrNumber, suite, position = this.length) {
        if (maxCardAmount > 0 && this.length >= maxCardAmount) {
          throw new RangeError('Cannot add any more cards, the deck is full.');
        }
        if (typeof cardOrNumber == 'object') {
          let card = cardOrNumber;
          if (card.constructor.name !== 'Card') {
            throw new TypeError('Tried to add object that wasn\'t a card.');
          }
          this.splice(position,0,card);
          return card;
        } else if (typeof cardOrNumber == 'string' || typeof cardOrNumber == 'number') {
          let number = String(cardOrNumber);
          let newCard = new Card(number,suite,aceHigh);
          this.splice(position,0,newCard);
          return newCard;
        } else {
          throw new TypeError('Argument must be a Card or card number.');
        }
      }
    },
    shuffle: {
      value: function() {
        let shuffledDeck = [];
        let deckLength = this.length;
        for (let index = 0; index < deckLength; index++) {
          let random = Math.floor(Math.random() * this.length);
          let card = this.splice(random,1)[0];
          shuffledDeck.push(card);
        }
        for (let card of shuffledDeck) {
          this.push(card);
        }
      }
    },
    draw: {
      value: function(position = 0) {
        return this.splice(position,1)[0];
      }
    },
    numberOrder: {
      value: numberOrder
    },
    suiteOrder: {
      value: suiteOrder
    },
    isValidSuite: {
      value: function(suite) {
        return this.suiteOrder.includes(suite);
      }
    },
    isValidNumber: {
      value: function(number) {
        return this.numberOrder.includes(number);
      }
    },
  };
  
  let overwriteProperties = {
    concat: {
      value: function() {
        let tempDeck = [...this];
        for (let arg of arguments) {
          if (Array.isArray(arg)) {
            for (let _arg of arg) {
              tempDeck.push(_arg);
            }
          } else {
            tempDeck.push(arg);
          }
        }
        Object.defineProperties(tempDeck, deckProperties);
        Object.defineProperties(tempDeck, overwriteProperties);
        return tempDeck;
      }
    },
    filter: {
      value: function(filterFunction) {
        let tempDeck = [...this];
        let filtered = tempDeck.filter(filterFunction);
        Object.defineProperties(filtered, deckProperties);
        Object.defineProperties(tempDeck, overwriteProperties);
        return filtered;
      }
    },
    slice: {
      value: function(start, end) {
        let tempDeck = [...this];
        let newDeck;
        if (end) {
          newDeck = tempDeck.slice(start, end);
        } else {
          newDeck = tempDeck.slice(start);
        }
        Object.defineProperties(newDeck, deckProperties);
        Object.defineProperties(tempDeck, overwriteProperties);
        return newDeck;
      },
    },
    sort: {
      value: function() {
        let tempDeck = [...this];
        tempDeck.sort(function(a,b) {
          return a.code - b.code;
        });
        this.length = 0;
        for (let position in tempDeck) {
          this.splice(position,1,tempDeck[position]);
        }
        return this;
      }
    }
  }

  Object.defineProperties(cards, deckProperties);
  Object.defineProperties(cards, overwriteProperties);
  cards.fill(fillOption);

  return cards;
}

module.exports = Deck;