const Ship = (shipLength, shipName) => {
  const name = shipName || `Ship ${shipLength}`;
  const length = shipLength;
  const positions = new Array(length).fill(false);

  const hit = (position) => {
    if (position < 0 || position > length - 1) throw new Error("Invalid Position Hit");
    positions[position] = true;
  };

  const hits = () => {
    return [...positions];
  };

  const isSunk = () => {
    return positions.every((position) => position);
  };

  return { name, length, hit, hits, isSunk };
};

export default Ship;
