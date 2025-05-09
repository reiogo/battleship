import Gameboard from "./gameboard";
import Ship from "./ship";
import Player from "./player";
test("Classes exists", () => {
  expect(Ship).toBeDefined();
  expect(Gameboard).toBeDefined();
  expect(Player).toBeDefined();
});


test("hit function works", () => {
  const ship = new Ship(10);
  ship.hit();
  expect(ship.hitNum).toBe(1);
});

test("isSunk", () => {
  const ship = new Ship(1);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});

// test("Gameboards place ships", () => {
//   const gameboard = new Gameboard();
//   gameboard.setShipPos('C', [[3,0],false]);
//   gameboard.setShipPos('B', [[2,1],false]);
//   gameboard.setShipPos('S', [[0,1],true]);
//   gameboard.setShipPos('D', [[2,2],true]);
//   gameboard.setShipPos('P', [[4,3],false]);
//   expect(gameboard.matrix).toBe(10);
// });

test("ReceiveAttack", () => {
  const gameboard = new Gameboard();
  gameboard.setShipPos("C", [[3, 0], false]);
  gameboard.setShipPos("B", [[2, 1], false]);
  gameboard.receiveAttack([1, 1]);
  expect(gameboard.missedAttacks).toEqual([[1, 1]]);
  gameboard.receiveAttack([3, 0]);
  gameboard.receiveAttack([2, 1]);
  expect(gameboard.carrier.hitNum).toBe(1);
  expect(gameboard.battleship.hitNum).toBe(1);
});

test("allSunkOrNot", () => {
  const gameboard = new Gameboard();
  gameboard.setShipPos("P", [[4, 3], false]);
  // expect(gameboard.matrix).toBe(10);
  gameboard.receiveAttack([4, 3]);
  gameboard.receiveAttack([5, 3]);
  gameboard.carrier.hitNum = 5;
  gameboard.battleship.hitNum = 5;
  gameboard.destroyer.hitNum = 5;
  gameboard.submarine.hitNum = 5;
  expect(gameboard.patrolship.isSunk()).toBeTruthy();
  expect(gameboard.allSunkOrNot()).toBeTruthy();
});

test("Ship collisions & out of bounds", () => {
  const gameboard = new Gameboard();
  expect(gameboard.setShipPos("C", [[9, 9 ], true])).toBeFalsy();
});
