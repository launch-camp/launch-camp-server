function setContentHeight() {	
	var viewportHeight = window.innerHeight;	
	document.getElementById("section-1").style.height = viewportHeight;		
	document.getElementById("section-2").style.height = viewportHeight;

	var sections = document.getElementsByClassName("section");
	for (i = 0; i < sections.length; i ++)  {		
		sections[i].style.visibility = "visible";
	}
}

window.onresize = setContentHeight;
window.onload = setContentHeight;
