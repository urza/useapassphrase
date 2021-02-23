'use strict';

// Cryptographic replacement for Math.random()
function randomNumberBetweenZeroAndOne() {
  var crypto = window.crypto || window.msCrypto;
  return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

function generatePassword(numberOfWords) {
  // Cryptographically generated random numbers
  numberOfWords = parseInt(numberOfWords);
  // var array = new Uint32Array(numberOfWords);
  // var crypto = window.crypto || window.msCrypto;
  // crypto.getRandomValues(array);

  // Empty array to be filled with wordlist
  var generatedPasswordArray = [];


  // Grab a random word, push it to the password array
   for (var i = 0; i < numberOfWords; i++) {
      var index = Math.floor(randomNumberBetweenZeroAndOne() * wordlist.length)
      generatedPasswordArray.push(wordlist[index]);
  }

  return generatedPasswordArray.join('-');
}

function setStyleFromWordNumber(passwordField, numberOfWords) {
  var baseSize = '40';
  var newSize = baseSize * (4/numberOfWords);
  passwordField.setAttribute('style', 'font-size: ' + newSize + 'px;');
}

var selectField = document.getElementById('passphrase_select');
var passwordField = document.getElementById('passphrase');
var button = document.querySelector('.btn-generate');

// Initially run it upon load
passwordField.innerHTML = generatePassword(3);

// Listen for a button click
button.addEventListener('click', function() {
  var numberOfWords = selectField.options[selectField.selectedIndex].value;
  passwordField.innerHTML =  generatePassword(numberOfWords);
  setStyleFromWordNumber(passwordField, numberOfWords);
});


