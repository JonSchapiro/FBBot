var Brain = function(){
  
  var _dictionary = this.getDictionary();
  var _map = this.getMap();

  return {
    dictionary: _dictionary,
    map: _map,
    match:this.match,
    constructMessage:this.constructMessage,
    determineRelevance:this.determineRelevance
   
  }

};

Brain.prototype.getDictionary = function(){
  var categories=["greeting","loyalty","nutrition","info","locations","realEstate","tellus","opening"]
  
  return {
    "hi":categories[categories.indexOf("greeting")],
    "hey":categories[categories.indexOf("greeting")],
    "yo":categories[categories.indexOf("greeting")],
    "card":categories[categories.indexOf("loyalty")],
    "meltcard":categories[categories.indexOf("loyalty")],
    "nutrition":categories[categories.indexOf("nutrition")],
    "information":categories[categories.indexOf("info")],
    "info":categories[categories.indexOf("info")]
  }
}

Brain.prototype.getMap = function() {
  return {
    "greeting":this.greet,
    "loyalty":this.loyalty,
    "nutrition":this.nutrition,
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
   relevantMessages = this.determineRelevance(messagesToSend)
   if (sendMessageCallback){
    sendMessageCallback(relevantMessages)
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
  return msg;
}

Brain.prototype.constructMessage = function(messages){
  var finalMessage = [];

  for (var i = 0; i < messages.length; i++){
   
    finalMessage.push(messages[i]);
  }
  
  return finalMessage;
};

Brain.prototype.determineRelevance = function(messages){
  var messagesCount = {};
  var relevantMessages = [];
  for (var i = 0; i < messages.length; i++){
    messagesCount[messages[i]] = messagesCount[messages[i]] + 1 || 1;
  }
  
  var relevanceStrength = 0; //message occurence
  var relevanceFunc; //message function
  for (func in messagesCount){
    //prioritize greeting
    if (func == "greeting"){
      relevantMessages.push(this.map[func]);
    }else {
      //find message function with highest occurence
      if (messagesCount[func] > relevanceStrength){
        relevanceStrength = messagesCount[func];
        relevanceFunc = this.map[func];
      }
    }
  }
  relevantMessages.push(relevanceFunc);
  return relevantMessages;
};

module.exports = Brain;