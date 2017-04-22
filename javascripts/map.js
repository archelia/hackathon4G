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
      scale = 9;
      pops = Math.sqrt(citymap[city].population);
      rad = Math.sqrt(citymap[city].population) * 25;
      if (rad > 8000)
        rad = 8000;


      if (pops < 100)
        color = '#FF0000';
      else if (pops < 200){
        scale = 15;
        color = '#d98c27';
      }
      else if (pops < 300) {
        scale = 20;
        color = '#cec01f';
      }
      else if (pops < 400){
        color = '#5dbe19';
        scale = 25;
      }
      else {
        color = '#0ea052';
        scale = 35;
      }

      // Add the circle for this city to the map.
      var cityCircle = new google.maps.Circle({
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
          map: map,
          center: citymap[city].center,
          radius: rad
      });

      var marker = new google.maps.Marker({
          position: citymap[city].center,
          map: map,
          icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: scale,
                strokeWeight:0.001,
                fillOpacity: 1,
                fillColor: 'transparent'
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
