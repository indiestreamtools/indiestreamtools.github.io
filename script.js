var validDrag = false;
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
	
    elmnt.style.top = (tperc * 100) + "%";
    elmnt.style.left = (lperc * 100) + "%";
	elmnt.style.position = "absolute";
	
	validDrag = tperc < 0.74;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
	if (validDrag == false) {
		elmnt.style.left = elmnt.style.top = elmnt.style.position = "";
	}
  }
}

document.addEventListener("DOMContentLoaded", function(){
	for (let e of document.getElementById("draggable-items").children) {
		dragElement(e);
	}
	let test = document.getElementById("tier-container")
});