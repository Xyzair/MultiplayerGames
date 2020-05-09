class TicTacToe {
  constructor(p1, p2) {
    this._players = [p1, p2];
    this._grid = new Array(3);
    this._turn = 0;
    this._winner = null;

    for (let i = 0; i < 3; i++) {
      this._grid[i] = [null, null, null];
    }

    this._players.forEach((player, idx) => {
      player.on("turn", (turn) => {
        this._onTurn(idx, turn);
        console.log("player: " + idx + " made move: " + turn);
      });
    });

    this._sendToPlayers("Tic Tac Toe START!");
  }

  _sendToPlayer(playerIndex, msg) {
    this._players[playerIndex].emit("message", msg);
  }

  _sendToPlayers(msg) {
    this._players.forEach((p) => p.emit("message", msg));
  }

  _sendUpdateToPlayers() {
    this._players.forEach((p) => p.emit("update", this._grid));
  }

  _sendWinMessage(winnerIndex) {
    this._sendToPlayers("Player " + (winnerIndex + 1) + " wins!");
    this._winner = this._players[winnerIndex];
    console.log("Player " + (winnerIndex + 1) + " wins!");
  }

  //turn is expected to be the array coords of the move
  _onTurn(playerIndex, turn) {
    //if it's your turn
    if (this._winner === null && this._turn === playerIndex) {
      if (this._grid[turn[0]][turn[1]] === null) {
        if (playerIndex === 0) {
          this._grid[turn[0]][turn[1]] = "X";
          this._sendToPlayer(playerIndex, `X placed at ${turn[0]}, ${turn[1]}`);
          this._sendUpdateToPlayers();
        } else {
          this._grid[turn[0]][turn[1]] = "O";
          this._sendToPlayer(playerIndex, `O placed at ${turn[0]}, ${turn[1]}`);
          this._sendUpdateToPlayers();
        }
        this._checkGameOver();
        this._turn = (playerIndex + 1) % 2;
      }
    } else {
      this._sendToPlayer(playerIndex, "It is not your turn");
      console.log("player: " + playerIndex + " not your turn");
    }
  }

  _checkGameOver() {
    const grid = this._grid;

    //Check all the rows for a match
    if (
      (grid[0][0] === "X" && grid[0][1] === "X" && grid[0][2] === "X") ||
      (grid[1][0] === "X" && grid[1][1] === "X" && grid[1][2] === "X") ||
      (grid[2][0] === "X" && grid[2][1] === "X" && grid[2][2] === "X")
    ) {
      this._sendWinMessage(0);
    } else if (
      (grid[0][0] === "O" && grid[0][1] === "O" && grid[0][2] === "O") ||
      (grid[1][0] === "O" && grid[1][1] === "O" && grid[1][2] === "O") ||
      (grid[2][0] === "O" && grid[2][1] === "O" && grid[2][2] === "O")
    ) {
      this._sendWinMessage(1);

      //Check Columns for a match
    } else if (
      (grid[0][0] === "X" && grid[1][0] === "X" && grid[2][0] === "X") ||
      (grid[0][1] === "X" && grid[1][1] === "X" && grid[2][1] === "X") ||
      (grid[0][2] === "X" && grid[1][2] === "X" && grid[2][2] === "X")
    ) {
      this._sendWinMessage(0);
    } else if (
      (grid[0][0] === "O" && grid[1][0] === "O" && grid[2][0] === "O") ||
      (grid[0][1] === "O" && grid[1][1] === "O" && grid[2][1] === "O") ||
      (grid[0][2] === "O" && grid[1][2] === "O" && grid[2][2] === "O")
    ) {
      this._sendWinMessage(1);

      //Check the diagonals
    } else if (
      (grid[0][0] === "X" && grid[1][1] === "X" && grid[2][2] === "X") ||
      (grid[0][2] === "X" && grid[1][1] === "X" && grid[2][0] === "X")
    ) {
      this._sendWinMessage(0);
    } else if (
      (grid[0][0] === "O" && grid[1][1] === "O" && grid[2][2] === "O") ||
      (grid[0][2] === "O" && grid[1][1] === "O" && grid[2][0] === "O")
    ) {
      this._sendWinMessage(1);
    }
  }
}

module.exports = TicTacToe;
