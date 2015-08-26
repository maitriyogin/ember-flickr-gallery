import Ember from 'ember';
import constants from '../constants';

export default Ember.Component.extend({
  ViewActionCreators: Ember.inject.service('view-action-creators'),
  actions :{
    goLeft(photo){
      this.get('ViewActionCreators').selectPhoto(photo, constants.PAGING.LEFT);
    },
    goRight(photo){
      this.get('ViewActionCreators').selectPhoto(photo, constants.PAGING.RIGHT);
    },
    toggleShare(){
      this.get('ViewActionCreators').showShare(!this.get('showShare'));
    }
  }
  // showStyle : function(){
//     return this.attrs.showShare ? "{display:'block'}" : "{display:'none'}";
//   }.property('photo','showShare')
});
