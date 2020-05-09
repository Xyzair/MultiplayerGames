class TicTacToe {
  constructor(p1, p2) {
    this._players = [p1, p2];
    this._grid = new Array(3);
    this._turn = 0;

    for (let i = 0; i < 3; i++) {
      this._grid[i] = [null, null, null];
    }

    this._sendToPlayers("Tic Tac Toe START!");

    this._players.forEach((player, idx) => {
      player.on("turn", (turn) => {
        this._onTurn(idx, turn);
        console.log("player: " + idx + " made move: " + turn);
      });
    });
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

  //turn is expected to be the array coords of the move
  _onTurn(playerIndex, turn) {
    //if it's your turn
    if (this._turn === playerIndex) {
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
        this._turn = (playerIndex + 1) % 2;
      }
    } else {
      this._sendToPlayer(playerIndex, "It is not your turn");
      console.log("player: " + playerIndex + " not your turn");
    }
  }
}

module.exports = TicTacToe;
