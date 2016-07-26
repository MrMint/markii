var path = require('path');
var express = require('express');

var app = express();

app.use(express.static('static'));

app.get('/api/user', function(req, res) {
  const user = {
    username: 'Mr.Mint',
  };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(user));
});

app.get('/api/token', function(req, res) {
  const token = {
    token: 'asdfadfoweijfwq;oefin',
    expires_in: 30000,
  };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(token));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
