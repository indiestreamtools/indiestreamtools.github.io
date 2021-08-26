function takeSnapshot() {
	__takeSnapshot(false)
	setTimeout(__takeSnapshot, 250);
	first = false;
}

function __takeSnapshot(notify = true) {
	var canvas = document.createElement('canvas');
	canvas.id     = "canvas";
	canvas.width  = 645;
	canvas.height = 770;

	var context=canvas.getContext('2d');

	var bg=new Image();
	bg.onload=function(){
		context.drawImage(this, 0, 0, canvas.width, canvas.height);
	};
	bg.src="https://indiestreamtools.github.io/resources/web/tierlist.png";

	let minX = 100;
	let maxX = 0;
	for (let d of document.getElementsByClassName("draggable")) {
		if (d.style.position != "absolute") continue;
		let thisX = Number(d.style.left.slice(0, -1));
		if (thisX > maxX) maxX = thisX;
		if (thisX < minX) minX = thisX;
	}
	if (minX == maxX) {
		maxX = minX + 1;
	}
	let newH = maxX - minX;

	let items = 0;

	for (let d of document.getElementsByClassName("draggable")) {
		if (d.style.position != "absolute") continue;
		let img = new Image();
		
		let thisP = Number(d.style.left.slice(0, -1));
		let newP = thisP - minX;
		let xpos = ((newP / newH) * (496 - 76)) + 137
		// 137 // 496
		let ypos = 770 * (Number(d.style.top.slice(0, -1)) / 80)
		img.onload = function() {
			let xw = 82, yh = 82;
			if (this.width > this.height) {
				yh *= this.height / this.width;
				ypos += (xw-yh)/2
			} else if (this.width < this.height) {
				xw *= this.width / this.height;
				xpos += (yh-xw)/2
			}
			context.drawImage(this, xpos, ypos, xw, yh)
			items -= 1;
			checkForCompletion();
		}
		let url = d.style.backgroundImage.slice(4, -1).replace(/"/g, "");
		items += 1;
		img.src = url;
	}

	function checkForCompletion() {
		if (items == 0) {
			makeBackgroundTransparent()
			drawTiers()
			items = -1; // prevent double exec
			setTimeout(function() {
				canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))
				// console.log("Clipped");
				if (notify) {
					
				}
			}, 250) // delay by 100ms I guess?
		}
	}

	context.wrapFillText = function (text, x, y, lineHeight, fitWidth) {
		fitWidth = fitWidth || 0;
		
		if (fitWidth <= 0) {
			this.fillText( text, x, y );
			return;
		}
		
		for (var idx = 1; idx <= text.length; idx++) {
			var str = text.substr(0, idx);
			if (this.measureText(str).width > fitWidth) {
				this.fillText( text.substr(0, idx-1), x, y - (lineHeight/2));
				this.wrapFillText(text.substr(idx-1), x, y + (lineHeight/2), lineHeight,  fitWidth);
				return;
			}
		}
		this.fillText( text, x, y );
	}

	function makeBackgroundTransparent() {
		let imgd = context.getImageData(0,0, 645, 770);
		for (var i=0; i < imgd.data.length; i+=4) {
			  // is this pixel the old rgb?
			if (imgd.data[i] == 17 &&
				imgd.data[i+1] == 17 &&
				imgd.data[i+2] == 17
				) { // set pixel transparent
				imgd.data[i]=0;
				imgd.data[i+1]=0;
				imgd.data[i+2]=0;
				imgd.data[i+3]=0;
			}
		}
		context.putImageData(imgd,0,0);
	}

	function drawTiers() {
		context.font = "bold 40px Helvetica";
		context.textAlign = "center";
		// 75 || +125
		let ofs = 88;
		for (let t of document.getElementsByClassName("tier-label")) {
			context.fillStyle = "#eeeeee7f";
			context.wrapFillText(t.textContent, 74, ofs-1, 40, 125);
			context.fillStyle = "#0000007f";
			context.wrapFillText(t.textContent, 76, ofs+1, 40, 125);
			context.fillStyle = "#222";
			context.wrapFillText(t.textContent, 75, ofs, 40, 125);
			ofs += 125;
		}	
	}
}