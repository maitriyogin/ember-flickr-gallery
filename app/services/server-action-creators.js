import Ember from 'ember';
import constants from '../constants';

export default Ember.Service.extend({
  AppDispatcher: Ember.inject.service('app-dispatcher'),
  loadedPhotos: function (photos, text) {
      this.get('AppDispatcher').handleServerAction({
        type: constants.ActionTypes.PHOTOS_LOADED,
        photos: photos,
        text : text
      });
    }
});
