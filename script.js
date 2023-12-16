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
    const squares = document.querySelectorAll(".square");
    squares.forEach((eachBox) => {
      eachBox.addEventListener("click", Game.handleClick);
    });
  };
  return { render, update };
})();

const Game = (() => {
  let players = [];
  let currentPlayer;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(firstPlayer.value, "X"),
      createPlayer(secondPlayer.value, "O"),
    ];
    DisplayPlayers.renderPlayers(players);
    currentPlayer = 0;
    gameOver = false;
    GameboardIIFE.render();
  };
  const handleClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id.split("=")[1]);
    GameboardIIFE.update(index, players[currentPlayer].mark);
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    if (checkWin(GameboardIIFE.getGameBoard(), players[currentPlayer].marker)) {
      gameOver = true;
      MessageController.renderMessage(`${players[currentPlayer].name}, Won!`);
    } else if (checkTie(GameboardIIFE.getGameBoard())) {
      gameOver = true;
      MessageController.renderMessage(`Its a Tie`);
    }
    if (GameboardIIFE.getGameBoard()[index] !== "") {
      return;
    }
  };
  return { start, handleClick, players };
})();
