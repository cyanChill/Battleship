import Ship from "../factories/ship";

const ship = Ship(4, "Battleship");

test("Initialize a ship of length 4", () => {
  expect(ship.length).toBe(4);
});

test("Hit ship at position 0", () => {
  ship.hit(0);
  expect(ship.hits()).toEqual([true, false, false, false]);
  expect(ship.isSunk()).toBe(false);
});

test("Hit ship at position 2", () => {
  ship.hit(2);
  expect(ship.hits()).toEqual([true, false, true, false]);
  expect(ship.isSunk()).toBe(false);
});

test("Hit ship at position 1", () => {
  ship.hit(1);
  expect(ship.hits()).toEqual([true, true, true, false]);
  expect(ship.isSunk()).toBe(false);
});

test("Hit ship at position 3", () => {
  ship.hit(3);
  expect(ship.hits()).toEqual([true, true, true, true]);
  expect(ship.isSunk()).toBe(true);
});

test("Ship sunk", () => {
  expect(ship.isSunk()).toBe(true);
});
