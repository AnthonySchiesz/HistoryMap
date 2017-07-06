//** MVVM **//

//// Model ////
var historicalLocation = [
		{
			type : "17th Century",
			name : "Fort Amsterdam",
			coord : {lat: 40.704100, lng: -74.013753},
			detail : "First military installation in New York.",
			link : "https://en.wikipedia.org/wiki/Fort_Amsterdam"
		},
		{
			type : "18th Century",
			name : "St. Pauls Chapel of Trinity Church",
			coord : {lat: 40.711313, lng: -74.009190},
			detail : "The chruch President George Washington celebrated mass after being inagurated.",
			link : "https://en.wikipedia.org/wiki/St._Paul%27s_Chapel"
		},
		{
			type : "19th Century",
			name : "Statue of Liberty",
			coord : {lat: 40.689250, lng: -74.044480},
			detail : "A statue dedicated to freedom.",
			link : "https://en.wikipedia.org/wiki/Statue_of_Liberty"
		},
		{
			type : "19th Century",
			name : "Brooklyn Bridge",
			coord : {lat: 40.706084, lng: -73.996864},
			detail : "A bridge connecting New York City with Brooklyn.",
			link : "https://en.wikipedia.org/wiki/Brooklyn_Bridge"
		},
		{
			type : "19th Century",
			name : "Manhattan Bridge",
			coord : {lat: 40.707497, lng: -73.990773},
			detail : "Another bridge connecting New York City with Brooklyn.",
			link : "https://en.wikipedia.org/wiki/Manhattan_Bridge"
		},
		{
			type : "20th Century",
			name : "SS Normandie",
			coord : {lat: 40.766782, lng: -73.998989},
			detail : "SS Normandie catches fire and capsizes.",
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
		var detail = historicalLocation[i].detail;
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
			"<h3>" + name + "</h3>" + 
			"</b>" +
			"<p>" + detail + "</p>" +
			"<a href='" + link + "'>More...</a>" +
			"</b>" + "</div>";
		// marker.setVisible(false)

		historicalLocation[i].marker = marker;

	}
	var infoWindow = new google.maps.InfoWindow();

	var siteinfo = 
		bindInfoWindow(marker, map, html, link);

	// Pan to marker on Location List item click
	marker.addListener('click', function() {
		map.setZoom(13);
		map.setCenter(marker.getPosition());
		siteinfo.open(map, marker);
	});


//google.maps.event.addListener(marker, 'click', function () {
//	// where I have added .html to the marker object.
//	infowindow.setContent(this.html);
//	infowindow.open(map, this);
//})(wikiInfo(marker, siteinfo));

	// Attach and display infoWindow when marker clicked. Info window displayed in sidebar.
	function bindInfoWindow(marker, map, html, link) {
		// display site details in siteInfo bar
		google.maps.event.addListener(marker, 'click', function() {
			document.getElementById('siteinfo').innerHTML = html + "</br><span><a href='javascript:void(null)' onclick='closeInfo()'>Close</a></span></br>";
			document.getElementById('siteinfo').style.width = "335px";
		});
		wikiInfo(marker, siteinfo)
	}
	
	ko.applyBindings(new viewModel());
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
		var markerGroup = self.sites();
		for (var i = 0; i < markerGroup.length; i++) {
			if (self.selectedCentury() === undefined) {
				markerGroup[i].marker.setVisible(true);
				markerGroup[i].isVisible(true);
			} else if (self.selectedCentury() !== markerGroup[i].type()) {
				markerGroup[i].marker.setVisible(false);
				markerGroup[i].isVisible(false);
			} else {
				markerGroup[i].marker.setVisible(true);
				markerGroup[i].isVisible(true);
			}
		}
	});
	//click from Location List displays marker on map
	this.locListClick = function(coord) {
		google.maps.event.trigger(coord.marker, 'click');
	};
};

//// WIKIPEDIA ////
// **WORK IN PROGRESS** //
// inspired by 9bitsolutions.com
function wikiInfo(marker, siteinfo) {
	$(document).ready(function(){

		$.ajax({
			type: "GET",
			url: "http://en.wikipedia.org/",
			contentType: "application/json; charset=utf-8",
			async: false,
			dataType: "json",
			success: function (data, textStatus, jqXHR) {

				var markup = data.parse.text["*"];
				var blurb = $('<div></div>').html(markup);

				// remove links as they will not work
				blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

				// remove any references
				blurb.find('sup').remove();

				// remove cite error
				blurb.find('.mw-ext-cite-error').remove();
				$('#article').html($(blurb).find('p'));

			},
			error: function (errorMessage) {
			}
		});
	});
}
