// custom map styling through google maps tools
var style = [{
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
}];


var markers = {
	currentMarker: null,
	marker: [
		{
			type : '1600',
			name : 'Fort Amsterdam',
			location : {lat: 40.704100, lng: -74.013753},
			detail : 'First military installation in New York.',
			link : 'https://en.wikipedia.org/wiki/Fort_Amsterdam'
		},
		{
			type : '1700',
			name : 'St. Paul\'s Chapel of Trinity Church',
			location : {lat: 40.711313, lng: -74.009190},
			detail : 'The chruch President George Washington celebrated mass after being inagurated.',
			link : 'https://en.wikipedia.org/wiki/St._Paul%27s_Chapel'
		}

	]
};