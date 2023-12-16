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
  const update = (index, marker) => {
    gameBoard[index] = marker;
    render();
  };
  const getGameBoard = () => {
    return gameBoard;
  };

  return { render, update, getGameBoard };
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

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const DisplayPlayers = (() => {
  const renderPlayers = (playerNames) => {
    let pTag;
    playerNames.forEach((eachPlayer) => {
      pTag = document.createElement("p");
      pTag.textContent = `${eachPlayer.name.toUpperCase()} is : ${
        eachPlayer.mark
      } `;

      displayPlayers.appendChild(pTag);
    });
  };
  return { renderPlayers };
})();
const MessageController = (() => {
  const renderMessage = (message) => {
    messageContainer.textContent = message;
  };
  return { renderMessage };
})();

function checkWin(board) {
  const winnningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnningCombination.length; i++) {
    const [a, b, c] = winnningCombination[i];
    console.log(board[a], board[b], board[c]);
    if (board[a] !== "" && board[a] == board[b] && board[a] == board[c]) {
      return true;
    }
  }
  return false;
}

function checkTie(board) {
  return board.every((box) => box !== "");
}
reStart.addEventListener("click", () => {
  startButton.disabled = false;
  reStart.disabled = true;
  for (let i = 0; i < 9; i++) {
    GameboardIIFE.update(i, "");
  }
  GameboardIIFE.render();
  gameOver = true;
  displayPlayers.textContent = "";
  firstPlayer.value = "";
  secondPlayer.value = "";
});
startButton.addEventListener("click", () => {
  reStart.disabled = false;
  if (firstPlayer.value !== "" && secondPlayer.value !== "") {
    Game.start();
    startButton.disabled = true;
    MessageController.renderMessage("");
  } else {
    MessageController.renderMessage("Please enter names!!");
  }
});
