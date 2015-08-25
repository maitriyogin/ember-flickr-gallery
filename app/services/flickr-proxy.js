import Ember from 'ember';
import constants from '../constants';

var _searchApi = function(api){
	return `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api.key}&user_id=${api.userId}&per_page=${api.perPage}&page=${api.page}&text=${api.text}&format=json&jsoncallback=?`;
};

export default Ember.Service.extend({
  ServerActionCreators: Ember.inject.service('server-action-creators'),
  loadPhotos : function(text = '', perPage = 6, page = 1){
  		var api = Ember.Object.create({text:text, perPage:perPage, page:page});
  		console.log(JSON.stringify(constants.FLICKR));
      api.setProperties(constants.FLICKR);
  		let searchApi = _searchApi(api);
      let ServerActionCreators = this.get('ServerActionCreators');
      Ember.$.ajax({
      	      url: searchApi,
              dataType:'json',
      	      cache: false,
      	      success: function(data) {
                ServerActionCreators.loadedPhotos(data, text);
      	      },
      	      error: function(xhr, status, err) {
      	        console.log(api, status, err.toString());
      	      }
      	    });
  	}
});
