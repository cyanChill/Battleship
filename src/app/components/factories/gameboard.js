import Ship from "./ship";
import { copyArray, isValidState } from "../helpers/helper";

const Gameboard = () => {
  let board = copyArray(new Array(10).fill(new Array(10).fill("")));
  const ships = [];

  const currBoardState = () => {
    return copyArray(board);
  };

  const placeShipAt = (shipInfo, newState) => {
    if (!isValidState(newState)) return false;

    if (isValidPosition(shipInfo, newState)) {
      const length = shipInfo.ship.length;
      const {
        vertical,
        location: { x, y },
      } = newState;

      // Remove Prev Ship Location & update the current board
      let { newBoardState } = removeShipOnBoard(shipInfo);
      board = newBoardState;

      for (let i = 0; i < length; i++) {
        if (vertical) board[x + i][y] = "O";
        else board[x][y + i] = "O";
      }

      // Update the ship object properties directly
      shipInfo.vertical = newState.vertical;
      shipInfo.location = newState.location;

      return true;
    }
    return false;
  };

  const removeShipOnBoard = (shipInfo) => {
    const {
      vertical,
      ship: { length },
      location,
    } = shipInfo;
    const boardCopy = currBoardState();

    // If the ship isn't on the board
    if (!location) return { newBoardState: boardCopy, newShipObjState: shipInfo };

    const { x, y } = location;

    for (let i = 0; i < length; i++) {
      if (vertical) boardCopy[x + i][y] = "";
      else boardCopy[x][y + i] = "";
    }

    return {
      newBoardState: boardCopy,
      newShipObjState: {
        ...shipInfo,
        location: null,
      },
    };
  };

  const isValidPosition = (shipInfo, state) => {
    if (!isValidState(state)) return false;

    const length = shipInfo.ship.length;
    const {
      vertical,
      location: { x, y },
    } = state;

    // If the ship would go off the board in this new state
    if ((vertical && x + length > 10) || (!vertical && y + length > 10)) return false;

    // Simulate removing the ship on the board if it was previous on the board
    let { newBoardState } = removeShipOnBoard(shipInfo);

    for (let i = 0; i < length; i++) {
      // If there exists an part of the ship in the path
      if (vertical && newBoardState[x + i][y]) return false;
      if (newBoardState[x][y + i]) return false;
    }

    return true;
  };

  const recieveAttack = (coordinates) => {
    const { x, y } = coordinates;

    // Spot already hit
    if (board[x][y] === "*" || board[x][y] === "X") return false;

    // No part of ship located at the coordinate
    if (board[x][y] === "") {
      board[x][y] = "*";
      return "Miss";
    }

    board[x][y] = "X";

    // Find the ship that was hit
    const hitShip = ships.find((shipInfo) => {
      const {
        ship: { length },
        vertical,
        location: { x: startX, y: startY },
      } = shipInfo;

      if (vertical) return startX <= x && x < startX + length && startY === y;
      else return startX === x && startY <= y && y < startY + length;
    });

    if (hitShip.vertical) hitShip.ship.hit(x - hitShip.location.x);
    else hitShip.ship.hit(y - hitShip.location.y);

    return "Hit";
  };

  const gameOver = () => {
    return ships.every((shipInfo) => shipInfo.ship.isSunk());
  };

  const addShipInfo = (shipInfo) => {
    if (
      !shipInfo.ship instanceof Ship ||
      (shipInfo.vertical !== true && shipInfo.vertical !== false)
    ) {
      return false;
    }
    shipInfo.location = null;
    ships.push(shipInfo);

    return true;
  };

  return {
    currBoardState,
    placeShipAt,
    recieveAttack,
    gameOver,
    addShipInfo,
  };
};

export default Gameboard;
