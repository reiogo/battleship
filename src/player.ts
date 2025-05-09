import {Gameboard, GameboardInterface} from "./gameboard";

export interface PlayerInterface {
    name: string;
    isComputer: boolean;
    game: Gameboard;

};
export class Player implements PlayerInterface{
    name;
    isComputer;
    game;

  constructor(name: string, computerOrNot: boolean) {
    this.name = name;
    this.isComputer = computerOrNot;
    this.game = new Gameboard();
  }
}
