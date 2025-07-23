let random = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const input = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuesses = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(input.value.trim(), 10);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number between 1 and 100');
    } else if (guess < 1 || guess > 100) {
        alert('Number must be between 1 and 100');
    } else {
        prevGuesses.push(guess);
        displayGuess(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess) {
    if (guess === random) {
        displayMessage(`Congratulations! You guessed it right!`);
        endGame();
    } else if (numGuess === 11) {
        displayMessage(`Game Over! The correct number was ${random}.`);
        endGame();
    } else if (guess < random) {
        displayMessage(' Your guess is Too Low!');
    } else {
        displayMessage('Your guess is Too High!');
    }
}

function displayGuess(guess) {
    input.value = '';
    guessSlot.innerHTML += `${guess}, `;
    remaining.textContent = 10 - numGuess;
    numGuess++;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    input.value = '';
    input.setAttribute('disabled', true);
    p.classList.add('button');
    p.innerHTML = `<button id="newGame">Start New Game</button>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function () {
        random = parseInt(Math.random() * 100 + 1);
        prevGuesses = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.textContent = '10';
        lowOrHi.innerHTML = '';
        input.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
