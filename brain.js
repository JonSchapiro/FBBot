var Dictionary = require('./dictionary');
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
  
  return Dictionary;
};

Brain.prototype.getMap = function() {
  return {
    "greeting":this.greet,
    "loyalty":this.loyalty,
    "nutrition":this.nutrition,
    "info":this.information,
    "locations":this.locations,
    "realEstate":this.realEstate,
    "tellus":this.tellus,
    "opening":this.opening,
    "employment":this.employment,
    "default":this.default
  }
};

Brain.prototype.match = function(message,sendMessageCallback){
  var messagesToSend = [];

  if (message.length > 0){
    var words = message.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').toLowerCase().split(' ');

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
  var msg = "Hey there! Thanks for expressing interest in a Melt Card. To sign up, please visit: https://themelt.com/meltcard";
  return msg;
};

Brain.prototype.nutrition = function(){
  var msg = "Thank you for your interest in The Melt! Check out our nutrition facts at https://themelt.com/nutrition";
  return msg;
};

Brain.prototype.information = function(){
  var msg = " Hi there! If you want more information about The Melt , make sure to visit our FAQ section. https://themelt.com/faq";
  return msg;
};

Brain.prototype.locations = function(){
  var msg = "Hi there, we have locations in Northern and Southern California + Colorado. Check out the best location near you: https://themelt.com/locations/all";
  return msg;
};

Brain.prototype.realEstate = function(){
  var msg = "Thank you for your interest in The Melt. At this time, all stores are company owned. Feel free to reach out with any additional questions you may have. Cheers.";
  return msg;
};

Brain.prototype.tellus = function(){
  var msg = "I’m so sorry for your less than happy experience at The Melt. I will immediately notify our Operations team so we can be better. Can you kindly share your mailing address? I’d love to make it up to you by sending a few gift cards your way.";
  return msg;
};

Brain.prototype.opening = function(){
  var msg = "Hi there! For more information about store openings, check out: https://themelt.com/locations/all";
  return msg;
};

Brain.prototype.employment = function(){
  var msg = "Thanks for inquiring about employment at The Melt! Please refer to the job section of our website for more information. https://themelt.com/jobs";
  return msg;
};

Brain.prototype.default = function(){
  var msg = "Thanks for reaching out to us! \nEnter one of the following words to learn more: \n1) General Information\n2) Melt Card\n3) Locations\n4) Nutrition \n5) Store Openings \n6) Franchise Opportunities \n7) Catering \n8) Negative Experience";
  return msg;
};

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
  var relevanceFunc = null; //message function
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
 if (relevanceFunc == null){
  relevantMessages.push(this.map["default"])
 } else {
  relevantMessages.push(relevanceFunc);
 }
  
  return relevantMessages;
};

module.exports = Brain;