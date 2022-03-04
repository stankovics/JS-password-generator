const passwordDisplay = document.getElementById('passwordDisplay');
const form = document.getElementById('passwordGeneratorForm');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const characterAmountRange = document.getElementById('characterAmountRange');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64).concat(91, 96).concat(123, 126)
);

form.addEventListener('submit', e => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeNumbersElement.checked;
  const includedNumbers = includeNumbersElement.checked;
  const includedSymbols = includeSymbolsElement.checked;
  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbersElement,
    includeSymbolsElement
  );
  passwordDisplay.innerText = password;
});

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
function generatePassword(
  characterAmount,
  includeUppercase,
  includedNumbers,
  includedSymbols
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includedSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  if (includedNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join('');
}
