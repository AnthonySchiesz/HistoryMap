//this is what needs to be figured out for final site function.

// current function for toggling different marker groups.
function toggleGroup(type) {
	for (var i = 0; i < markerGroups[type].length; i++) {
		var marker = markerGroups[type][i];
		if (!marker.getVisible()) {
			marker.setVisible(true);
		// Type (Century) does not match
		} else {
			marker.setVisible(false);
		}
	}
}
// attempt 2
function toggleGroup(type) {
	for (i = 0; i < markerGroups[type].length; i++) {
		marker = markerGroups[type][i];
		if (marker.type == type || type.length === 0) {
			marker.setVisible(true);
		}
		else {
			marker.setVisible(false);
		}
	}
}

function toggleGroup(type) {
	for (i = 0; i < markerGroups[type].length; i++) {
		marker = markerGroups[type][i];
		if (marker.type == type || type.length === 0) {
			if (!marker.getVisible(false)) {
			marker.setVisible(true);
			// Type (Century) does not match
			} else {
				marker.setVisible(false);
			}
		}else {
			marker.setVisible(true);
		}
	}
}
// attempt to toggle only one markerGroup at a time (hidding others when one is avtive) Does not work yet.
function toggleGroup(type, obj) {
	var i;
	for (i = 0; i < markerGroups[type].length; i++) 
	{
		var marker = markerGroups[type][i];
		if (markerGroups[type][i].type === type) {
			if ($(obj).is(":checked")) {
					marker.setVisible(true);
				} else {
					marker.setVisible(false);    
				}
			} else {
				marker.setVisible(false);
		}
	}
}

	// Permits only one century (type) to be viewed at time
	$('input.century').on('change', function() {
		$('input.century').not(this).prop('checked', false);  
	});


function bindInfoWindow(marker, map, infoWindow, html, century) {
	// display infowindow when user mouses-over
	google.maps.event.addListener(marker, 'mouseover', function() {
		infoWindow.setContent(html);		
		infoWindow.open(map, marker);
	});
	// hide the infowindow when user mouses-out
	google.maps.event.addListener(marker, 'mouseout', function() {
		infoWindow.close();
	});
	// display site details in siteInfo bar
	google.maps.event.addListener(marker, 'click', function() {
		document.getElementById('siteinfo').innerHTML = html;
	});
}