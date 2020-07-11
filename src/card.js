const validSuites = ['Heart','Club','Diamond','Spade'];
const validNumbers = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];

class Card {
  constructor (givenNumber, givenSuite, acesHigh) {
    
    //-- Is Valid
    
    if (!this.isValidNumber(givenNumber)) { 
      throw new TypeError('Card number is not valid.'); 
    }
    if (!this.isValidSuite(givenSuite)) {
      throw new TypeError('Card suite is not valid.');
    }
    
    //-- Set Values
    
    Object.defineProperties(this, {
      number: {
        value: givenNumber,
        writeable: false,
        enumerable: true
      },
      suite: {
        value: givenSuite,
        writeable: false,
        enumerable: true
      }
    });
    Object.defineProperties(this, {
      code: {
        value: this.getCode(acesHigh),
        writeable: false,
        enumerable: false
      },
      value: {
        value: validNumbers.findIndex(number => number == givenNumber) + 1,
        writeable: false,
        enumerable: false
      }
    });
  }
  
  getCode(acesHigh) {
    let tempNumbers = [...validNumbers];
    if (acesHigh) {
      let shiftAce = tempNumbers.shift();
      tempNumbers.push(shiftAce);
    }
    let numIndex = tempNumbers.findIndex(_number => this.number == _number) + 1;
    let suiteIndex = validSuites.findIndex(_suite => this.suite == _suite);
    return numIndex + ( suiteIndex * validNumbers.length);
  }
  
  //-- Validators
  
  isValidSuite(suite) {
    return validSuites.includes(suite);
  }
  
  isValidNumber(number) {
    return validNumbers.includes(number);
  }
  
  isValidCard(number, suite) {
    return (this.isValidNumber(number) && this.isValidSuite(suite));
  }
}

module.exports = {Card: Card, validSuites: validSuites, validNumbers: validNumbers};