import Player from "./player";
import Dom from "./dom";
import "./style.css";

const playerOne = new Player("playerOne", false);

const playerTwo = new Player("computer", true);

const randomPlace = function randomlyPlacesShips(player) {
  while (player.game.yetToBeSet.size > 0) {
    const set = player.game.yetToBeSet.values();
    for (const ship of set) {
      const coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      const orientation = true? Math.random() > 0.5: false;
      player.game.setShipPos(ship, [coordinates, orientation])
    }
  }
}

randomPlace(playerOne)
randomPlace(playerTwo)
console.log(playerTwo.game.matrix);

//Render things

const render = function refreshBothGameboards() {
  const renderOne = new Dom(playerOne, "boardOne");
  renderOne.renderBoard();

  const renderTwo = new Dom(playerTwo, "boardTwo");
  renderTwo.renderBoard();
};

render();

const finish = function endGameOnAllShipSunk() {
  if (playerOne.game.allSunkOrNot()) {
    alert('Gameover!');
  } else {
    alert('You won!');
  }
  if(confirm('New Game?')) {
    //new game
  }
}

// Event listeners
const boardTwo = document.getElementById("boardTwo");

boardTwo.addEventListener("click", (event) => {
  const position = event.target.value.split(",");
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
