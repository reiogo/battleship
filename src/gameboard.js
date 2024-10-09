import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.matrix = [];
    this._matrixbuild();
    this._initShips();
    this.missedAttacks = [];
  }

  _initShips() {
    this.carrier = new Ship(5, "C");
    this.battleship = new Ship(4, "B");
    this.submarine = new Ship(3, "S");
    this.destroyer = new Ship(3, "D");
    this.patrolship = new Ship(2, "P");
  }

  // position = [[start y, start x], (true is horizontal, false is vertical)]
  setShipPos(ship, position) {
    const ships = {
      C: this.carrier,
      B: this.battleship,
      S: this.submarine,
      D: this.destroyer,
      P: this.patrolship,
    };

    this.yetToBeSet = new Set(["C", "B", "S", "D", "P"]);
    let attempt = true;
    if (this.yetToBeSet.has(ship)) {
      attempt = this._placeship(ships[ship], position[0], position[1]);
      if (attempt == true) {
        this.yetToBeSet.delete(ship);
      }
    }
    return attempt;
  }

  allSunkOrNot() {
    const shipList = [
      this.carrier,
      this.battleship,
      this.submarine,
      this.destroyer,
      this.patrolship,
    ];
    let flag = true;
    shipList.forEach((ship) => {
      if (!ship.isSunk()) {
        flag = false;
      }
    });
    return flag;
  }

  receiveAttack(coordinates) {
    const attack = this.matrix[coordinates[0]][coordinates[1]];
      this.matrix[coordinates[0]][coordinates[1]] = "1";
    if (attack == 0) {
      this.missedAttacks.push(coordinates);
    } else {
      this.matrix[coordinates[0]][coordinates[1]] = "X";
      if (attack == "C") {
        this.carrier.hit();
      } else if (attack == "B") {
        this.battleship.hit();
      } else if (attack == "D") {
        this.destroyer.hit();
      } else if (attack == "S") {
        this.submarine.hit();
      } else if (attack == "P") {
        this.patrolship.hit();
      }
    }
  }

  _placeship(ship, startpoint, horizontal) {
    const yPos = startpoint[0];
    const xPos = startpoint[1];
    if (horizontal == true) {
      for (let i = 0; i < ship.length; i++) {
        //The x and y positions collide with other ships
        // or they are out of bounds (in a matrix of 10).
        if (this.matrix[yPos][xPos + i] != 0 || xPos + i > 9) {
          return false;
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.matrix[yPos][xPos + i] = ship.id;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.matrix[yPos + i][xPos] != 0 || yPos + i > 9) {
          return false;
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.matrix[yPos + i][xPos] = ship.id;
      }
    }
    return true;
  }

  _matrixbuild() {
    // 10 by 10 grid
    for (let m = 0; m < 10; m++) {
      this.matrix.push([]);
      for (let n = 0; n < 10; n++) {
        this.matrix[m].push(0);
      }
    }
  }
}
