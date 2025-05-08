import Gameboard from "./gameboard";
export default class Player {
    name;
    isComputer;
    game;

  constructor(name, computerOrNot) {
    this.name = name;
    this.isComputer = computerOrNot;
    this.game = new Gameboard();
  }
}
