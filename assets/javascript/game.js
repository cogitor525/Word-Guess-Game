// wordList has 9 words
const wordList = ["galaxy", "nebula", "universe", "planet", "asteroid", "comet", "supernova", "pulsar", "wormhole"];
let listIndex = 0;
let winCount = 0;
let guessCount = 10;
let currentWord = "";
// wordAsArray will have placeholders for currentWord letters, to be displayed as they are guessed
const wordAsArray = [];

$(document).ready(function() {
    let start = false;
    document.onkeyup = function(key) {
        if (start == false) {
            initializeGame();
            start = true;
        } else {
            let letter = String.fromCharCode(key.which);
            let regexp = /[A-Z]/gi;

            if (letter.match(regexp)) {
                checkLetter(letter);
            }
        }

    };
});

function initializeGame() {
    $("#start-msg").text("Good luck!");
    $("#win-count").text("Wins: " + winCount);
    $("#guess-count").text("Guesses Remaining: " + guessCount);
    loadWord();
}

function loadWord() {
    currentWord = wordList[listIndex];
    listIndex++;
    for (let i=0; i<currentWord.length; i++) {
        wordAsArray.push("_");
    }
    console.log(currentWord);
    console.log(wordAsArray);
}