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
const https = require('https');
const express = require('express');
var cors = require('cors')
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3001;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
app.use(cors());

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.get('/', (req, res) => {
    res.json({
      msg: 'hello from my coin'
    });
});


app.use('/api/login', require('./utils/mnemonic'));

io.on('connection', (socket) => {
    //Connect
    console.log("A new user just connected");

    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to the web app!',
        createdAt: new Date().getTime()
    });
    
    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New User Joined!',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage',(message) => {
        console.log('createMessage', message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    //Disconnect
    socket.on('disconnect', () => {
        console.log("A new user just disconnected");
    });
});

////////////////////////////
//           ERROR
////////////////////////////
app.use((req, res, next) => {
    res.status(404).send('NOT FOUND');
});
  
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('View error log on console.');
});
  


server.listen(port, ()=>{
console.log(`Server is up on port ${port}`);
})