let map;
const API_KEY = 'AIzaSyBMCIydfcuxjsren1g1Rk-UlEcfRZOLKuw'; 


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.0902, lng: -95.7129 },
        zoom: 4
    });
}

function searchSchool() {
    const schoolName = document.getElementById('schoolName').value;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': schoolName }, function(results, status) {
        if (status === 'OK') {
            const schoolLocation = results[0].geometry.location;
            map.setCenter(schoolLocation);
            map.setZoom(15);
            searchNearbyRestaurants(schoolLocation);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function searchNearbyRestaurants(location) {
    const placesService = new google.maps.places.PlacesService(map);

    placesService.nearbySearch({
        location: location,
        type: ['restaurant'],
        rankBy: google.maps.places.RankBy.DISTANCE
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    });
}

function createMarker(place) {
    new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'

    });
}
