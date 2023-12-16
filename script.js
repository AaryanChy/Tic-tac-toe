const startButton = document.querySelector("#start-button");
const display = document.querySelector("#gameboard");
const firstPlayer = document.querySelector("#player1");
const secondPlayer = document.querySelector("#player2");
const reStart = document.querySelector("#restart-button");
const displayPlayers = document.querySelector("#players-display");
const messageContainer = document.querySelector("#message");

const GameboardIIFE = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  reStart.disabled = true;
  const render = () => {
    let boardHTML = "";
    gameBoard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square=${index}">${square}</div>`;
    });
    display.innerHTML = boardHTML;
  };
  return { render, update };
})();
