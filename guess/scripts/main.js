const guesses = document.getElementById("guesses");
const lastResult = document.getElementById("lastResult");
const lowOrHigh = document.getElementById("lowOrHigh");

const guessSubmit = document.getElementById("guessSubmit");
const guessField = document.getElementById("guessField");

let guessCount = 1;
let resetButton;
let randomNumber;

function updateRandomNumber() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

updateRandomNumber();

function checkGuess() {
    const userGuess = Number(guessField.value);

    if (guessCount === 1) {
        guesses.textContent = `Previous guesses: ${userGuess}`;
    } else {
        guesses.textContent = `${guesses.textContent}, ${userGuess}`;
    }

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "mediumseagreen";
        lowOrHigh.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = "GAME OVER!";
        lowOrHigh.textContent = "";
        setGameOver();
    } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "lightcoral";

        if (userGuess < randomNumber) {
            lowOrHigh.textContent = "Last guess was too low!";
        } else if (userGuess > randomNumber) {
            lowOrHigh.textContent = "Last guess was too high!";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    const resetButtonContainer = document.getElementById("reset-button-container");
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    resetButton.style.width = "100%"
    resetButton.addEventListener("click", resetGame)
    resetButtonContainer.appendChild(resetButton);
}

function resetGame() {
    const resultParagraphs = document.querySelectorAll("#resultSection p");
    for (const paragraph of resultParagraphs) {
        paragraph.textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);
    
    updateRandomNumber();

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessCount = 1;

    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

guessField.addEventListener("keyup", (guessField) => {
    if (guessField.key === "Enter") {
      checkGuess();
    }
});

function checkViewportWidth() {
    console.log("hey!");
    if (window.innerWidth < 750) {
        document.body.style.fontSize = "3vw";
    } else {
        document.body.style.fontSize = "24px";
    }
}

window.addEventListener('resize', checkViewportWidth);

checkViewportWidth();
guessField.focus();