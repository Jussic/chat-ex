var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Blocks HTML characters (security equivalent to htmlentities in PHP)
    fs = require('fs');

// Loading the page index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


// This goes through everyone connected on the server and 
// sends out msg to server 

io.emit('some event', { for: 'everyone' })

io.on('connection', function(socket) {
console.log('user connected');
socket.broadcast.emit('hi');
socket.on('chat message', function(msg) {
io.emit('chat message', msg);
console.log('user disconnected');
}); 

io.sockets.on('connection', function (socket, username) {
    // When the username is received it’s stored as a session variable and informs the other people
    socket.on('new_client', function(username) {
        username = ent.encode(username);
        socket.username = username;
        socket.broadcast.emit('new_client', username);
    });

    // When a message is received, get client’s username and sent to the others connected
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {username: socket.username, message: message});
    }); 
});

server.listen(8080);
console.log('listening on *:8080');


