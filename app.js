
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.post('/webhook', function (req,res){
  console.log('Webhook received!')
  res.status(200);
  res.send('Message Received!')
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port ', process.env.PORT || 8080);
});
