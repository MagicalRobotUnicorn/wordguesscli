var inquirer = require("inquirer");

// Array of possible answers

// Game object

var Game = function () {
  var victory = false;

  var words = ['Rolling Stones', 'Led Zeppelin', 'The Beatles', 'Jimi Hendrix', 'Fleetwood Mac', 'Depeche Mode', 'The Cure', 'Nirvana', 'Metallica', 'Kraftwerk', 'The Pixies'];
  var gameWords = [];

  var numTurns = 10;
  var guessedLetters = [];

  function startGame() {
    var index = Math.floor((Math.random() * words.length));
    gameWords.push(words[index]);

    var blankedWord = "";

    for (var i = 0; i < gameWords[0].length; i++) {
      if (gameWords[0][i].toLowerCase() === String.match(/[a-z]/i)) {
        blankedWord += "_";
      }
      else {
        blankedWord += gameWords[0][i];
      }
    }

    gameWords.push(blankedWord);
  }

  function guessLetter() {
    var index = 0;

    inquirer
      .prompt([
        {
          name: "letter",
          message: "What letter would you like to guess?",
          validate: function (letter) {
            // Declare function as asynchronous, and save the done callback
            var done = this.async();

            // Do async stuff
            setTimeout(function () {
              if (index.length != 1) {
                // Pass the return value in the done callback
                done('Please guess one and only one letter.');
                return;
              }
              // Pass the return value in the done callback
              done(null, true);
            }, 1000);
          }
        }
      ])
      .then(function (letter) {
        guessedLetters.push(letter);

        if (guessedLetters.indexOf(letter) != -1) {
          console.log("You've already guessed that... guess again...");
        }
        else {
          index = gameWords[0].indexOf(letter);
          while (index != -1) {
            blankedWord[index] = gameWords[0][index];
            index = gameWords[0].indexOf(letter, index);
          }
        }
      });
  }

  function checkVictory() {

  }

  function convertWord(word) {

  }

  function repeatGame(response) {

  }
}
