//** MVVM **//

//// MODEL ////
var historicalLocation = [
		{
			type : "17th Century",
			name : "Fort Amsterdam",
			location : {lat: 40.704100, lng: -74.013753},
			detail : "First military installation in New York.",
			link : "https://en.wikipedia.org/wiki/Fort_Amsterdam"
		},
		{
			type : "18th Century",
			name : "St. Pauls Chapel of Trinity Church",
			location : {lat: 40.711313, lng: -74.009190},
			detail : "The chruch President George Washington celebrated mass after being inagurated.",
			link : "https://en.wikipedia.org/wiki/St._Paul%27s_Chapel"
		}

];


var customIcon = 'http://maps.google.com/mapfiles/ms/icons/red.png';

//// MAP ////
//Load map with custom style settings
function init() {
	var map = new google.maps.Map(document.getElementById("map"), {
		center: new google.maps.LatLng(40.7126168, -74.0058063),
		zoom: 13,
		zoomControl: true,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: style //custom styling located in the style.js
	});

	for (i = 0; i < historicalLocation.length; i++) {
		var type = historicalLocation[i].type;
		var name = historicalLocation[i].name;
		var location = historicalLocation[i].location;
		var detail = historicalLocation[i].detail;
		var link = historicalLocation[i].link;

		var marker = new google.maps.Marker({
			map: map,
			location: location,
			type: type,
			name: name,
			icon: customIcon,
			animation: google.maps.Animation.DROP
		});
		// to bind to infowindow. Infowindow to display as sidebar.
		var html = "<div id='siteinfo'>" +   
			"<h3>" + name + "</h3>" + 
			"</b>" +
			"<p>" + detail + "</p>" +
			"<a href='" + link + "'>More...</a>" +
			"</b>" + "</div>";
//		marker.setVisible(false)

	historicalLocation[i].marker = marker;
	}
	var infoWindow = new google.maps.InfoWindow();

	var siteinfo = 
		bindInfoWindow(marker, map, infoWindow);


	// Attach and display infoWindow when marker clicked. Info window displayed in sidebar.
	function bindInfoWindow(marker, map, infoWindow, html, link) {
		// display site details in siteInfo bar
		google.maps.event.addListener(marker, 'click', function() {
			document.getElementById('siteinfo').innerHTML = html + "</br><span><a href='javascript:void(null)' onclick='closeInfo()'>Close</a></span></br>";
			document.getElementById('siteinfo').style.width = "255px";
		});
	}
	
	ko.applyBindings(viewModel);
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
				selectedCentury.setVisible(true);
			}
		}
	})
};
