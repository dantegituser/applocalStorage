const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on('getItems', (items) => {
    io.emit("passItems", items);
    });

});

http.listen('3000', () => {
  console.log('escuchando puerto 3000');
});
