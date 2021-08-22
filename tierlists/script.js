
var g_tpos = 110;
var g_grid = [0.68, 3.25, 6.25, 10, 13.7, 16.25, 19.25, 22.8, 26.6, 29.25, 32.25, 35.6, 39.68, 42.5, 45.2, 49, 52.8, 55.8, 58.35, 62, 65.25, 69, 71.5, 79, 74];
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
	tpos = (elmnt.offsetTop - pos2);
	if (tpos < 0) tpos = 0;
	lpos = (elmnt.offsetLeft - pos1);
	if (lpos < 0) lpos = 0;
	
	tperc = tpos / document.documentElement.clientHeight;
	lperc = lpos / document.documentElement.clientWidth;
	
	tperc = (tperc * 100);
	
	g_tpos = tperc;
	
    elmnt.style.top = (tperc) + "%";
    elmnt.style.left = (lperc * 100) + "%";
	elmnt.style.position = "absolute";
	
	validDrag = tperc < 0.74;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
	
	let max = g_grid[g_grid.length-1];
	let min = g_grid[0];
	
	if (g_tpos >= max) {
		elmnt.style.left = elmnt.style.top = elmnt.style.position = "";
	} else {
		for (let i = 0; i < g_grid.length; i++) {
			let t = g_grid[i+1];
			if (g_tpos > t) continue;
			let b = g_grid[i];
			let bd = g_tpos - b;
			let td = t - g_tpos;
			
			if (bd > td) g_tpos = t;
			else g_tpos = b
			break;
		}
		/*
		if (g_tpos < 2) g_tpos = 0.8;
		else if (g_tpos < 5) g_tpos = 3.25;
		else if (g_tpos < 8) g_tpos = 6.25;
		else if (g_tpos < 11) g_tpos = 10;
		else if (g_tpos < 14) g_tpos = 13.5;
		else if (g_tpos < 17) g_tpos = 17;
		else if (g_tpos < 20) g_tpos = 19.5;
		else if (g_tpos < 23) g_tpos = 24;
		else if (g_tpos < 26) g_tpos = 24.25;
		*/
		if (g_tpos >= max) {
		elmnt.style.left = elmnt.style.top = elmnt.style.position = "";
		} else {
			elmnt.style.top = g_tpos + "%";
		}
	}
	
  }
}

document.addEventListener("DOMContentLoaded", function(){
	for (let e of document.getElementById("draggable-items").children) {
		dragElement(e);
	}
	let test = document.getElementById("tier-container")
});