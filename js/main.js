let index = (function () {
  return {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.setMap(51.505, -0.09);
      this.getIp();
    },
    cacheDom: function () {
      this.ip = document.getElementById("ip-address");
      this.location = document.getElementById("location");
      this.timezone = document.getElementById("timezone");
      this.isp = document.getElementById("isp");
      this.btnSearch = document.getElementById("ip-search");
      this.ipInput = document.getElementById("ip-input");
    },
    bindEvents: function () {
      this.btnSearch.addEventListener("click", this.setSearch.bind(this));
    },
    setSearch: function () {
      this.getAltitudeAndLatitude(this.ipInput.value);
    },
    getIp: function () {
      fetch("https://api.ipify.org")
        .then(response => response.text())
        .then(data => this.getAltitudeAndLatitude(data));
    },
    getAltitudeAndLatitude: function (ip) {
      this.ipInput.value = ip;
      let apiKey = "at_nC3JfmQr40CQFHIWFXQnqBmPcUUsO";
      fetch("https://geo.ipify.org/api/v1?apiKey=" + apiKey + "&ipAddress=" + ip)
        .then(response => response.json())
        .then(data => {
          this.renderHtml(
            data.ip,
            data.location.city,
            data.location.timezone,
            data.isp,
            data.location.lat,
            data.location.lng
          );
        })
        .catch(console.log("error"));
    },
    renderHtml: function (ip, city, timezone, isp, lat, lng) {
      this.setData(
        ip,
        city,
        timezone,
        isp
      );
      this.setMap(
        lat,
        lng
      );

    },
    setMap: function (lat, lng) {
      //init map
      if (!this.map) {
        this.map = L.map('map', {
          maxZoom: 14,
          minZoom: 14,
          touchZoom: false,
          tap: false,
          scrollWheelZoom: false,
          zoomControl: false,
          dragging: false
        });
      }
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      //set marker
      this.map.setView([lat, lng], 14);
      L.marker([lat, lng], {
        draggable: false
      }).addTo(this.map);
    },
    setData: function (ip, location, timezone, isp) {
      this.ip.innerHTML = ip;
      this.location.innerHTML = location;
      this.timezone.innerHTML = timezone;
      this.isp.innerHTML = isp;
    }
  };
})();
index.init();




/*
//init map
var map = L.map('map').
//render map
setView([-34.7653, -58.2128],
  16);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
//scale
L.control.scale().addTo(map);
//set marker
L.marker([-34.7653, -58.2128], {
  draggable: true
}).addTo(map);

//get altitud lngitud
fetch("https://geo.ipify.org/api/v1", {
    apiKey: "at_nC3JfmQr40CQFHIWFXQnqBmPcUUsO",
    ipAddress: "8.8.8.8"
  })
  .then(response => response.json())
  .then(data => console.log(data));

//get ip
fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(data => console.log(data.ip));



  */
