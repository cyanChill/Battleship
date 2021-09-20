import Player from "./player";
import Gameboard from "./gameboard";
import { getDefaultShips, getRandomNewState } from "../helpers/helper";

const playerBoardDiv = document.getElementById("player-board-div");
const computerBoardDiv = document.getElementById("computer-board-div");
const instructionDiv = document.getElementById("instructions");
const rotateBtn = document.getElementById("rotate");
const winnerLine = document.getElementById("winner");
const modal = document.getElementById("reset-modal");

const initializeGame = () => {
  reset();
  playerBoardDiv.textContent = "";
  playerBoardDiv.classList.remove("lock-board");
  computerBoardDiv.textContent = "";

  const Computer = Player("Computer");
  const ComputerGameBoard = createRandomBoard();
  const ComputerDOMBoard = createDOMBoard(ComputerGameBoard.currBoardState());
  ComputerDOMBoard.classList.add("computer");
  ComputerDOMBoard.classList.add("hidden");
  computerBoardDiv.appendChild(ComputerDOMBoard);

  const Player1 = Player("Player");
  const PlayerGameBoard = Gameboard();
  const PlayerDOMBoard = createDOMBoard(PlayerGameBoard.currBoardState());
  playerBoardDiv.appendChild(PlayerDOMBoard);

  createPlayerBoard({
    player: Player1,
    playerBoard: PlayerGameBoard,
    playerDOMBoard: PlayerDOMBoard,

    computer: Computer,
    computerBoard: ComputerGameBoard,
    ComputerDOMBoard: ComputerDOMBoard,
  });
};

const createPlayerBoard = (game) => {
  const { playerBoard, ComputerDOMBoard } = game;

  const ships = getDefaultShips();
  let isVertical = false;

  const rotateShip = () => {
    isVertical = !isVertical;
    isVertical ? (rotateBtn.textContent = "Rotate X") : (rotateBtn.textContent = "Rotate Y");
  };

  ships.forEach((ship) => playerBoard.addShipInfo(ship));
  rotateBtn.addEventListener("click", rotateShip);
  rotateBtn.classList.remove("hidden");

  const playerAddShips = () => {
    if (ships.length === 0) {
      instructionDiv.textContent = "";
      playerBoardDiv.classList.add("lock-board");
      ComputerDOMBoard.classList.remove("hidden");
      rotateBtn.classList.add("hidden");
      rotateBtn.removeEventListener("click", rotateShip);

      console.log("finished adding ships");
      playGame(game);

      return;
    } else {
      const ship = ships[0];
      const shipName = ship.ship.name;
      const shipLength = ship.ship.length;
      instructionDiv.textContent = `Place your ${shipName}`;

      const addShip = (e) => {
        let {
          classList: sqrInfo,
          dataset: { x, y },
        } = e.target;

        if (sqrInfo.contains("square")) {
          x = parseInt(x);
          y = parseInt(y);
          const state = {
            location: { x, y },
            vertical: isVertical,
          };

          if (playerBoard.placeShipAt(ship, state)) {
            /* display ship placement*/
            for (let i = 0; i < shipLength; i++) {
              const square = playerBoardDiv.querySelector(
                `.square[data-x="${isVertical ? x + i : x}"][data-y="${isVertical ? y : y + i}"]`
              );
              square.classList.add("ship");
            }

            ships.shift();
          }
        }
        playerBoardDiv.removeEventListener("click", addShip);
        playerAddShips();
      };

      playerBoardDiv.addEventListener("click", addShip);
    }
  };

  playerAddShips();
};

const createRandomBoard = () => {
  const gameBoard = Gameboard();
  const ships = getDefaultShips();

  ships.forEach((ship) => {
    let response = false;
    gameBoard.addShipInfo(ship);

    do {
      response = gameBoard.placeShipAt(ship, getRandomNewState());
    } while (!response);
  });

  return gameBoard;
};

const createDOMBoard = (gameboard) => {
  const container = document.createElement("div");
  container.classList.add("gameboard-container");

  gameboard.forEach((row, rowIdx) => {
    row.forEach((column, colIdx) => {
      const square = document.createElement("div");
      square.setAttribute("data-x", rowIdx);
      square.setAttribute("data-y", colIdx);
      square.classList = `square ${column === "O" ? "ship" : "water"}`;

      container.appendChild(square);
    });
  });

  return container;
};

const playGame = (game) => {
  reset();
  const { player, playerBoard, playerDOMBoard, computer, computerBoard, ComputerDOMBoard } = game;
  let turn = true; // true: player, false: computer

  playerBoardDiv.classList.add("lock-board");

  const handleHit = (result, board) => {
    if (result !== "Hit" || !board.gameOver()) return false;

    ComputerDOMBoard.removeEventListener("click", playerMove);
    reset(turn);
    return true;
  };

  const computerMove = () => {
    const { result, location } = computer.autoAttackBoard(playerBoard);
    markSpotAsHit(playerDOMBoard, location);

    if (handleHit(result, playerBoard)) return;
    turn = !turn;
  };

  const playerMove = (e) => {
    const {
      classList: sqrInfo,
      dataset: { x, y },
    } = e.target;

    if (!sqrInfo.contains("hit") && sqrInfo.contains("square") && turn) {
      const coords = { x: parseInt(x), y: parseInt(y) };
      let { result } = player.attackBoard(coords, computerBoard);

      markSpotAsHit(ComputerDOMBoard, coords);

      if (handleHit(result, computerBoard)) return;
      turn = !turn;
      computerMove();
    }
  };

  computerBoardDiv.addEventListener("click", playerMove);
};

const markSpotAsHit = (DOMBoard, coords) => {
  const { x, y } = coords;
  const square = DOMBoard.querySelector(`.square[data-x="${x}"][data-y="${y}"]`);
  square.classList.add("hit");
};

const reset = (winnerBool = null) => {
  console.log("resetting game");

  if (winnerBool === true || winnerBool === false) {
    winnerLine.textContent =
      winnerBool === false ? "Computer Wins" : winnerBool === true ? "Player Wins" : "";
    const newGameBtn = document.getElementById("new-game");
    computerBoardDiv.classList.add("lock-board");

    displayResetModal("on");

    newGameBtn.addEventListener("click", initializeGame);
  } else {
    computerBoardDiv.classList.remove("lock-board");
    displayResetModal("off");
  }
};

const displayResetModal = (setting) => {
  if (setting === "on") modal.classList.add("show");
  else if (setting === "off") modal.classList.remove("show");
};

export { initializeGame };
