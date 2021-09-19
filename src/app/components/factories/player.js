import { getRandomCoords } from "../helpers/helper";

const Player = (name) => {
  const attackBoard = (coords, enemyBoard) => {
    return {
      location: coords,
      result: enemyBoard.recieveAttack(coords),
    };
  };

  const autoAttackBoard = (enemyBoard) => {
    let result = false;
    let coords;
    do {
      coords = getRandomCoords();
      result = enemyBoard.recieveAttack(coords);
    } while (!result);

    return {
      location: coords,
      result,
    };
  };

  return { name, attackBoard, autoAttackBoard };
};

export default Player;
