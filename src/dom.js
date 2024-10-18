export default class Dom {
  constructor(player, board) {
    self.player = player;
    self.board = board;
  }

  renderBoard() {
    const playerDiv = document.getElementById(`${self.board}`);
    while (playerDiv.firstChild) {
      playerDiv.removeChild(playerDiv.lastChild);
    }
    // For each value in each array of the matrix
    // make a box and fill it with a value
    self.player.game.matrix.forEach((array, yIndex) => {
      array.forEach((value, xIndex) => {
        const box = document.createElement("div");
        box.style.cssText = `
          background-color: lightblue;
          display: flex;
          align-items: center;
          justify-content: center;
        `;

        if (value == 'X') {
          box.textContent = value;
          box.style.cssText = `
            background-color: lightblue;
            font-size: bold;
            color: red;
            display: flex;
            align-items: center;
            justify-content: center;
          `;
        } else if (value == 1) {
          box.textContent = 'X';
        } else if (value != 0 && !self.player.isComputer) {
          box.textContent = value;
        }

        box.value = `${[yIndex, xIndex]}`;
        playerDiv.appendChild(box);
      });
    });
  }
}
