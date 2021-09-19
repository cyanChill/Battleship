const Player = (name) => {
  const attackBoard = (coords, enemyBoard) => {
    return enemyBoard.recieveAttack(coords);
  };

  const autoAttackBoard = (enemyBoard) => {
    let coords;
    let result = false;
    do {
      coords = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };
      result = enemyBoard.recieveAttack(coords);
    } while (!result);

    return result;
  };

  return { name, attackBoard, autoAttackBoard };
};

export default Player;
