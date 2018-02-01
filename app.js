var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { path: '/_socket' });

app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  function sendTime() {
    io.emit('time', {
      time: new Date().toString()
    });
  }

  socket.on('ready', function() {
    sendTime();
    setInterval(sendTime, 1000);
  });
});

var port = process.env.PORT || 8080;
server.listen(port);
