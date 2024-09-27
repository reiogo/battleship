import Gameboard from "./gameboard";
export default class Player {
  constructor(name, computerOrNot) {
    this.name = name;
    this.isComputer = computerOrNot;
    this.game = Gameboard();
  }
}

