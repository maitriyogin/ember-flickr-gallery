import Ember from 'ember';

export default Ember.Component.extend({
  ViewActionCreators: Ember.inject.service('view-action-creators'),
  searchString:'',
  actions : {
    filterMe : function(filterText){
      this.get('ViewActionCreators').loadPhotos(filterText);
    }
  }
});
