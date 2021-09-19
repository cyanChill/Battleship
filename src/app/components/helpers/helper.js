const copyArray = (arr) => JSON.parse(JSON.stringify(arr));

const defaultShips = () => {
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

export { copyArray, defaultShips, isValidCoord };
