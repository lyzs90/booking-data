'use strict';

const L = require('leaflet');
const mapmarkers = require('./mapmarkers');
const utils = require('./utils.js');

const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();
const map = L.map('mapdiv').setView([center.x, center.y], 12);

const basemap = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
    maxZoom: 18,
    minZoom: 11
});

const attribution = map.attributionControl;

attribution.setPrefix('<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/>');

map.setMaxBounds([[1.56073, 104.1147], [1.16, 103.502]]);
basemap.addTo(map);

// Mark Smoove locations on map
utils.ajax({
    url: 'http://localhost:8080/locations',
    type: 'get',
    contentType: 'application/json; charset=utf-8'
}).then(
  function fulfillHandler (data) {
      console.log(data.length);
      for (let loc of data) {
          mapmarkers.addMarker(map, mapmarkers.createGeoJSON(loc));
      }
  },
  function rejectHandler (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
  }
).catch(function errorHandler (error) {
    throw error;
});
