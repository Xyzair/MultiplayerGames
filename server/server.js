const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

//create basic web page server
const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (sock) => {
  console.log('Someone has connected');
  sock.on('disconnect', () => {
    console.log('someone has disconnected')
  });

  sock.emit("message", "You are connected");

  //receive message from client and send to all clients
  sock.on('message', (text) => {
    console.log(text);
    io.emit('message', text);
  });

});

server.on("error", (err) => {
  console.log("Server Error:", err);
});

server.listen(8000, () => {
  console.log("Server starting on 8000");
});
