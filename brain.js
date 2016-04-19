var Brain = function(){
  
  var _dictionary = this.getDictionary();
  var _map = this.getMap();

  return {
    dictionary: _dictionary,
    map: _map,
    match:this.match,
    constructMessage:this.constructMessage
   
  }

};

Brain.prototype.getDictionary = function(){
  var categories=["greeting","loyalty","nutrition","info"]
  
  return {
    "hi":categories[0],
    "hey":categories[0],
    "yo":categories[0],
    "card":categories[1],
    "nutrition":categories[2],
    "information":categories[3],
    "info":categories[3]
  }
}

Brain.prototype.getMap = function() {
  return {
    "greeting":this.greet,
    "loyalty":this.loyalty,
    "nutrition":this.nutrition
    "info":this.information
  }
}

Brain.prototype.match = function(message,sendMessageCallback){
  var messagesToSend = [];

  if (message.length > 0){
    var words = message.split(' ');
    for (var i = 0; i < words.length; i++){
      var action = this.dictionary[words[i]];
      if (action){
        messagesToSend.push(action);
      }
    }
  }
   messagesToSend = this.constructMessage(messagesToSend);
   if (sendMessageCallback){
    sendMessageCallback(messagesToSend)
   }
   
};

Brain.prototype.greet = function(){
  var msg = "Hey there! :)";
  return msg;
};

Brain.prototype.loyalty = function(){
  var msg = "You should definitely get a melt card. You'll get some free stuff!";
  return msg;
}

Brain.prototype.nutrition = function(){
  var msg = "Nutrition is what keeps us alive!";
  return msg;
}

Brain.prototype.information = function(){
  var msg = "If you want more information, make sure to visit our FAQ section."
}

Brain.prototype.constructMessage = function(messages){
  var finalMessage = [];

  for (var i = 0; i < messages.length; i++){
    finalMessage.push(this.map[messages[i]]);
  }
  
  return finalMessage;
};

module.exports = Brain;