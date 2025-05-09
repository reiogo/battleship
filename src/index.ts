import {Player, PlayerInterface} from "./player";
import {Dom, DomInterface} from "./dom";
import {ShipInterface, Ship} from "./ship";
import "./style.css";

let playerOne = new Player("playerOne", false);
let playerTwo = new Player("computer", true);

const randomPlace = function randomlyPlacesShips(player: PlayerInterface) {
  while (player.game.yetToBeSet.size > 0) {
    // get all the ships that haven't been set yet
    let setOfShips = player.game.getYetToBeSet();
    
      // loop through the ships
    for (let ship of setOfShips) {
        //get random coordinates
      const coordinates: [number, number] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        // get random orientation
      const orientation =  Math.random() > 0.5? true: false;
        // set ships using Gameboard method
      
       let newShip = new Ship(ship);
      let output = player.game.setShipPos(newShip, [coordinates, orientation])
    }
  }
}
const placeButton = document.getElementById('place-button');
placeButton.addEventListener('click', () => {
  playerOne = new Player("playerOne", false);
  const startButton = document.getElementById('start-button');
  randomPlace(playerOne);

  const renderOne = new Dom(playerOne, "boardOne");
  renderOne.renderBoard();

  startButton.style.cssText = `
    display: block;
  `
});

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  playerTwo = new Player("computer", true);
  const startDiv = document.getElementById('start-menu');

  startDiv.style.cssText = `
    display: none;
  `
  randomPlace(playerTwo);
  const renderTwo = new Dom(playerTwo, "boardTwo");
  renderTwo.renderBoard();
  
});

//Render things

const render = function refreshBothGameboards(): void {
  const renderOne = new Dom(playerOne, "boardOne");
  renderOne.renderBoard();

  const renderTwo = new Dom(playerTwo, "boardTwo");
  renderTwo.renderBoard();
};


const finish = function endGameOnAllShipSunk(): void {
  if (playerOne.game.allSunkOrNot()) {
    alert('Gameover!');
  } else {
    alert('You won!');
  }
  if(confirm('New Game?')) {
    const computer = document.getElementById('boardTwo');
    while (computer.firstChild) {
      computer.removeChild(computer.lastChild);
    }
    playerOne = new Player("playerOne", false);
    randomPlace(playerOne);

    const renderOne = new Dom(playerOne, "boardOne");
    renderOne.renderBoard();

    const startDiv = document.getElementById('start-menu');

    startDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    `
  }
}

// Event listeners
const boardTwo = document.getElementById("boardTwo");

boardTwo.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.getAttribute('data-value') == null){
        return;
    }
    const values = target.getAttribute('data-value')
                            .split(",")
                            .map((value)=>Number(value));
    const position: [number, number] = [values[0], values[1]];

  const attackSuccess = playerTwo.game.receiveAttack(position);
  if (!attackSuccess) {
    return
  }

  let compPosX = Math.floor(Math.random() * 10);
  let compPosY = Math.floor(Math.random() * 10);
  let counter = 0;
  while (
    playerOne.game.missedAttacks.includes(
      playerOne.game.matrix[compPosY][compPosX],
    ) &&
    counter <= 99
  ) {
    compPosX = Math.floor(Math.random() * 10);
    compPosY = Math.floor(Math.random() * 10);
    counter++;
  }
  playerOne.game.receiveAttack([compPosY, compPosX]);
  render();
  if(playerOne.game.allSunkOrNot() || playerTwo.game.allSunkOrNot()){
    finish();
  }
});
