// wordList has 9 words
const wordList = ["galaxy", "nebula", "universe", "planet", "asteroid", "comet", "supernova", "pulsar", "wormhole"];
let listIndex = 0;
let winCount = 0;
let guessCount = 10;
let currentWord = "";
// wordAsArray will have placeholders for currentWord letters, to be displayed as they are guessed
const wordAsArray = [];
const wrongGuesses = [];
let start = false;

$(document).ready(function() {
    document.onkeyup = function(key) {
        // start == false when game needs to be initialized
        if (start === false) {
            initializeGame();
            start = true;
        // when start == true, game will accept key entries as guesses
        } else if (start === true) {
            let letter = String.fromCharCode(key.which);
            letter = letter.toLowerCase();
            let regexp = /[a-z]/g;
            // this section of code checks if the key pressed is alphabetical
            if (letter.match(regexp)) {
                checkLetter(letter);
            } else {
                $("#start-msg").text("Only 'a' through 'z' please");
            }
        // when start == "justWon", a new word must be loaded from array
        } else if (start === "justWon") {
            loadWord();
            start = true;
        // when start == "endGame", wordList array is depleted
        } else if (start === "endGame") {
            $("#start-msg").text("You've beaten this game!  No more words to guess...");
        }
    };
});

function initializeGame() {
    listIndex = 0;
    winCount = 0;
    guessCount = 10;

    shuffle(wordList);
    console.log(wordList);
    
    $("#win-count").text("Wins: " + winCount);
    $("#guess-count").text("Guesses Remaining: " + guessCount);
    loadWord();
}

// performs a shuffle of the words in an array
function shuffle(array) {
    let i = 0;
    let j = 0;
    let temp = null;
  
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function loadWord() {
    currentWord = wordList[listIndex];
    listIndex++;
    wordAsArray.length = 0;
    wrongGuesses.length = 0;
    for (let i=0; i<currentWord.length; i++) {
        wordAsArray.push("_");
    }
    displayWord();
    $("#wrong-guesses").text("-none-");
    $("#start-msg").text("Good luck!");
}

function displayWord() {
    let displayThis = "";
    for (let i=0; i<wordAsArray.length; i++) {
        displayThis += "\xa0\xa0\xa0" + wordAsArray[i];
    }
    $("#current-word").text(displayThis);
}

function checkLetter(letter) {
    let letterFound = false;
    // checks if letter was already wrongly guessed
    for (let i=0; i<wrongGuesses.length; i++) {
        if ( letter === wrongGuesses[i] ) {
            $("#start-msg").text("Already tried this letter; guess again");
            return;
        }
    }
    for (let i=0; i<currentWord.length; i++) {
        // checks if letter has already been correctly guessed
        if ( letter === wordAsArray[i] ) {
            $("#start-msg").text("You already got this letter; guess again");
            return;
        }
        // the following runs on a correct new guess
        if ( letter === currentWord.charAt(i) ) {
            wordAsArray[i] = letter;
            letterFound = true;
        }
    }

    // the 'if' runs if a new letter was correctly guessed
    if (letterFound) {
        displayWord();
        $("#start-msg").text("You got it!");
        winCheck();
    // the 'else' runs with a wrong guess
    } else {
        wrongGuesses.push(letter);
        displayGuesses();
        // following will check for game end
        guessCount--;     
        $("#guess-count").text("Guesses Remaining: " + guessCount);   
        if (guessCount == 0) {
            gameOver();
        } else {
            $("#start-msg").text("No, try again");
        }
    }
}

function winCheck() {
    // win condition is not satified if wordAsArray still contains "_"s
    for (let i=0; i<wordAsArray.length; i++) {
        if ( wordAsArray[i] === "_" ) {
            return;
        }
    }
    // otherwise, win condition is satisfied
    winCount++;
    $("#win-count").text("Wins: " + winCount);
    if ( winCount == wordList.length ) {
        $("#start-msg").text("You've guessed all " + winCount + " of the words!  <END OF GAME>");
        start = "endGame";
        return;        
    }
    $("#start-msg").text("You've completed this word!  Press any key to try the next one");
    start = "justWon";
}

function displayGuesses() {
    let displayThis = "";
    for (let i=0; i<wrongGuesses.length; i++) {
        displayThis += "\xa0\xa0\xa0" + wrongGuesses[i];
    }
    $("#wrong-guesses").text(displayThis);
}

function gameOver() {
    $("#start-msg").text("You've run out of guesses!  Press any key to start over");
    start = false;
}