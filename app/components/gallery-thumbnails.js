import Ember from 'ember';
import constants from '../constants';

export default Ember.Component.extend({
  size : 'm',
  dphotos : function(){
    let dphotos = [];
    let photos = this.get('photos');
    let selectedPhoto = this.get('selectedPhoto');
    if(photos && photos.length > 0){
      let count = 0;
      
      let rowcount = photos && photos.length < constants.ROWCOUNT ? photos.length : constants.ROWCOUNT;
      photos.map(function(photo) {
          
          count = count == rowcount ? 0 : count;
          var active = selectedPhoto != null && photo.id === selectedPhoto.id;

          photo.set('active', active);
          photo.set('count', count);
          photo.set('rowcount',rowcount);
          
          count ++;
          
      }, this);
    }
    return photos;
  }.property('photos', 'selectedPhoto')
  
});
