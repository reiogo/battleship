export interface ShipInterface{
    id;
    length;
    hitNum;
    sunkOrNot;
    shipLength;

    hit():void;
    isSunk():boolean;
    _setLength(shipId: string):void;
};
export class Ship implements ShipInterface{
    id;
    length;
    hitNum;
    sunkOrNot;
    shipLength;
  constructor(shipId: string) {
    this.id = shipId;
    this.hitNum = 0;
    this.sunkOrNot = false;
    this.shipLength ={"C": 5, "B": 4, "S": 3, "D": 3, "P": 2};
    this._setLength(shipId);
  }

  _setLength(shipId:string): void{
      this.length = this.shipLength[shipId];
  }

  hit(): void {
    this.hitNum += 1;
  }

  isSunk(): boolean {
    if (this.length <= this.hitNum) {
      this.sunkOrNot = true;
      return true;
    } else {
      return false;
    }
  }
}
