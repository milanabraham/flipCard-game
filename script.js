const cards = document.querySelectorAll(".card");
const attemptsElement = document.getElementById("attempts");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart-button");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let attempts = 0;
let timer = 0;
let timerInterval;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
    attempts++;
    attemptsElement.textContent = `Attempts: ${attempts}`;
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      clearInterval(timerInterval); // Stop the timer
      showRestartButton(); // Show the restart button
      return;
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerElement.textContent = `Time: ${timer} seconds`;
  }, 1000);
}

function shuffleCard() {
  matched = 0;
  attempts = 0;
  timer = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  clearInterval(timerInterval);
  attemptsElement.textContent = "Attempts: 0";
  timerElement.textContent = "Time: 0 seconds";
  startTimer();
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

function showRestartButton() {
  restartButton.style.display = "block";
}

function hideRestartButton() {
  restartButton.style.display = "none";
}

function restartGame() {
  hideRestartButton(); // Hide the restart button
  clearInterval(timerInterval);
  shuffleCard();
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

restartButton.addEventListener("click", restartGame);
