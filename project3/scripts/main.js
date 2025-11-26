(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var qBtn = document.getElementById('questionBtn');
    if (qBtn) {
      qBtn.addEventListener('click', function () {
        alert("If you have questions, contact me at:\nhaaniya.ghiasuddin@gmail.com");
      });
    }
  });

  window.initMap = function initMap() {
    var mapEl = document.getElementById('map');
    if (!mapEl || !window.google || !google.maps) return;

    var center = { lat: 42.0411, lng: -87.7826 };

    var styledMap = new google.maps.StyledMapType(
      [
        { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] }
      ],
      { name: "Midnight" }
    );

    var map = new google.maps.Map(mapEl, {
      center: center,
      zoom: 12,
      mapTypeControlOptions: {
        mapTypeIds: ["roadmap", "satellite", "terrain", "hybrid", "midnight"]
      }
    });

    map.mapTypes.set("midnight", styledMap);
    map.setMapTypeId("midnight");

    var places = [
      {
        pos: center,
        title: "Morton Grove, IL",
        info: "<strong>Morton Grove</strong><br>Home base."
      },
      {
        pos: { lat: 41.8349, lng: -87.6270 },
        title: "Illinois Institute of Technology",
        info: "<strong>IIT</strong><br>Chicago, IL."
      },
      {
        pos: { lat: 41.8807852, lng: -87.6667729 },
        title: "Favorite Bulgogi Spot",
        info: "<strong>Favorite Bulgogi Spot</strong><br>36 S Ashland Ave, Chicago, IL 60607"
      }
    ];

    var bounds = new google.maps.LatLngBounds();
    var info = new google.maps.InfoWindow();

    places.forEach(function (p) {
      var m = new google.maps.Marker({
        position: p.pos,
        map: map,
        title: p.title
      });
      bounds.extend(p.pos);

      m.addListener("click", function () {
        info.setContent(p.info);
        info.open(map, m);
      });
    });

    map.fitBounds(bounds);

    new google.maps.Circle({
      strokeColor: "#7c3aed",
      strokeOpacity: 0.7,
      strokeWeight: 2,
      fillColor: "#7c3aed",
      fillOpacity: 0.1,
      map: map,
      center: center,
      radius: 1200
    });
  };
})();
