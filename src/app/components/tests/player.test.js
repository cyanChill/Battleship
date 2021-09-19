import Gameboard from "../factories/gameboard";
import Ship from "../factories/ship";
import Player from "../factories/player";

const gameBoard = Gameboard();

const Submarine = Ship(3, "Submarine");
const subShipInfo = {
  ship: Submarine,
  vertical: false,
  location: null,
};
gameBoard.placeShipAt(subShipInfo, { vertical: true, location: { x: 3, y: 5 } });

gameBoard.addShipInfo(subShipInfo);

const Player1 = Player("Player1");

test("Attack via player object and hit", () => {
  const coords = { x: 3, y: 5 };
  expect(Player1.attackBoard(coords, gameBoard).result).toBe("Hit");
  console.log(gameBoard.currBoardState());
});

test("Auto attack board", () => {
  expect(Player1.autoAttackBoard(gameBoard).result).toMatch(/Hit|Miss/);
  console.log(gameBoard.currBoardState());
});
