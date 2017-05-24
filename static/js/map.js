var customIcons = {
// icons to be associated with future century content	
//	1200: {
//		icon: 'http://maps.google.com/mapfiles/ms/icons/pink.png'
//	},
//	1300: {
//		icon: 'http://maps.google.com/mapfiles/ms/icons/lightblue.png'
//	},
//	1400: {
//		icon: 'http://maps.google.com/mapfiles/ms/icons/orange.png'
//	},
//	1500: {
//		icon: 'http://maps.google.com/mapfiles/ms/icons/red.png'
//	},
	1600: {
		icon: 'http://maps.google.com/mapfiles/ms/icons/purple.png'
	},
	1700: {
		icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
	},
	1800: {
		icon: 'http://maps.google.com/mapfiles/ms/icons/green.png'
	},
	1900: {
		icon: 'http://maps.google.com/mapfiles/ms/icons/yellow.png'
	}
};

var markerGroups = {
	"1600": [],
	"1700": [],
	"1800": [],
	"1900": []
};

//Load map with custom style settings
function initialize() {            
	var map = new google.maps.Map(document.getElementById("map"), {
		center: new google.maps.LatLng(40.7126168, -74.0058063),
		zoom: 13,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	map.set('styles', [{
		zoomControl: false
	}, {
				featureType: "administrative.land_parcel",
		elementType: "labels.text",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "poi.attraction",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "poi.business",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "poi.government",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "poi.medical",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "poi.park",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "poi.place_of_worship",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "poi.school",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "poi.sports_complex",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "road.arterial",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "road.highway",
		stylers: [{
			visibility: "simplified"
		}]
	}, {
		featureType: "road.highway",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "road.highway.controlled_access",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "road.local",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "transit",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "transit.line",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "transit.station",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "transit.station.airport",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "transit.station.bus",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "transit.station.rail",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "water",
		elementType: "geometry.fill",
		stylers: [{
			color: "#97cbff"
		}]
	}]);
	var infoWindow = new google.maps.InfoWindow();

	downloadUrl("static/xml/markers.xml", function (data) {
	// var xml = xmlParse("markers.xml");
	var xml = data.responseXML;
	var markers = xml.documentElement.getElementsByTagName("marker");
	for (var i = 0; i < markers.length; i++) {
		var name = markers[i].getAttribute("name");
		var detail = markers[i].getAttribute("detail");
		var image = markers[i].getAttribute("image");
		var type = markers[i].getAttribute("type");
		var link = markers[i].getAttribute("link");

	var point = new google.maps.LatLng(
		parseFloat(markers[i].getAttribute("lat")),
		parseFloat(markers[i].getAttribute("lng")));

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
	});
	google.maps.event.addDomListener(window, 'load', initialize);
};

//Defining the marker
function createMarker(point, name, type, map) {
	var icon = customIcons[type] || {};
	var marker = new google.maps.Marker({
		map: map,
		position: point,
		icon: icon.icon,
		title: name,
		type: type
	});

	if (!markerGroups[type]) markerGroups[type] = [];
	markerGroups[type].push(marker);

	return marker;
}

//Filter the markers through navbar dropdown div. Purpose is to click one century 
// to show, then hide others not related to active selection.

//WHY WONT THIS WORK?? No Markers appear. :(
function filterMarkers(type) {
	for (i = 0; i < markerGroups[type].length; i++) {
		marker = markerGroups[type][i];
		// If is same century or century not picked
		if (marker.type == type || type.length === 0) {
			marker.setVisible(true);
		}
		// Centuries (type) don't match 
		else {
			marker.setVisible(false);
		}
	}
}

// Attach and display infoWindow when marker clicked. Info window displayed in sidebar.
function bindInfoWindow(marker, map, infoWindow, html, link) {
	// display site details in siteInfo bar
	google.maps.event.addListener(marker, 'click', function() {
		document.getElementById('siteinfo').innerHTML = html + "</br><span><a href='javascript:void(null)' onclick='closeInfo()'>Close</a></span></br>";
		document.getElementById('siteinfo').style.width = "255px";
	});
}


function downloadUrl(url, callback) {
	var request = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			request.onreadystatechange = doNothing;
			callback(request, request.status);
		}
	};

	request.open('GET', url, true);
	request.send(null);
}
function doNothing() {}

function xmlParse(str) {
	if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
		var doc = new ActiveXObject('Microsoft.XMLDOM');
		doc.loadXML(str);
		return doc;
	}

	if (typeof DOMParser != 'undefined') {
		return (new DOMParser()).parseFromString(str, 'text/xml');
	}

	return createElement('div', null);
}
