var photoUtil = {
	imageUrlFromPhoto : function(photo, size){
		return `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
	}
};

export default photoUtil;
