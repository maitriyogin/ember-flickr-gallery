export default {
  
  FLICKR : {
    key : 'ff639636f37f3df7ba22db16a450d211',
    userId : '133394042@N02',
    secret : '9b5e5f7aeee109a6'
  },

  PHOTOSIZE : {
    THUMBNAIL : 'm',
    LARGE : 'z'
  },

  ROWCOUNT : 4,

  ENTER_KEY : 13,

  PAGING: {
    PAGE: 'PAGE',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    START: 'START',
    END: 'END'
  },

  ActionTypes: {
    //------
    LOAD_PHOTOS:'LOAD_PHOTOS',
    PHOTOS_LOADED:'PHOTOS_LOADED',
    SELECT_PHOTO:'SELECT_PHOTO',
    SHOW_SHARE:'SHOW_SHARE'
  },

  PayloadSources: {
    SERVER_ACTION: 'SERVER_ACTION',
    VIEW_ACTION: 'VIEW_ACTION'
  },
  
  // --- events
  CHANGE_EVENT: 'change'
};
