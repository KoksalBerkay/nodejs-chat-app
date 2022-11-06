module.exports = function (io) {
  var app = require("express");
  var router = app.Router();
  io.on("connect", function (socket) {
    console.log("New Connection");
    socket.send(
      JSON.stringify({
        type: "serverMessage",
        message: "Welcome to the chat room!",
        sender: socket.id,
      })
    );
    socket.on("message", function (message) {
      message = JSON.parse(message);
      if (message.type == "userMessage") {
        io.sockets.send(JSON.stringify(message));
        message.type = "myMessage";
      }
    });
  });
};
