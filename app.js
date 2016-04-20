var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request')
var Brain = require('./brain')
var brain = new Brain();

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

var token = "EAADh4K49cCEBAA2oIG1NWwTWX2X2ZBvBXfkKlswzWCm5JEXZAjsG49Vmw83voc2VTDcxeYzr5oJWZAUEJLhrIqyW2qBYbou2ZCMTliZBQv4yUPMYsZB4xaVRi47LZALZCYZBAZBHLohZCTyPcmMtgKlHAe96ZB4BIgVbkm9ZAzKkvIsGMfQZDZD";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

//used to handle the webhook
app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log(text);
      brain.match(text,function(messagesToSend){
        for (var j = 0; j < messagesToSend.length; j++){
          sendTextMessage(sender, messagesToSend[j]());
        }
      })
      
    }
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Cruisin on port ', process.env.PORT || 8080);
});
