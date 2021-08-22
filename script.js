let url = 'https://api.twitch.tv/v5/streams/32956898/?client_id=8s3qw0n4yacm066p8d7d4nm94mah3s';

document.addEventListener('DOMContentLoaded', function(event) {
	fetch(url)
	.then(res => res.json())
	.then(out => {
		let elem = document.getElementById("twitch-info");
		let first = elem.getElementsByTagName("span")[0]
		if (out.stream != null) {
			first.textContent = "indiebear is streaming " + out.stream.game;
			elem.classList.add("live");
		}
		elem.style = "right: -" + (elem.offsetWidth - 68) + "px";
		if (out.stream != null)
			slideOut(elem);
	}).catch();
});
function slideOut(elem) {
	elem.style.right = "0px";
	setTimeout(function() {
		elem.style = "right: -" + (elem.offsetWidth - 68) + "px";
	}, 2500);
}