function initMap() {
    // Create the map.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {
            lat: -7.614529,
            lng: 110.712246
        },
        mapTypeId: 'terrain'
    });

    map.data.addListener('mouseover', mouseInToCity);
    map.data.addListener('mouseout', mouseOutOfCity);

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
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

      function mouseInToCity(e) {
        // set the hover state so the setStyle function can change the border
        e.feature.setProperty(city, 'hover');
        document.getElementById('data-label').textContent = e.feature.getProperty('NAME');
        document.getElementById('data-box').style.display = 'block';
      }


      function mouseOutOfCity(e) {
        // reset the hover state, returning the border to normal
        e.feature.setProperty(city, 'normal');
      }

      // cityCircle.addListener('mouseover', function(city, pops) {
      //   document.getElementById('data-label').innerHTML = city;
      //   document.getElementById('data-box').style.display = 'block';
      // });
      //
      // cityCircle.addListener('mouseout', function() {
      //   document.getElementById('data-box').style.display = 'none';
      // });

    }
}
