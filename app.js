
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//used to verify the webhook
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'verify_token') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

//used to handle the webhook
app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
      console.log(text);
    }
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port ', process.env.PORT || 8080);
});
