//Load map with custom style settings
function initialize() {
	var map = new google.maps.Map(document.getElementById("map"), {
		center: new google.maps.LatLng(40.7126168, -74.0058063),
		zoom: 13,
		zoomControl: true,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: style //custom styling located in the model.js
	});

	var infoWindow = new google.maps.InfoWindow();

	for (var i = 0; i < markers.length; i++) {
		var name = markers[i].name;
		var detail = markers[i].detail;
		var image = markers[i].image;
		var type = markers[i].type;
		var link = markers[i].link;
		var marker = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(lat, lng),
			title: name,
			animation: google.maps.Animation.DROP,
		});

	// infowindow formated under 'var html' so it would appear in sidebar instead of pop-up infowindow over map.
	var html = "<div id='siteinfo'>" +   
		"<h3>" + name + "</h3>" + 
		"</b>" +
		"<p>" + detail + "</p>" +
		"<a href='" + link + "'>More...</a>" +
		"</b>" + "</div>";

	// var icon = customIcons[type] || {};
	var marker = createMarker(point, name, type, map);
		marker.setVisible(false);
	var siteinfo = 
		bindInfoWindow(marker, map, infoWindow, html);
	}


	google.maps.event.addDomListener(window, 'load', initialize);
};

//--VIEW--//

var markerView = {
	init: function() {
		// store markers to DOM elements for easy access later
		this.markerElem = document.getElementById('type');
		this.markerNameElem = document.getElementById('name');
		this.markerLatElem = document.getElementById('lat');
		this.markerLngElem = document.getElementById('lng');
		this.markerDetailElem = document.getElementById('detail');
		this.markerLinkElem = document.getElementById('link');
	},

	render: function() {
		// update the DOM elements with the values from the current marker
		var currentMarker = octopus.getCurrentMarker();
		this.markerElem.textContent = currentMarker.type;
		this.markerLatElem.textContent = currentMarker.lat;
		this.markerLngElem.textContent = currentMarker.lng;
	}
};

var markerListView = {

	init: function() {
		// store the DON element for easy access later
		self.markerListElem = ko.observableArray([
			{type: "1600"},
			{type: "1700"},
			{type: "1800"},
			{type: "1900"}
		])

	},

	render: function() {
		var marker, elem, i;
		// get the markers we'll be rendering from the octopus
		var markers = octopus.getMarkers();

		// empy the marker list
		this.markerListElem.innterHTML = '';

		// loop over the markers
		for (i = 0; i < markers.length; i++) {
			// this is the marker we are currently looping over
			marker = markers[i];

			// make a new marker list item and set its text
			elem = document.createElement('li');
			elem.textContent = marker.name;

			// on click, setCurrentMarker and render the markerView
			// (this uses our closure-in-a-loop trick to connect the value
			// of the marker variable to the click event function)
			elem.addEventListener('click', (function(markerCopy) {
				return function() {
					octopus.setCurrentMarker(markerCopy);
					markerView.render();
				};
			})(marker));

			// finally, add the element to the list
			this.markerListElem.appendChild(elem);
		}
	}
};

// Attach and display infoWindow when marker clicked. Info window displayed in sidebar.
function bindInfoWindow(marker, map, infoWindow, html, link) {
	// display site details in siteInfo bar
	google.maps.event.addListener(marker, 'click', function() {
		document.getElementById('siteinfo').innerHTML = html + "</br><span><a href='javascript:void(null)' onclick='closeInfo()'>Close</a></span></br>";
		document.getElementById('siteinfo').style.width = "255px";
	});
}
