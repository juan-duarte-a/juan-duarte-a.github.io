const guesses = document.getElementById("guesses");
const lastResult = document.getElementById("lastResult");
const lowOrHigh = document.getElementById("lowOrHigh");
const guessSubmit = document.getElementById("guessSubmit");
const guessField = document.getElementById("guessField");

let guessCount = 1;
let resetButton;

class RandomNumber {
    #value;

    generate() {
        this.#value = Math.floor(Math.random() * 100) + 1;
    }

    compare(number) {
        if (number === this.#value) {
            return 0;
        } else if (number < this.#value) {
            return -1;
        } else {
            return 1;
        }
    }
}

const randomNumber = new RandomNumber();
randomNumber.generate();

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function launchConfetti() {
    const defaults = {
        ticks: 50,
        gravity: 0,
        decay: 0.92,
        startVelocity: 20,
    };

    function shoot() {
        confetti({
            ...defaults,
            scalar: 2,
            shapes: ["circle", "square"],
            colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(20, 40),
            origin: { x: randomInRange(0.3, 0.7), y: 0.4 },
        });

        confetti({
            ...defaults,
            scalar: 2.5,
            shapes: ["text"],
            shapeOptions: {
                text: {
                    value: ["🦄", "🌈"],
                },
            },
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(20, 40),
            origin: { x: randomInRange(0.3, 0.7), y: 0.4 },
        });
    }

    for (let i = 0; i < 7000; i += 1000) {
        setTimeout(shoot, i);
    }

}

function checkGuess() {
    const userGuess = Number(guessField.value);

    if (guessCount === 1) {
        guesses.textContent = `Previous guesses: ${userGuess}`;
    } else {
        guesses.textContent = `${guesses.textContent}, ${userGuess}`;
    }

    if (randomNumber.compare(userGuess) === 0) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "mediumseagreen";
        lowOrHigh.textContent = "";
        setGameOver();
        launchConfetti();
    } else if (guessCount === 5) {
        lastResult.textContent = "GAME OVER!";
        lowOrHigh.textContent = "";
        setGameOver();
    } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "lightcoral";

        if (randomNumber.compare(userGuess) < 0) {
            lowOrHigh.textContent = "Last guess was too low!";
        } else if (randomNumber.compare(userGuess) > 0) {
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

    randomNumber.generate();

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
    if (window.innerWidth < 750) {
        document.body.style.fontSize = "3vw";
    } else {
        document.body.style.fontSize = "24px";
    }
}

window.addEventListener('resize', checkViewportWidth);

checkViewportWidth();
guessField.focus();