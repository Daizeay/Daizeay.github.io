// Game Choices
const choices = ["rock", "paper", "scissors"];
const images = {
    rock: "images/rock.png",
    paper: "images/paper.png",
    scissors: "images/scissors.png",
    question: "images/question.png"
};

// Sounds
const clickSound = new Audio("sounds/click.mp3");
const countdownSound = new Audio("sounds/countdown.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");
const tieSound = new Audio("sounds/tie.mp3");

// Score Tracking (Stored in Local Storage)
let wins = localStorage.getItem("wins") || 0;
let losses = localStorage.getItem("losses") || 0;
let ties = localStorage.getItem("ties") || 0;

// Selecting Elements
const playerChoiceText = document.getElementById("player-choice");
const computerChoiceText = document.getElementById("computer-choice");
const gameResultText = document.getElementById("game-result");
const countdownText = document.getElementById("countdown");
const computerImg = document.getElementById("computer-img");
const resetBtn = document.getElementById("reset-btn");

// Update UI with stored scores
updateScore();

// Click Event for Player's Choice
document.querySelectorAll(".choices img").forEach(img => {
    img.addEventListener("click", () => {
        document.querySelectorAll(".choices img").forEach(i => i.classList.remove("selected"));
        img.classList.add("selected");

        let playerChoice = img.id;
        playerChoiceText.textContent = playerChoice.toUpperCase();
        
        clickSound.play();
        startComputerThinking(playerChoice);
    });
});

// Computer Thinking Animation
function startComputerThinking(playerChoice) {
    computerChoiceText.textContent = "THINKING...";
    computerImg.src = images.question;

    let countdown = 3;
    countdownText.textContent = `Choosing in ${countdown}...`;
    countdownSound.play();

    let countdownInterval = setInterval(() => {
        countdown--;
        countdownText.textContent = countdown > 0 ? `Choosing in ${countdown}...` : "Finalizing!";
        
        if (countdown <= 0) clearInterval(countdownInterval);
    }, 1000);

    let shuffleCount = 0;
    let shuffleInterval = setInterval(() => {
        let randomChoice = choices[Math.floor(Math.random() * choices.length)];
        computerImg.src = images[randomChoice];
        shuffleCount++;

        if (shuffleCount >= 6) {
            clearInterval(shuffleInterval);
            let finalChoice = choices[Math.floor(Math.random() * choices.length)];
            computerImg.src = images[finalChoice];
            computerChoiceText.textContent = finalChoice.toUpperCase();
            decideWinner(playerChoice, finalChoice);
        }
    }, 500);
}

// Decide Winner
function decideWinner(player, computer) {
    if (player === computer) {
        gameResultText.textContent = "It's a Tie!";
        ties++;
        tieSound.play();
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        gameResultText.textContent = "You Win!";
        wins++;
        winSound.play();
    } else {
        gameResultText.textContent = "You Lose!";
        losses++;
        loseSound.play();
    }

    updateScore();
}

// Update Scoreboard
function updateScore() {
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("ties").textContent = ties;

    localStorage.setItem("wins", wins);
    localStorage.setItem("losses", losses);
    localStorage.setItem("ties", ties);
}

// Reset Game
resetBtn.addEventListener("click", () => {
    wins = losses = ties = 0;
    updateScore();
});
