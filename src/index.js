import Player from "./player";
import Dom from "./dom";
import "./style.css";

const playerOne = new Player("playerOne", false);
playerOne.game.setShipPos("C", [[3, 0], false]);
playerOne.game.setShipPos("B", [[2, 1], false]);
playerOne.game.setShipPos("S", [[0, 1], true]);
playerOne.game.setShipPos("D", [[2, 2], false]);
playerOne.game.setShipPos("P", [[8, 8], false]);

const playerTwo = new Player("computer", true);
playerTwo.game.setShipPos("C", [[3, 0], false]);
playerTwo.game.setShipPos("B", [[2, 1], false]);
playerTwo.game.setShipPos("S", [[0, 1], true]);
playerTwo.game.setShipPos("D", [[2, 2], false]);
playerTwo.game.setShipPos("P", [[4, 3], false]);

//Render things

const render = function refreshBothGameboards() {
  const renderOne = new Dom(playerOne, "boardOne");
  renderOne.renderBoard();

  const renderTwo = new Dom(playerTwo, "boardTwo");
  renderTwo.renderBoard();
};

render();

const finish = function endGameOnAllShipSunk() {
  const boards = document.getElementById('gameboards');
  const boardOne = document.getElementById('boardOne');
  const boardTwo = document.getElementById('boardTwo');
  boardOne.style.cssText = 'display: none;';
  boardTwo.style.cssText = 'display: none;';
  
  const endscreen = document.createElement('div');
  endscreen.id = 'endscreen';
  endscreen.textContent = "Game Over";
  endscreen.style.cssText = `
    width: 400px;
    height: 200px;
    font-size: 30px;
    background-color: lightblue;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
  `;
  boards.appendChild(endscreen);

  const resetbutton = document.createElement('button');
  resetbutton.textContent = "new game?";
  resetbutton.style.cssText = `
    width: 100px;
    height: 20px;
    background-color: lightblue;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  endscreen.appendChild(resetbutton);
  resetbutton.addEventListener('click', () => {
    const boards = document.getElementById('gameboards');
    boards.removeChild(boards.lastChild);
    boardOne.style.cssText = 
    `
      border: 1px solid black;
      background-color: cornflowerblue;
      width: 400px;
      height: 400px;
      display: grid;
      grid-template: repeat(10, 1fr) / repeat(10, 1fr);
      grid-gap: 1px;
    `
    boardTwo.style.cssText = 
    `
      border: 1px solid black;
      background-color: cornflowerblue;
      width: 400px;
      height: 400px;
      display: grid;
      grid-template: repeat(10, 1fr) / repeat(10, 1fr);
      grid-gap: 1px;
    `
    render();
    
  });

  
}

// Event listeners
const boardTwo = document.getElementById("boardTwo");

boardTwo.addEventListener("click", (event) => {
  let position = event.target.value.split(",");
  playerTwo.game.receiveAttack(position);

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
    finish();
});
