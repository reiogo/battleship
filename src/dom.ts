export default class Dom {
    player;
    board;
  constructor(player, board) {
    this.player = player;
    this.board = board;
  }

  renderBoard() {
    const playerDiv = document.getElementById(`${this.board}`);
    while (playerDiv.firstChild) {
      playerDiv.removeChild(playerDiv.lastChild);
    }
    // For each value in each array of the matrix
    // make a box and fill it with a value
    this.player.game.matrix.forEach((array, yIndex) => {
      array.forEach((value, xIndex) => {
        const box = document.createElement("div");
        box.style.cssText = `
          background-color: lightblue;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: min(1em, 3vw);
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
            font-size: min(1em, 3vw);
          `;
        } else if (value == 1) {
          box.textContent = 'X';
        } else if (value != 0 && !this.player.isComputer) {
          box.textContent = value;
        }

        box.setAttribute('data-value', `${yIndex}, ${xIndex}`);
        playerDiv.appendChild(box);
      });
    });
  }
}
