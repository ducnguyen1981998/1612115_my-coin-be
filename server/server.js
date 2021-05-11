// const path= require('path');
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io')


// // console.log(__dirname+ "/../public");
// const publicPath = path.join(__dirname, '/../public');
// const port = process.env.PORT || 3000;
// let app = express();
// let server = http.createServer(app);
// let io = socketIO(server);

// app.use(express.static(publicPath));



const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

//Connect
io.on('connection', (socket) => {
    console.log("A new user just connected");
});

//Disconnect
socket.on('disconnect', () => {
    console.log("A new user just disconnected");
});
  
server.listen(port, ()=>{
console.log(`Server is up on port ${port}`);
})