var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
var sharedHighScore = 0;
io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  // socket.on('score_update', function(data){
  //   console.log(data);
  //   socket.emit('news', {got: 'data'});
  // });
  socket.on('set high score', function(score){
    //console.log(score['score']);
    if (score['score'] > sharedHighScore){
      sharedHighScore = score['score'];
      socket.set('highScore', sharedHighScore, function(){});  
    }
  });
  socket.on('get high score', function(){
    console.log(sharedHighScore);
  });
});