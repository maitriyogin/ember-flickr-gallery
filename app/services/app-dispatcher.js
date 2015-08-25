import Ember from 'ember';
//import {Promise} from 'rsvp';


var _callbacks = [];
var _promises = [];

export default Ember.Service.extend({
  /**
   * Register a Store's callback so that it may be invoked by an action.
   * @param {function} callback The callback to be registered.
   * @return {number} The index of the callback within the _callbacks array.
   */
  register: function(callback) {
    _callbacks.push(callback);
    return _callbacks.length - 1; // index
  },

  /**
   * dispatch
   * @param  {object} payload The data from the action.
   */
  dispatch: function(payload) {
    // First create array of promises for callbacks to reference.
    var resolves = [];
    var rejects = [];
    _promises = _callbacks.map(function(_, i) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        resolves[i] = resolve;
        rejects[i] = reject;
      });
    });
    // Dispatch to callbacks and resolve/reject promises.
    _callbacks.forEach(function(callback, i) {
      // Callback can return an obj, to resolve, or a promise, to chain.
      // See waitFor() for why this might be useful.
      Ember.RSVP.Promise.resolve(callback(payload)).then(function() {
        resolves[i](payload);
      }, function() {
        rejects[i](new Error('Dispatcher callback unsuccessful'));
      });
    });
    _promises = [];
  },
  
  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.
   * @param  {object} action The data coming from the view.
   */ 
  handleViewAction: function(action) { 
    this.dispatch({ source: 'VIEW_ACTION', action: action });
  },
  
  /**
   * A bridge function between the server/proxy and the dispatcher, marking the action
   * as a server action.
   * @param  {object} action The data coming from the view.
   */ 
  handleServerAction: function(action) { 
    this.dispatch({ source: 'SERVER_ACTION', action: action });
  }
  
});
