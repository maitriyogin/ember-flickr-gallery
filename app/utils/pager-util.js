export default {
  pageLeft(page){
  	page.page --;
  	if(page.page <= 0) {
  		page.page = 1;
  	}
  	return page;
  },
  pageRight(page){
  	page.page ++;
  	var maxPages = Math.ceil(page.total / page.perpage);
  	if(page.page > maxPages) {
  		page.page = maxPages;
  	}
  	return page;
  },
  pageStart(page){
  	page.page = 1;
  	return page;
  },
  pageEnd(page){
  	page.page = Math.ceil(page.total / page.perpage);
  	return page;
  },
  pagePosition(page){
  	var totalPages = Math.ceil(page.total / page.perpage);
  	var start = page.page;
  	var end = page.maxPages + page.page;
  	if(end > totalPages +1){
  		end = totalPages+1;
  		var maxPages = totalPages < page.maxPages ? totalPages : page.maxPages;
  		start = end - maxPages;
  	}
  	page.totalPages = totalPages;
  	return [start, end];
  }
};
