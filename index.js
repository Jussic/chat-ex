var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// This goes through everyone connected on the server and 
sends out msg to them 

io.emit('some event', { for: 'everyone' })

io.on('connection', function(socket) {
console.log('user connected');
socket.broadcast.emit('hi');
socket.on('chat message', function(msg) {
io.emit('chat message', msg);
console.log('user disconnected');
}); 
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

