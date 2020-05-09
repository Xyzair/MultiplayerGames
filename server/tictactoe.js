class TicTacToe {
  constructor(p1, p2) {
    this._players = [p1, p2];
    this._grid = new Array(3);

    for (var i = 0; i < 3; i++) {
      this._grid[i] = [null, null, null];
    }

    this._sendToPlayers("Tic Tac Toe START!");
  }

  _sendToPlayer(playerIndex, msg) {
    this._players[playerIndex].emit("message", msg);
  }

  _sendToPlayers(msg) {
    this._players.forEach((p) => p.emit("message", msg));
  }

  //turn is expected to be the array coords of the move
  _onTurn(playerIndex, turn) {
    if (this._grid[turn[0]][turn[1]] === null) {
      if (player === 0) {
        this._grid[turn[0]][turn[1]] == "X";
      } else {
        this._grid[turn[0]][turn[1]] == "O";
      }
    }
  }
}

module.exports = TicTacToe;
