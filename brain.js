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
  var categories=["greeting","loyalty"]
  return {
    "hi":categories[0],
    "yo":categories[0],
    "card":categories[1]
  }
}

Brain.prototype.getMap = function() {
  return {
    "greeting":this.greet,
    "loyalty":this.loyalty
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
  var msg = "Hey there!";
  return msg;
};

Brain.prototype.loyalty = function(){
  var msg = "Melt Card Info Ya!";
  return msg;
}

Brain.prototype.constructMessage = function(messages){
  //remove duplicates
  var finalMessage = [];
  for (var i = 0; i < messages.length; i++){
    finalMessage.push(this.map[messages[i]]);
  }
  
  return finalMessage;
};

module.exports = Brain;