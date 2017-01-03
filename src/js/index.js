'use strict';

const L = require('leaflet');
const utils = require('./utils');
const mapmarkers = require('./mapmarkers');

const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();
const map = L.map('mapdiv').setView([center.x, center.y], 12);
const basemap = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
    maxZoom: 18,
    minZoom: 11
});
const attribution = map.attributionControl;

// Base Map
attribution.setPrefix('<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/>');
map.setMaxBounds([[1.56073, 104.1147], [1.16, 103.502]]);
basemap.addTo(map);

// Custom Mapmarkers
let model = {};
utils.ajax({  // Add parking locations
    url: 'http://localhost:8080/locations',
    type: 'get',
    contentType: 'application/json; charset=utf-8'
}).then((locData) => {
    for (let loc of locData) {
        mapmarkers.addMarker(map, mapmarkers.createMarker(loc));
    }
    model.locData = locData;
    return utils.ajax({  // Add cars
        url: 'http://localhost:8080/bookings',
        type: 'get',
        contentType: 'application/json; charset=utf-8'
    });
}).then((bookingData) => {
    model.bookingData = bookingData;
}).then(() => {
    for (let booking of model.bookingData.slice(0, 1)) {
        booking.start_location = utils.findLoc(model.locData, booking.start_location);
        booking.end_location = utils.findLoc(model.locData, booking.end_location)
        return booking;
    }
}).then((booking) => {
    console.log(booking);
    mapmarkers.addCar(map, mapmarkers.createCar(booking));
}).catch((error) => {
    throw error;
});
