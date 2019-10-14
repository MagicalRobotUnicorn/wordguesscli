var inquirer = require("inquirer");

function WordGuessGame() {
  this.words = ['Rolling Stones', 'Led Zeppelin', 'The Beatles', 'Jimi Hendrix', 'Fleetwood Mac', 'Depeche Mode', 'The Cure', 'Nirvana', 'Metallica', 'Kraftwerk', 'The Pixies'];
  this.gameWords = [];

  this.numTurns = 10;
  this.guessedLetters = [];

  var startGame = function() {
    this.numTurns = 10;
    this.guessedLetters = [];
    this.gameWords = [];

    var index = Math.floor((Math.random() * this.words.length));
    this.gameWords.push(this.words[index]);
    console.log(this.gameWords);

    var blankedWord = "";

    for (var i = 0; i < this.gameWords[0].length; i++) {
      if (this.gameWords[0][i].toLowerCase().match(/[a-z]/i)) {
        blankedWord += "_";
      }
      else {
        blankedWord += this.gameWords[0][i];
      }
    }
    console.log(blankedWord);

    this.gameWords.push(blankedWord);
    console.log(this.gameWords);
    this.guessLetter();
  }

  this.guessLetter = function() {
    console.log(this.guessedLetters);
    var index = 0;
    console.log(this.gameWords[1]);

    if (this.numTurns === 0){
      console.log("I'm sorry, you ran out of turns...");
      console.log("The Word Was: ", this.gameWords[0]);
      this.repeatGame();
    }

    inquirer
      .prompt([
        {
          name: "letter",
          message: "What letter would you like to guess?"
        }
      ])
      .then(function (response) {

        if (this.guessedLetters && this.guessedLetters.indexOf(letter) != -1) {
          console.log("You've already guessed that... guess again...");
        }
        else {
          this.numTurns--;
          this.guessedLetters.push(response.letter);

          index = this.gameWords[0].indexOf(response.letter);
          while (index != -1) {
            this.gameWords[1][index] = this.gameWords[0][index];
            index = this.gameWords[0].indexOf(response.letter, index);
          }
        }
        if (checkVictory()){
          console.log("You got it in ", 10 - this.numTurns, " turns!");
          console.log("The word was: ", this.gameWords[0]);
          repeatGame();
        }
        else {
          this.guessLetter();
        }
      });
  }

  this.checkVictory = function() {
    if (this.gameWords[1].indexOf("_") === -1){
      return true;
    }
    else {
      return false;
    }
  }

  this.repeatGame = function() {
    inquirer
    .prompt([
      {
        name: "repeat",
        message: "Would you like to play again?",
        type: "list",
        choices: ["Yes", "No"]
      }
    ])
    .then(function(answer){
      if (answer.repeat === "Yes"){
        this.startGame();
      }
    })
  }
}

var game = new WordGuessGame();

game.startGame();
