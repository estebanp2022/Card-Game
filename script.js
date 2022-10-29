let newDeckBtn = document.querySelector(".new-deck-btn");
let drawCards = document.querySelector(".draw-cards");
let resetBtn = document.querySelector(".reset-btn");
let header = document.querySelector(".winner");
let remainingCards = document.querySelector(".remaining");
let cardsContainer = document.querySelector("cards");
let computerScoreEl = document.querySelector(".computer-score");
let playerScoreEl = document.querySelector(".player-score");
let deckId;
let computerScore = 0;
let playerScore = 0;

function handleClick() {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      remainingCards.textContent = data.remaining;
      console.log(data);
      deckId = data.deck_id;

      // reset game functionality
      computerScore = 0;
      computerScoreEl.textContent = `${computerScore}`;
      playerScore = 0;
      playerScoreEl.textContent = `${playerScore}`;

      drawCards.disabled = false;

      header.textContent = "Lets Play!";
      document.querySelector(".cards").innerHTML = `
        <div class="card-slot"></div>
        <div class="card-slot"></div>
      `;
    });
}

function draw2Cards() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".cards").innerHTML = `
        <img src="${data.cards[0].image}"/>
        <img src="${data.cards[1].image}"/>
      `;

      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);

      header.textContent = winnerText;
      remainingCards.textContent = data.remaining;

      if (data.remaining === 0) {
        drawCards.disabled = true;
        if (computerScore > playerScore) {
          header.textContent = "The Computer Won 🥴";
        } else if (playerScore > computerScore) {
          header.textContent = "You Won 😎";
        } else {
          header.textContent = "Its a tie!";
        }
      }
    });
}

newDeckBtn.addEventListener("click", handleClick);
drawCards.addEventListener("click", draw2Cards);

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreEl.textContent = `${computerScore}`;
    return "Computer gets point!";
  } else if (card1ValueIndex < card2ValueIndex) {
    playerScore++;
    playerScoreEl.textContent = `${playerScore}`;
    return "You get a point!";
  } else {
    return "It's a tie!";
  }
}
