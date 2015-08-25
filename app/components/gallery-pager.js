import Ember from 'ember';
import pagerHelper from '../utils/pager-util';

export default Ember.Component.extend({
  ViewActionCreators: Ember.inject.service('view-action-creators'),
  tagName: 'nav',
  classNames:['pagerContainer'],
  pages : [],
  actions:{
    page:function(page, pageNo){
        page.page = pageNo;
        this.get('ViewActionCreators').loadPhotos( page.text, page.perpage, page.page);
    },
    pageLeft:function(page){
      page = pagerHelper.pageLeft(page);
      this.get('ViewActionCreators').loadPhotos( page.text, page.perpage, page.page);
    },
    pageRight:function(page){
      page = pagerHelper.pageRight(page);
      this.get('ViewActionCreators').loadPhotos( page.text, page.perpage, page.page);
    },
    pageStart:function(page){
      page = pagerHelper.pageStart(page);
      this.get('ViewActionCreators').loadPhotos( page.text, page.perpage, page.page);
    },
    pageEnd:function(page){
      page = pagerHelper.pageEnd(page);
      this.get('ViewActionCreators').loadPhotos( page.text, page.perpage, page.page);
    }
  },
  didReceiveAttrs : function(){
    let pages = [];
    let page = this.get('page');
    
    if(!page) return;
    
    var [start, end] = pagerHelper.pagePosition(page);

    for (let i=start; i<end; i++) {
        var key = `pageNo-${i}`;
        var style = 'goToPage';
        style += i==page.page?' active':'';
        pages.push({style:style, index:i});
    }
    this.set('pages', pages);
  }
});
