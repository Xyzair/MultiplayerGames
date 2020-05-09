const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const TicTacToe = require("./tictactoe");

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

//create basic web page server
const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

//Handle logic for clients
io.on("connection", (sock) => {
  //Connecting outputs
  console.log("Someone has connected");
  sock.emit("message", "You are connected");

  sock.on("disconnect", () => {
    console.log("someone has disconnected");
  });

  //Let's start a game.
  if (waitingPlayer) {
    new TicTacToe(waitingPlayer, sock);
    waitingPlayer = null;
  } else {
    waitingPlayer = sock;
    waitingPlayer.emit("message", "Waiting for an opponent");
  }

  //receive message from client and send to all clients
  sock.on("message", (text) => {
    console.log("msg:" + text);
    io.emit("message", text);
  });
});

server.on("error", (err) => {
  console.log("Server Error:", err);
});

server.listen(8000, () => {
  console.log("Server starting on 8000");
});
