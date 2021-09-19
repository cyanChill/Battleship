import Gameboard from "../factories/gameboard";
import Ship from "../factories/ship";

const gameBoard = Gameboard();

const PatrolBoat = Ship(2, "Patrol Boat");
const patrolShipInfo = {
  ship: PatrolBoat,
  vertical: false,
  location: null,
};

const Submarine = Ship(3, "Submarine");
const submarineShipInfo = {
  ship: Submarine,
  vertical: false,
  location: null,
};
gameBoard.placeShipAt(submarineShipInfo, { vertical: true, location: { x: 3, y: 5 } });

gameBoard.addShipInfo(patrolShipInfo);
gameBoard.addShipInfo(submarineShipInfo);

/* Start of tests */
test("Place a ship onto the board", () => {
  const newState = {
    vertical: false,
    location: { x: 0, y: 0 },
  };

  expect(gameBoard.placeShipAt(patrolShipInfo, newState)).toBe(true);
  expect(gameBoard.currBoardState()).toEqual([
    ["O", "O", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
});

test("Place a vertical ship onto the board", () => {
  const newState = {
    vertical: true,
    location: { x: 0, y: 0 },
  };

  expect(gameBoard.placeShipAt(patrolShipInfo, newState)).toBe(true);
  expect(gameBoard.currBoardState()).toEqual([
    ["O", "", "", "", "", "", "", "", "", ""],
    ["O", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
});

test("Invalid Horizontal Placement", () => {
  const newState = {
    vertical: false,
    location: { x: 9, y: 9 },
  };

  expect(gameBoard.placeShipAt(patrolShipInfo, newState)).toBe(false);
  expect(gameBoard.currBoardState()).toEqual([
    ["O", "", "", "", "", "", "", "", "", ""],
    ["O", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
});

test("Invalid Vertical Placement", () => {
  const newState = {
    vertical: true,
    location: { x: 9, y: 9 },
  };

  expect(gameBoard.placeShipAt(patrolShipInfo, newState)).toBe(false);
  expect(gameBoard.currBoardState()).toEqual([
    ["O", "", "", "", "", "", "", "", "", ""],
    ["O", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
});

test("Invalid Horizontal Placement: Overlap", () => {
  const newState = {
    vertical: false,
    location: { x: 3, y: 4 },
  };

  expect(gameBoard.placeShipAt(patrolShipInfo, newState)).toBe(false);
  expect(gameBoard.currBoardState()).toEqual([
    ["O", "", "", "", "", "", "", "", "", ""],
    ["O", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
});

test("Invalid Vertical Placement: Overlap", () => {
  const newState = {
    vertical: true,
    location: { x: 2, y: 5 },
  };

  expect(gameBoard.placeShipAt(patrolShipInfo, newState)).toBe(false);
  expect(gameBoard.currBoardState()).toEqual([
    ["O", "", "", "", "", "", "", "", "", ""],
    ["O", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
});

test("Missed Attack", () => {
  const coordinates = { x: 4, y: 0 };
  expect(gameBoard.recieveAttack(coordinates)).toBe("Miss");
  expect(gameBoard.currBoardState()).toEqual([
    ["O", "", "", "", "", "", "", "", "", ""],
    ["O", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["*", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
});

test("Hit Attack", () => {
  const coordinates = { x: 0, y: 0 };
  expect(gameBoard.recieveAttack(coordinates)).toBe("Hit");
  expect(gameBoard.currBoardState()).toEqual([
    ["X", "", "", "", "", "", "", "", "", ""],
    ["O", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["*", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
  expect(patrolShipInfo.ship.hits()).toEqual([true, false]);
});

test("Sink Ship", () => {
  const coordinates = { x: 1, y: 0 };
  expect(gameBoard.recieveAttack(coordinates)).toBe("Hit");
  expect(gameBoard.currBoardState()).toEqual([
    ["X", "", "", "", "", "", "", "", "", ""],
    ["X", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["*", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
  expect(patrolShipInfo.ship.hits()).toEqual([true, true]);
  expect(patrolShipInfo.ship.isSunk()).toBe(true);
});

test("Attacked same spot", () => {
  const coordinates = { x: 4, y: 0 };
  expect(gameBoard.recieveAttack(coordinates)).toBe(false);
  expect(gameBoard.currBoardState()).toEqual([
    ["X", "", "", "", "", "", "", "", "", ""],
    ["X", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["*", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "O", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
});

test("Game Over", () => {
  gameBoard.recieveAttack({ x: 3, y: 5 });
  gameBoard.recieveAttack({ x: 4, y: 5 });
  gameBoard.recieveAttack({ x: 5, y: 5 });

  expect(gameBoard.gameOver()).toBe(true);
});
