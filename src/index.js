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
  console.log(playerOne.game.matrix);
  render();
  if (playerTwo.game.allSunkOrNot()) {
    alert("game over");
  }
});
