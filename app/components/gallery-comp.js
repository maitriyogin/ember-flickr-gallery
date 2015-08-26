import Ember from 'ember';

export default Ember.Component.extend({
  GalleryStore: Ember.inject.service('gallery-store'),
  ViewActionCreators: Ember.inject.service('view-action-creators'),
  classNames: ['container'],
  state : {},
  
  handleChange: function(newState){
    this.set('state', newState);
  },
  willInsertElement : function(){
    // subscribe change events on the PhotoStore 
    this.get('GalleryStore').addChangeListener(this.handleChange.bind(this));
    // load all photos
    this.get('ViewActionCreators').loadPhotos('', this.state.perPage, this.state.page);
  },
  willDestroyElement : function(){
    this.get('GalleryStore').removeChangeListener(this.handleChange);
  },
  willUpdate : function(){
    //console.log('will update with new state' + JSON.stringify(this.get('state'), null, 2));
  },
  
  
  // illustrates actions up in that we'll pass this action down into the header and the into the search ..
  actions : {
    filterMe : function(filterText){
      this.get('ViewActionCreators').loadPhotos(filterText);
    }
  }
  
  
});
