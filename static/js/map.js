var historicalLocation = [
		{
			type : "1600",
			name : "Fort Amsterdam",
			location : {lat: 40.704100, lng: -74.013753},
			detail : "First military installation in New York.",
			link : "https://en.wikipedia.org/wiki/Fort_Amsterdam"
		},
		{
			type : "1700",
			name : "St. Paul\'s Chapel of Trinity Church",
			location : {lat: 40.711313, lng: -74.009190},
			detail : "The chruch President George Washington celebrated mass after being inagurated.",
			link : "https://en.wikipedia.org/wiki/St._Paul%27s_Chapel"
		}

];

//// MAP ////
//Load map with custom style settings
function init() {
	var map = new google.maps.Map(document.getElementById("map"), {
		center: new google.maps.LatLng(40.7126168, -74.0058063),
		zoom: 13,
		zoomControl: true,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: style //custom styling located in the model.js
	});

	for (i = 0; i < historicalLocation.length; i++) {
		var type = historicalLocation[i].type;
		var name = historicalLocation[i].name;
		var location = historicalLocation[i].location;
		var position = historicalLocation[i].location;

		var marker = new google.maps.Marker({
			location: location,
			map: map,
			name: name,
			animation: google.maps.Animation.DROP
		});
//		marker.setVisible(false)

	historicalLocation[i].marker = marker;
	}
	var infoWindow = new google.maps.InfoWindow();

	var siteinfo = 
		bindInfoWindow(marker, map, infoWindow);
	
	ko.applyBindings(viewModel);
};

// Attach and display infoWindow when marker clicked. Info window displayed in sidebar.
function bindInfoWindow(marker, map, infoWindow, html, link) {
	// display site details in siteInfo bar
	google.maps.event.addListener(marker, 'click', function() {
		document.getElementById('siteinfo').innerHTML = html + "</br><span><a href='javascript:void(null)' onclick='closeInfo()'>Close</a></span></br>";
		document.getElementById('siteinfo').style.width = "255px";
	});
}

//// VIEW ////
var view = function(data) {
	this.type = ko.observable(century);
	this.name = ko.observable(name);
	this.location = ko.observable(location);
	this.marker = data.marker;

};

//// VIEW MODEL ////
var viewModel  = function() {
	var self = this;
	this.selectedCentury = ko.observable();

	//Century Filter select options
	this.century = ["Select Century", "17th Century", "18th Century", "19th Century", "20th Century"];


	//Century Filter
	this.filterCentury = ko.computed(function() {
		for (var i = 0; i < length; i++) {

			if (self.selectedCentury() === undefined) {
				selectedCentury.isVisible(false);

			} else if (self.selectedCentury() !== type()) {
				selectedCentury.setVisible(false);

			} else {
				// Centuries (type) don't match
				selectedCentury.isVisible(true);
			}
		}
	})
};
