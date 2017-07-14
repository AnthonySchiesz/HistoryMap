//** MVVM **//

//// Model ////
var historicalLocation = [
		{
			type : "17th Century",
			name : "Fort Amsterdam",
			coord : {lat: 40.704100, lng: -74.013753},
			pageid : "https://en.wikipedia.org/wiki/Fort_Amsterdam/",
			page : "Fort_Amsterdam",
			link : "https://en.wikipedia.org/wiki/Fort_Amsterdam"
		},
		{
			type : "18th Century",
			name : "St. Pauls Chapel of Trinity Church",
			coord : {lat: 40.711313, lng: -74.009190},
			pageid : "https://en.wikipedia.org/wiki/St._Paul%27s_Chapel/",
			page : "St._Paul%27s_Chapel",
			link : "https://en.wikipedia.org/wiki/St._Paul%27s_Chapel"
		},
		{
			type : "19th Century",
			name : "Statue of Liberty",
			coord : {lat: 40.689250, lng: -74.044480},
			pageid : "https://en.wikipedia.org/wiki/Statue_of_Liberty",
			page : "Statue_of_Liberty",
			link : "https://en.wikipedia.org/wiki/Statue_of_Liberty"
		},
		{
			type : "19th Century",
			name : "Brooklyn Bridge",
			coord : {lat: 40.706084, lng: -73.996864},
			pageid : "https://en.wikipedia.org/wiki/Brooklyn_Bridge",
			page : "Brooklyn_Bridge",
			link : "https://en.wikipedia.org/wiki/Brooklyn_Bridge"
		},
		{
			type : "19th Century",
			name : "Manhattan Bridge",
			coord : {lat: 40.707497, lng: -73.990773},
			pageid : "https://en.wikipedia.org/wiki/Manhattan_Bridge",
			page : "Manhattan_Bridge",
			link : "https://en.wikipedia.org/wiki/Manhattan_Bridge"
		},
		{
			type : "20th Century",
			name : "SS Normandie",
			coord : {lat: 40.766782, lng: -73.998989},
			pageid : "https://en.wikipedia.org/wiki/SS_Normandie",
			page : "SS_Normandie",
			link : "https://en.wikipedia.org/wiki/SS_Normandie"
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
		styles: style //custom styling located in the style.js
	});

	var customIcon = 'http://maps.google.com/mapfiles/ms/icons/red.png';

	for (var i = 0; i < historicalLocation.length; i++) {
		var type = historicalLocation[i].type;
		var name = historicalLocation[i].name;
		var location = historicalLocation[i].coord;
		var pageid = historicalLocation[i].pageid;
		var page = historicalLocation[i].page;
		var link = historicalLocation[i].link;

		var marker = new google.maps.Marker({
			map: map,
			position: location,
			type: type,
			title: name,

			animation: google.maps.Animation.DROP,
			icon: customIcon
		});
		// to bind to infowindow. Infowindow to display as sidebar.
		var html = "<div id='siteinfo'>" +   
			"<h4>" + name + "</h4>";

		var path = "<div id='siteinfo'>" + "<a href='" + link + "'>More...</a>" + "</div>";
		// marker.setVisible(false)

		historicalLocation[i].marker = marker;
	}
	var infoWindow = new google.maps.InfoWindow();
//	var siteinfo = 
//		bindInfoWindow(marker, map, infoWindow, html);

	//// WIKIPEDIA ////
	// **WORK IN PROGRESS** //

	$(document).ready(function () {
		$('#list').click(function () {
			$('#siteinfo').empty();
			$.ajax({
				url: 'http://www.mediawiki.org/w/api.php',
				dataType: 'jsonp',
				data: {
					action: 'query',
					format: 'json',
					generator: 'random',
					prop: 'extracts',
					grnnamespace: 0,
					explaintext: true
				},
				success: function (result) {
					var pages = result.query.pages;
					var page = pages[Object.keys(pages)[0]];
					$('#siteinfo').append($('<h3>').text(page.title));
					$('#siteinfo').append($('<p>').text(page.extract));
				}
			});
		});
	});



	// Attach and display infoWindow when marker clicked. Info window displayed in sidebar.
//	function bindInfoWindow(marker, map, infoWindow, html, link) {
		// display site details in siteInfo bar
//		google.maps.event.addListener(marker, 'click', function() {
			// Pan to marker on Location List item click
//			map.setZoom(13);
//			map.setCenter(marker.getPosition());
			// Format infoWindow through sidebar.
//			document.getElementById('siteinfo').innerHTML = html + "<p>" + page + "</p>" + path + 
//			"</br><span><a href='javascript:void(null)' onclick='closeInfo()'>Close</a></span></br>";
//			document.getElementById('siteinfo').style.width = "335px";
//		});
		//wikiInfo(marker, siteinfo)
//	}
	
//	ko.applyBindings(new viewModel());
};


//// View ////
var listView = function(data) {
	this.type = ko.observable(data.type);
	this.name = ko.observable(data.name);
	this.coord = ko.observable(data.coord);
	this.marker = data.marker;
	this.isVisible = ko.observable(true);
};

//// View Model ////
var viewModel  = function() {
	var self = this;
	this.selectedCentury = ko.observable();
	//Century Filter select options
	this.century = ["Select Century", "17th Century", "18th Century", "19th Century", "20th Century"];
	//Locations list array
	this.sites = ko.observableArray([]);

	historicalLocation.forEach(function(locationItem) {
		self.sites.push(new listView(locationItem));
	});

	//select-bar filter for map markers and location list.
	this.filterCentury = ko.computed(function() {
		var historicalLocation = self.sites();
		for (var i = 0; i < historicalLocation.length; i++) {
			if (self.selectedCentury() === undefined) {
				historicalLocation[i].marker.setVisible(true);
				historicalLocation[i].isVisible(true);
			} else if (self.selectedCentury() !== historicalLocation[i].type()) {
				historicalLocation[i].marker.setVisible(false);
				historicalLocation[i].isVisible(false);
			} else {
				historicalLocation[i].marker.setVisible(true);
				historicalLocation[i].isVisible(true);
			}
		}
	});
	//click from Location List displays marker on map
	this.locListClick = function(coord) {
		google.maps.event.trigger(coord.marker, 'click');
	};
};
