//** MVVM **//

//// Model ////
var historicalLocation = [
		{
			type : "17th Century",
			name : "Fort Amsterdam",
			coord : {lat: 40.704100, lng: -74.013753},
			event : "Under the direction of Willem Verhulst, the second director of the New Netherland colony, construction of Fort Amsterdam begins (1625). Designed by Cryn Fredericks, chief engineer of the New Netherland colony, the fort had four sides of hard-packed earth or rubble with a bastion at each corner to better protect the walls. The elevation of the site was originally somewhat higher than today. The fort stood on a hill that sloped down to Pearl Street and Bowling Green and served as a military installation to protect the New Netherland colony against attacks from the English and French. Fort Amsterdam also contained a barracks, the church, a house for the West India Company director and a warehouse for the storage of company goods.",
			page : "Fort_Amsterdam",
			link : "https://en.wikipedia.org/wiki/Fort_Amsterdam"
		},
		{
			type : "18th Century",
			name : "St. Pauls Chapel of Trinity Church",
			coord : {lat: 40.711313, lng: -74.009190},
			event : "A chapel of the Parish of Trinity Church, St. Paul's was built on land granted by Anne, Queen of Great Britain, designed by architect Thomas McBean and built by master craftsman Andrew Gautier. Upon completion in 1766, it was the tallest building in New York City. It stood in a field some distance from the growing port city to the south and was built as a 'chapel-of-ease' for parishioners who thought the mother church inconvenient to access.",
			page : "St._Paul%27s_Chapel",
			link : "https://en.wikipedia.org/wiki/St._Paul%27s_Chapel"
		},
		{
			type : "19th Century",
			name : "Statue of Liberty",
			coord : {lat: 40.689250, lng: -74.044480},
			event : "Construction of a fort on the island in the shape of an 11-point star began in 1806 and was completed in 1811 after the New York State Legislature ceded the island to the federal government. Following the War of 1812, the star-shaped fortification was named Fort Wood after Lt. Col Eleazer Derby Wood who was killed in the Siege of Fort Erie in 1813. By the time it was chosen for the Statue of Liberty, the fort was disused and its walls were used as the distinctive base for the Statue of Liberty given by France for the 1876 centenary celebrations.",
			page : "Statue_of_Liberty",
			link : "https://en.wikipedia.org/wiki/Statue_of_Liberty"
		},
		{
			type : "19th Century",
			name : "Ticker-Tape Parade",
			coord : {lat: 40.706746, lng: -74.010886},
			event : "On October 28, 1886, President Grover Cleveland led a parade tp the Statue of Liberty's ceremony of dedication. As the parade passed the New York Stock Exchange, traders threw ticker tape from the windows, beginning the New York tradition of the ticker-tape parade. The term ticker tape originally referred to the use of the paper output of ticker tape machines, which were remotely driven devices used in brokerages to provide updated stock market quotes. The term ticker came from the sound made by the machine as it printed.",
			page : "Ticker_tape_parade",
			link : "https://en.wikipedia.org/wiki/Ticker_tape_parade"
		},
		{
			type : "19th Century",
			name : "Brooklyn Bridge",
			coord : {lat: 40.706084, lng: -73.996864},
			event : "Construction on the bridge—originally referred to as the New York and Brooklyn Bridge[30] and as the East River Bridge[31]— started in 1869 and was oficailly was opened for use on May 24, 1883. On that first day, a total of 1,800 vehicles and 150,300 people crossed what was then the only land passage between Manhattan and Brooklyn. The bridge cost US$15.5 million in 1883 dollars (about US$385,554,000 in today's dollars) to build and an estimated 27 people died during its construction.",
			page : "Brooklyn_Bridge",
			link : "https://en.wikipedia.org/wiki/Brooklyn_Bridge"
		},
		{
			type : "20th Century",
			name : "Manhattan Bridge",
			coord : {lat: 40.707497, lng: -73.990773},
			event : "The last of the three suspension bridges built across the lower East River, The Manhattan Bridge construction began in 1901 and opened in 1910.",
			page : "Manhattan_Bridge",
			link : "https://en.wikipedia.org/wiki/Manhattan_Bridge"
		},
		{
			type : "20th Century",
			name : "Wall Street Bombing",
			coord : {lat: 40.706847, lng: -74.010301},
			event : "At 12:01 pm on September 16, 1920 a horse-drawn wagon passed by lunchtime crowds on Wall Street and stopped across the street from the headquarters of the J.P. Morgan bank at 23 Wall Street, on the Financial District's busiest corner. Inside the wagon, 100 pounds (45 kg) of dynamite with 500 pounds (230 kg) of heavy, cast-iron sash weights exploded in a timer-set detonation, sending the weights tearing through the air. The horse and wagon were blasted into small fragments, but the driver was believed to have left the vehicle and escaped. The 38 fatalities, most of whom died within moments of the blast, were mostly young people who worked as messengers, stenographers, clerks, and brokers. Remnants of the damage from the 1920 bombing are still visible on 23 Wall Street.",
			page : "Wall_Street_bombing",
			link : "https://en.wikipedia.org/wiki/Wall_Street_bombing"
		},
		{
			type : "20th Century",
			name : "SS Normandie",
			coord : {lat: 40.766782, lng: -73.998989},
			event : "At 2:30 pm on February 9, 1942, the SS Normandie catches fire as sparks from a welding torch ignited a stack of life vests filled with flammable kapok that had been stored in the first-class lounge. The ship had a very efficient fire protection system, but it had been disconnected during its conversion. Fire spread to 3 upper decks within an hour and the Normandie began to list as firefighters on shore and in fire boats poured water on the blaze. The Normandie capsized on 10 February 1942. One man died in the tragedy — Frank 'Trent' Trentacosta, 36, of Brooklyn. 38 fire fighters and 153 civilians were treated for various injuries, burns, smoke inhalation, and exposure.",
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

//	var marker;
	var activeMarker;
	var defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red.png';
	var selectedIcon = 'http://maps.google.com/mapfiles/ms/icons/blue.png';

	var infoWindow = bindInfoWindow(marker, map, infoWindow);

	for (var i = 0; i < historicalLocation.length; i++) {
		var type = historicalLocation[i].type;
		var name = historicalLocation[i].name;
		var location = historicalLocation[i].coord;
		var event = historicalLocation[i].event;
		var page = historicalLocation[i].page;
		var link = historicalLocation[i].link;

		var marker = new google.maps.Marker({
			map: map,
			position: location,
			type: type,
			title: name,

			animation: google.maps.Animation.DROP,
			icon: defaultIcon
		});

		historicalLocation[i].marker = marker;

		//	marker.addListener("click", function() {
				// Open info window.
		//		bindInfoWindow(this, marker);
		//	});

			// display site details in siteInfo bar
		//	marker.addListener('click', function() {
				// Format infoWindow through sidebar.
		//		document.getElementById('bar').style.width = "335px";
		//		bindInfoWindow(this, marker);
		//	});

		marker.addListener('click', (function(marker, i) {
			return function() {
				// Open info window.
				//bindInfoWindow(this, marker);
				// Format infoWindow through sidebar.
				document.getElementById('bar').style.width = "335px";
				bindInfoWindow(this, marker);
				// Pan to marker on Location List item click
				map.panTo(marker.getPosition());
				map.setZoom(13);
				// check to see if activeMarker is set
				// if so, set the icon back to the default
				activeMarker && activeMarker.setIcon(defaultIcon);
				// set the icon for the clicked marker
				marker.setIcon(selectedIcon);
				// update the value of activeMarker
				activeMarker = marker;
				$.ajax({
					url: 'http://en.wikipedia.org/w/api.php',
					dataType: 'jsonp',
					data: {
						action: 'query',
						format: 'json',
						titles: page,
						prop: 'extracts',
						exintro: 0,
						grnnamespace: 0,
						explaintext: true
					},
					success: function(result) {
						var pages = result.query.pages;
						var page = pages[Object.keys(pages)[0]];
					//	$('#siteinfo').append($('<h4>').text(page.title));
						$('#siteinfo').append($('<p>').text(page.extract));
					}
				//bindInfoWindow();
				});
				var result = "";
				document.getElementById('siteinfo').innerHTML = "<h3>Event</h3>" + "<p>" + event + "</p>" + "<h3>Setting</h3>" + result;
			}
		})(marker, i));
	};
	ko.applyBindings(new viewModel());
};


	// Attach and display infoWindow when marker clicked. Info window displayed in sidebar.
//	function bindInfoWindow(marker, map, infoWindow) {
		//// WIKIPEDIA API////
//		$(document).ready(function(historicalLocation) {
//			$('#siteinfo').empty();
//			$.ajax({
//				url: 'http://en.wikipedia.org/w/api.php',
//				dataType: 'jsonp',
//				data: {
//					action: 'query',
//					format: 'json',
//					titles: page,
//					prop: 'extracts',
//					exintro: 0,
//					grnnamespace: 0,
//					explaintext: true
//				},
//				success: function(result) {
//					var pages = result.query.pages;
//					var page = pages[Object.keys(pages)[0]];
				//	$('#siteinfo').append($('<h4>').text(page.title));
//					$('#siteinfo').append($('<p>').text(page.extract));
//				}
			//bindInfoWindow();
//			});
//			var result = "";
//			document.getElementById('siteinfo').innerHTML = "<h3>Event</h3>" + "<p>" + event + "</p>" + "<h3>Setting</h3>" + result;
//		});
//	};
//	ko.applyBindings(new viewModel());
//};



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
