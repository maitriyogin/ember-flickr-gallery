import Ember from 'ember';
import constants from '../constants';

export default Ember.Service.extend({
  AppDispatcher: Ember.inject.service('app-dispatcher'),
  FlickrProxy: Ember.inject.service('flickr-proxy'),
  loadPhotos: function(text = '', perpage = 8, page = 1) {
    this.get('AppDispatcher').handleViewAction({
      type: constants.ActionTypes.LOAD_PHOTOS,
      text: text,
      perPage: perpage,
      page: page
    });
    this.get('FlickrProxy').loadPhotos(text, perpage, page);
  },
  selectPhoto: function (photo, direction = null) {
      this.get('AppDispatcher').handleViewAction({
        type: constants.ActionTypes.SELECT_PHOTO,
        selectedPhoto : photo,
        direction : direction
      });
    },
    showShare: function(show){
      this.get('AppDispatcher').handleViewAction({
        type: constants.ActionTypes.SHOW_SHARE,
        showShare : show
      });
    }
});
