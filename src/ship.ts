export default class Ship {
    id;
    length;
    hitNum;
    sunkOrNot;
  constructor(length, id) {
    this.id = id;
    this.length = length;
    this.hitNum = 0;
    this.sunkOrNot = false;
  }

  hit() {
    this.hitNum += 1;
  }
  isSunk() {
    if (this.length <= this.hitNum) {
      this.sunkOrNot = true;
      return true;
    } else {
      return false;
    }
  }
}
