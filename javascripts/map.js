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

    map.data.addListener('mouseover', mouseInToCity);
    map.data.addListener('mouseout', mouseOutOfCity);

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
      color = '';
      pops = Math.sqrt(citymap[city].population);
      if (pops < 200)
        color = '#FF0000';
      else if (pops < 400)
        color = '#d3af21';
      else if (pops < 600)
        color = '#72c119';
      else
        color = '#0ea052';
      // Add the circle for this city to the map.
      map.data
          .getFeatureById(stateId)
          .setProperty('census_variable', censusVariable);
      });

      var cityCircle = new google.maps.Circle({
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
          map: map,
          center: citymap[city].center,
          radius: Math.sqrt(citymap[city].population) * 25
      });


      var marker = new google.maps.Marker({
          position: citymap[city].center,
          map: map,
          icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                strokeWeight:0.001,
                fillOpacity:0.001,
                radius: Math.sqrt(citymap[city].population) * 25
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
