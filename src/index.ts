import Player from "./player";
import Dom from "./dom";
import "./style.css";

let playerOne = new Player("playerOne", false);
let playerTwo = new Player("computer", true);

const randomPlace = function randomlyPlacesShips(player) {
  while (player.game.yetToBeSet.size > 0) {
    const set = player.game.yetToBeSet.values();
    for (const ship of set) {
      const coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      const orientation =  Math.random() > 0.5? true: false;
      player.game.setShipPos(ship, [coordinates, orientation])
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

console.log(playerTwo.game.matrix);
//Render things

const render = function refreshBothGameboards() {
  const renderOne = new Dom(playerOne, "boardOne");
  renderOne.renderBoard();

  const renderTwo = new Dom(playerTwo, "boardTwo");
  renderTwo.renderBoard();
};


const finish = function endGameOnAllShipSunk() {
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

boardTwo.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const val = target.getAttribute('data-value');
  const position = val.split(",");    
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
  //diagnosis
  console.log(playerTwo.game.matrix);
  render();
  if(playerOne.game.allSunkOrNot() || playerTwo.game.allSunkOrNot()){
    finish();
  }
});
