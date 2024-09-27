import Ship from "./ship";
import Player from "./player";

export default class Gameboard {
  constructor() {
    this.matrix = [];
    this._matrixbuild();
    this._initShips();
    this.missedAttacks = new Set();
  }

  _initShips() {
    this.carrier = new Ship(5, 'C');
    this.battleship = new Ship(4, 'B');
    this.submarine = new Ship(3, 'S');
    this.destroyer = new Ship(3, 'D');
    this.patrolship = new Ship(2, 'P');


  }

  // position = [[start y, start x], (true is horizontal, false is vertical)]
  setShipPos(ship, position) {
    this.yetToBeSet = new Set(["C", "B", "S", "D", "P"]);
      if (ship == "C") {
        if(this.yetToBeSet.has(ship)) { 
          this._placeship(this.carrier, position[0], position[1]);
          this.yetToBeSet.delete(ship);
        }
      } else if (ship == "B") {
        if(this.yetToBeSet.has(ship)) { 
          this._placeship(this.battleship, position[0], position[1]);
          this.yetToBeSet.delete(ship);
        }
      } else if (ship == "D") {
        if(this.yetToBeSet.has(ship)) { 
          this._placeship(this.destroyer, position[0], position[1]);
          this.yetToBeSet.delete(ship);
        }
      } else if (ship == "S") {
        if(this.yetToBeSet.has(ship)) { 
          this._placeship(this.submarine, position[0], position[1]);
          this.yetToBeSet.delete(ship);
        }
      } else if (ship == "P") {
        if(this.yetToBeSet.has(ship)) { 
          this._placeship(this.patrolship, position[0], position[1]);
          this.yetToBeSet.delete(ship);
        }
      }
  }

  allSunkOrNot() {
    const shipList = [
      this.carrier,
      this.battleship, 
      this.submarine,
      this.destroyer, 
      this.patrolship
    ];
    let flag = true;
    shipList.forEach((ship) => {
      if(!ship.isSunk()){
        flag = false;
      }
    });
    return flag;
  }

  receiveAttack(coordinates) {
    const attack = this.matrix[coordinates[0]][coordinates[1]];
    if(attack == 0) {
      this.missedAttacks.add(coordinates);
    } else {
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
        this.matrix[(yPos)][(xPos) + i] = ship.id;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.matrix[(yPos) + i][(xPos)] = ship.id;
      }
    }
    
  }

  _matrixbuild() {
    // 10 by 10 grid
    for (let m = 0; m<10; m++) {
      this.matrix.push([]);
      for (let n = 0; n<10; n++) {
        this.matrix[m].push(0);
      }
    }
  }
}
