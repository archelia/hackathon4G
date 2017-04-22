var month = 'january';
var map;

function initMap() {
    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {
            lat: -7.614529,
            lng: 110.712246
        },
        mapTypeId: 'terrain'
    });
    var e = document.getElementById("month");
    month = e.options[e.selectedIndex].value;

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    render();
}

function render() {
    console.log('render');
    if (month === 'january') {
        console.log("january");
        var citymap = january;
    }
    if (month === 'february') {
        console.log("February");
        var citymap = february;
    }
    for (var city in citymap) {
        // Add the circle for this city to the map.
        if (Math.sqrt(citymap[city].population) < 200) {
            var cityCircle = new google.maps.Circle({
                strokeColor: '#000000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#000000',
                fillOpacity: 0.35,
                map: map,
                center: citymap[city].center,
                radius: 7500
            });
        } else {
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: citymap[city].center,
                radius: Math.sqrt(citymap[city].population) * 50

            });
        }

        var marker = new google.maps.Marker({
            position: citymap[city].center,
            map: map,
            icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 5,
                  strokeWeight:0.001,
                  fillOpacity:0.001
               },
            });
        var message = "<p> Kota/Kab: " + citymap[city].name + "</p>"+ "<p>  Jumlah User:" + citymap[city].population + "</p>";
        attachSecretMessage(marker, message);
    }

    function attachSecretMessage(marker, message) {
        var infowindow = new google.maps.InfoWindow({
            content: message
        });

        marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);

        });
    }
}
