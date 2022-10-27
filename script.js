let newDeckBtn = document.querySelector(".new-deck-btn");
let drawCards = document.querySelector(".draw-cards");

let deckId;
function handleClick() {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
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
    });
}

newDeckBtn.addEventListener("click", handleClick); //handleClick is a callback function we created earlier

drawCards.addEventListener("click", draw2Cards);
