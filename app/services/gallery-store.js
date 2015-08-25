import Ember from 'ember';
import constants from '../constants';

export default Ember.Service.extend({
  pubSub: Ember.inject.service('pub-sub'),
  AppDispatcher: Ember.inject.service('app-dispatcher'),
  _state : Ember.Object.create({
    photos: {},
    loaded: false,
    errorMessage : null,
    selectedPhoto : null,
    showShare : false,
    page : {
    	index : 0,
    	page : 1,
    	perpage : 6,
    	total : -1,
    	maxPages : 4,
    	totalPages : 0,
    	text : ''
    }
  }),
  
  init: function() {
    this.dispatchToken();
  },
    
  addChangeListener: function (fn) {
    this.get('pubSub').addListener(constants.CHANGE_EVENT, fn);
  },

  removeChangeListener: function (fn) {
    this.get('pubSub').removeListener(constants.CHANGE_EVENT, fn);
  },

  setState: function (newState, oldState) {
    if(arguments.length > 1){
      // convert the photos into 
      oldState.setProperties(newState);
      this.set('_state', oldState);
      this.get('pubSub').publish(constants.CHANGE_EVENT, this.get('_state'));
    }
  },
  
  copyPage : function(statePage, index, text, state){
  	var page = {};
  	page.page = statePage.page;
  	page.perpage = statePage.perpage;
  	page.total = Number(statePage.total);
  	page.index = index;
  	page.maxPages = state.page.maxPages;
  	page.text = text;
  	return page;
  },
  
  dispatchToken : function(){
    let self = this;
    
    return this.get('AppDispatcher').register( function (payload) {
        var { action } = payload;
        let state = self.get('_state');
        
        if (action.type === constants.ActionTypes.PHOTOS_LOADED) {	
          var photos = [];
          // ember doesn't like dealing with pojso but converts them to ember objects when needed
          // I'll convert them here to save further problems
          action.photos.photos.photo.forEach(function(photo){
            photos.push(Ember.Object.create(photo));
          });
          
          self.setState({
            loaded: true,
            photos: photos,
            errorMessage : null,
            selectedPhoto : photos[0],
            page : self.copyPage(action.photos.photos, state.page.index, action.text, state)
          }, state);
        }
        
        if (action.type === constants.ActionTypes.SELECT_PHOTO) {
           // this line is a bit crazy thanks to the twitter api .. although ..
          	var i = state.photos.indexOf(state.selectedPhoto);
          	if(action.direction != null){
          		// find element and go back or forward
          		var length = state.photos.length;
          		if(action.direction == constants.PAGING.LEFT){
          			i--;
          			if(i < 0){
          				i = length -1;
          			}
          		} else if(action.direction == constants.PAGING.RIGHT){
          			i++;
          			if(i >= length){
          				i = 0;
          			}
          		}
          		action.selectedPhoto = state.photos[i];
          	}
            self.setState({
              loaded: true,
              selectedPhoto: action.selectedPhoto,
              page : self.copyPage(state.page, i, state.page.text, state)
            }, state);
          }

          if (action.type === constants.ActionTypes.SHOW_SHARE) {  
            self.setState({showShare:action.showShare},state);
          }
          
      });
  }
  
});
