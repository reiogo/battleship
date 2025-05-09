import {ShipInterface, Ship} from "./ship";

type position = [[number, number], boolean];

export interface GameboardInterface {
    matrix;
    missedAttacks;
    yetToBeSet;

    carrier;
    battleship;
    submarine;
    destroyer;
    patrolship;

    _initShips():void;
    setShipPos(ship: ShipInterface, position: position): boolean;
    getYetToBeSet():string[];
    allSunkOrNot():boolean;
    receiveAttack(coordinates: [number, number]): boolean;
    _placeship(
        ship: ShipInterface,
        startpoint: [number, number],
        horizontal: boolean
    ): boolean;
    _matrixbuild():void;

};
export class Gameboard implements GameboardInterface{
    matrix;
    missedAttacks;
    yetToBeSet;

    carrier;
    battleship;
    submarine;
    destroyer;
    patrolship;

  constructor() {
    this.matrix = [];
    this._matrixbuild();
    this._initShips();
    this.missedAttacks = [];
    this.yetToBeSet = new Set(["C", "B", "S", "D", "P"]);
  }

  _initShips(): void{
    this.carrier = new Ship( "C");
    this.battleship = new Ship("B");
    this.submarine = new Ship("S");
    this.destroyer = new Ship("D");
    this.patrolship = new Ship("P");
  }

  // position = [[start y, start x], (true is horizontal, false is vertical)]
  setShipPos(ship: ShipInterface, position: position): boolean{
    const ships = {
      C: this.carrier,
      B: this.battleship,
      S: this.submarine,
      D: this.destroyer,
      P: this.patrolship,
    };

      // flag
    let attempt = true;

      // if the set has the ship
    if (this.yetToBeSet.has(ship.id)) {
        // use helper method to place the ship and get the boolean response
      attempt = this._placeship(ships[ship.id], position[0], position[1]);
      if (attempt == true) {
          // is this working?
        this.yetToBeSet.delete(ship.id);
      }
    }
    return attempt;
  }

    getYetToBeSet():string[]{
        return Array.from(this.yetToBeSet);
    }

  allSunkOrNot(): boolean {
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

  receiveAttack(coordinates: [number, number]): boolean {
      // check what is happening at these coordinates
    const attack = this.matrix[coordinates[0]][coordinates[1]];

    if (attack == 1 || attack == 'X') {
      // if 1 or X then return false?
      return false;
    } else if (attack == 0) {
        // if 0 then log missed attack and change to 1
      this.missedAttacks.push(coordinates);
      this.matrix[coordinates[0]][coordinates[1]] = "1";
    } else {
        // otherwise make it a hit, and hit the right ship
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
    return true;
  }

  _placeship(
      ship: ShipInterface,
      startpoint: [number, number],
      horizontal: boolean
  ): boolean {
    const yPos = startpoint[0];
    const xPos = startpoint[1];
    if (horizontal == true) {
      for (let i = 0; i < ship.length; i++) {
        //The x and y positions collide with other ships
        // or they are out of bounds (in a matrix of 10).
        if (xPos + i > 9 || this.matrix[yPos][xPos + i] != 0) {
          return false;
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.matrix[yPos][xPos + i] = ship.id;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (yPos + i > 9 || this.matrix[yPos + i][xPos] != 0) {
          return false;
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.matrix[yPos + i][xPos] = ship.id;
      }
    }
    return true;
  }

  _matrixbuild():void {
    // 10 by 10 grid
    for (let m = 0; m < 10; m++) {
      this.matrix.push([]);
      for (let n = 0; n < 10; n++) {
        this.matrix[m].push(0);
      }
    }
  }
}
