/* globals document, resizeLiveBackground */

document.addEventListener("scroll", function() {
	var header = document.getElementsByClassName("header")[0];
	var headerPlaceholder = document.getElementsByClassName("header-placeholder")[0];
	
	if(document.body.scrollTop > header.getBoundingClientRect().height / 2 && header.className.indexOf("sticky") == -1){
		header.className = header.className.replace(/(?: |)expanded/g, "");
		header.className += " sticky";
		
		headerPlaceholder.className = headerPlaceholder.className.replace(/(?: |)hidden/g, "");
		headerPlaceholder.className += " shown";
		
		resizeLiveBackground();
	}
	else if(document.body.scrollTop < 80 && header.className.indexOf("expanded") == -1){
		header.className = header.className.replace(/(?: |)sticky/g, "");
		header.className += " expanded";
		
		headerPlaceholder.className = headerPlaceholder.className.replace(/(?: |)shown/g, "");
		headerPlaceholder.className += " hidden";
		
		resizeLiveBackground();
	}
});