const validSuites = ['Heart','Club','Diamond','Spade'];
const validNumbers = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];

class Card {
  constructor (givenNumber, givenSuite, aceHigh = false) {
    //-- Is Valid
    if (!this.isValidNumber(givenNumber)) { 
      throw new TypeError('Card number is not valid.'); 
    }
    if (!this.isValidSuite(givenSuite)) {
      throw new TypeError('Card suite is not valid.');
    }
    //-- Set Values
    
    let _number = givenNumber;
    let _suite = givenSuite;
    let _code = this.getCode(aceHigh);
    
    Object.defineProperty(this, 'number', {
      get: function() {
        return _number;
      },
      set: function(newNumber) {
        if (!this.isValidNumber(newNumber)) {
          throw new TypeError('Card number is not valid.');
        }
        _number = newNumber;
        _code = this.getCode(aceHigh);
      },
      enumerable: true
    });
    
    Object.defineProperty(this, 'suite', {
      get: function() {
        return _suite;
      },
      set: function(newSuite) {
        if (!this.isValidSuite(newSuite)) {
          throw new TypeError('Card suite is not valid.');
        }
        _suite = newSuite;
        _code = this.getCode(aceHigh);
      },
      enumerable: true
    });
    
    Object.defineProperty(this, 'code', {
      value: this.getCode(aceHigh),
      writeable: false,
      enumerable: true
    });
    
    this.number = givenNumber;
    this.suite = givenSuite;
  }
  
  getCode(acesHigh = false) {
    let tempNumbers = validNumbers.slice(0);
    if (acesHigh) {
      let shiftAce = tempNumbers.shift();
      tempNumbers.push(shiftAce);
    }
    let numIndex = tempNumbers.findIndex(_number => this.number == _number) + 1;
    let suiteIndex = validSuites.findIndex(_suite => this.suite == _suite);
    return numIndex + ( suiteIndex * validNumbers.length);
  }
  
  get code() {
    return this._code;
  }
  
  set code(code) {
    throw new Error('Card code is not settable.');
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