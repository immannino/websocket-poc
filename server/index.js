var app = require('express')();
var http = require('http').Server(app);
var request = require('request');
var io = require('socket.io')(http);
// var btoa = require('btoa');

var client_id = '';
var client_secret = '';
var authMap = {
  accessToken: "",
  tokenType: "",
  expiration: 0
};
var count = 0;

var queue = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log("person connected");
    
    // !authMap.accessToken.length ? authenticate() : console.log('no auth needed');
    // streamAudio();
    socket.on('chat message', function(msg){
        console.log(`Message: ${msg}`);
        io.emit('chat message', msg);
    });

    socket.on('puppies', () => {
      getPuppies();
    })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function streamAudio() {
  io.emit('puppies', 1);
  setInterval(streamAudio, 5000);
}

function authenticate() {
  let credentials = 'YWEyMzFmYTViOWFmNGY4YTg3MzFkM2IyNDRlOTA0ZjI6Y2Q4MTcxOTk4ODhiNGQ2MzkxZDk0MzZmZTczODA4MDM';
  let url = 'https://accounts.spotify.com/api/token';
  let options = {
    url: url,
    method: 'POST',
    headers: {
        'Authorization': `Basic ${credentials}`
    },
    json: true,
    form: {
      'grant_type':'client_credentials'
    }
  };

  request(options, (error, response, body) => {
    if (!error) {
      authMap.accessToken = body.access_token;
      authMap.expiration = body.expires_in;
      authMap.tokenType = body.tokenType;
      console.log(body);
    }
  });
}

function getPuppies() {
  let url = "https://dog.ceo/api/breeds/image/random"
  let options = {
    url: url,
    method: 'GET',
    json: true
  }

  request(options, (error, response, body) => {
    io.emit('puppies', body.message);
    console.log("fuck");
    setInterval(getPuppies, 1000);
  });
}