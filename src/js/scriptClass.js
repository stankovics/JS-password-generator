'use strict';
const passwordDisplay = document.getElementById('passwordDisplay');
const form = document.getElementById('passwordGeneratorForm');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const characterAmountRange = document.getElementById('characterAmountRange');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
class PasswordGenerator {
  constructor() {
    characterAmountNumber.addEventListener(
      'input',
      this.syncCharacterAmount.bind(this)
    );
    characterAmountRange.addEventListener(
      'input',
      this.syncCharacterAmount.bind(this)
    );

    form.addEventListener('submit', e => {
      e.preventDefault();
      const characterAmount = characterAmountNumber.value;
      const includeUppercase = includeUppercaseElement.checked;
      const includeNumbers = includeNumbersElement.checked;
      const includeSymbols = includeSymbolsElement.checked;
      const password = this.generatePassword(
        characterAmount,
        includeUppercase,
        includeNumbers,
        includeSymbols
      );
      passwordDisplay.innerText = password;
    });
  }
  UPPERCASE_CHAR_CODES = this.arrayFromLowToHigh(65, 90);
  LOWERCASE_CHAR_CODES = this.arrayFromLowToHigh(97, 122);
  NUMBER_CHAR_CODES = this.arrayFromLowToHigh(48, 57);
  SYMBOL_CHAR_CODES = this.arrayFromLowToHigh(33, 47).concat(
    this.arrayFromLowToHigh(58, 64).concat(91, 96).concat(123, 126)
  );

  arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }

  generatePassword(
    characterAmount,
    includeUppercase,
    includedNumbers,
    includedSymbols
  ) {
    let charCodes = this.LOWERCASE_CHAR_CODES;
    if (includeUppercase)
      charCodes = charCodes.concat(this.UPPERCASE_CHAR_CODES);
    if (includedSymbols) charCodes = charCodes.concat(this.SYMBOL_CHAR_CODES);
    if (includedNumbers) charCodes = charCodes.concat(this.NUMBER_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
  }

  syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
  }
}
const generator = new PasswordGenerator();
