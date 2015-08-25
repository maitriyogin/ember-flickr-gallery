import Ember from 'ember';
import photoHelper from '../utils/photo-util';

export default Ember.Component.extend({
  ViewActionCreators: Ember.inject.service('view-action-creators'),
  classNameBindings :['photoStyle'],
  actions :{
    selectMe : function(photo){
      this.get('ViewActionCreators').selectPhoto(photo);
    }
  },
  photoStyle : function(){
    let size = this.get('size'), 
        count = this.get('count'), 
        active = this.get('active'), 
        rowcount = this.get('rowcount');
    let style = `photo-${size}`;
    if(count !== undefined){
      style += count === 0 ? ' start':'';
      style += count === rowcount-1 ? ' end':'';
    }
    if(active !== undefined){
      style += active ? ' active' : '';
    }
      return style + ' ' + count;
  }.property('count', 'active', 'rowcount'),

  photoSrc : function(){
    let photo = this.get('photo');
    let size = this.get('size');
    let src = '';
    if(photo){
      src = photoHelper.imageUrlFromPhoto(photo, size);
    }
    return src;
  }.property('photo', 'size')
  
});
