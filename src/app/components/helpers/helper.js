import Ship from "../factories/ship";

const copyArray = (arr) => JSON.parse(JSON.stringify(arr));

const getDefaultShips = () => {
  return [
    {
      ship: Ship(5, "Carrier"),
      vertical: false,
      location: null,
    },
    {
      ship: Ship(4, "BattleShip"),
      vertical: false,
      location: null,
    },
    {
      ship: Ship(3, "Destroyer"),
      vertical: false,
      location: null,
    },
    {
      ship: Ship(3, "Submarine"),
      vertical: false,
      location: null,
    },
    {
      ship: Ship(2, "Patrol Boat"),
      vertical: false,
      location: null,
    },
  ];
};

const isValidCoord = (coords) => {
  const has = Object.prototype.hasOwnProperty;
  if (!has.call(coords, "x") || !has.call(coords, "y")) return false;

  const { x, y } = coords;
  if (typeof x !== "number" || typeof y !== "number") return false;

  if (x < 0 || x > 9 || y < 0 || y > 9) return false;

  return true;
};

const isValidState = (state) => {
  const has = Object.prototype.hasOwnProperty;
  if (!has.call(state, "vertical") || !has.call(state, "location")) return false;
  if (state.vertical !== true && state.vertical !== false) return false;
  if (!isValidCoord(state.location)) return false;

  return true;
};

const getRandomCoords = () => {
  return {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
  };
};

const getRandomNewState = () => {
  const vertical = Math.floor(Math.random() * 100) < 50 ? true : false;

  return {
    vertical,
    location: getRandomCoords(),
  };
};

export {
  copyArray,
  getDefaultShips,
  isValidCoord,
  isValidState,
  getRandomCoords,
  getRandomNewState,
};
