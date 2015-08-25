import Ember from 'ember';

var topics = {};
var hOP = topics.hasOwnProperty;
  
export default Ember.Service.extend({
  addListener: function(topic, listener) {
    // Create the topic's object if not yet created
    if( !hOP.call(topics, topic) ){
       topics[topic] = [];
    }

    // Add the listener to queue
    var index = topics[topic].push(listener) -1;

    // Provide handle back for removal of topic
    return {
      remove: function() {
        delete topics[topic][index];
      }
    };
  },
  removeListener: function(topic, fn){
    let i =  topics.findIndex(function(element){
      if(element === fn){
        return true;
      } else {
        return false;
      }
    });
    delete topics[topic][i];
  },
  publish: function(topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if(!hOP.call(topics, topic)){ 
      return;
    }

    // Cycle through topics queue, fire!
    topics[topic].forEach(function(item) {
    		item(info !== undefined ? info : {});
    });
  }
      
});
