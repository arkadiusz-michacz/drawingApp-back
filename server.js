const { Console } = require('console');
const app = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors: {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
      }
});

let newestData;

io.on('connection', (socket)=>{
    console.log('User online');
    if(newestData !== undefined){
        console.log("Newestdata exists");
        socket.emit('canvas-data',newestData);
    }

    socket.on('canvas-data',(data)=>{
        socket.broadcast.emit('canvas-data',data);
        newestData = data;
    })
})



const server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port,()=>{
    console.log(`Server running on port: ${server_port}.`);
})