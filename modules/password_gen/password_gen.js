const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

let upperEl = true;
let lowerEl = true;
let numberEl = true;
let symbolEl = true;
let password_length = 5;

function getLowercase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  let password = "";

  if (upperEl) {
    password += getUppercase();
  }

  if (lowerEl) {
    password += getLowercase();
  }

  if (numberEl) {
    password += getNumber();
  }

  if (symbolEl) {
    password += getSymbol();
  }

  for (let i = password_length; i < password_length; i++) {
    const x = generateX();
    password += x;
  }
}

function generateX() {
  const xs = [];
  if (upperEl) {
    xs.push(getUppercase());
  }

  if (lowerEl) {
    xs.push(getLowercase());
  }

  if (numberEl) {
    xs.push(getNumber());
  }

  if (symbolEl) {
    xs.push(getSymbol());
  }

  if (xs.length === 0) return "";

  return xs[Math.floor(Math.random() * xs.length)];
}

// console.log(generatePassword());

console.log("Password Generator was loaded")
