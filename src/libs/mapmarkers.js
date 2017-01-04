'use strict';

const L = require('leaflet');

// Create marker object
let createMarker = (data) => {
    return {
        'type': 'Feature',
        'properties': {
            'description': data.description,
            'parking_shortname': data.parking_shortname,
            'id': data.id,
            'deleted': data.deleted
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [Number(data.longitude), Number(data.latitude)]
        }
    };
}

// Create car object
let createCar = (data) => {
    return {
        'type': 'Feature',
        'properties': {
            'id': data.id,
            'car': data.car
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [Number(data.start_location[0]), Number(data.start_location[1])]
        }
    };
}

// Add marker method
let addMarker = (map, geojsonFeature) => {
    L.geoJson(geojsonFeature, {
        pointToLayer: (feature, latlng) => {
            if (feature.properties.deleted === 1) {
                let smooveIcon = L.icon({
                    iconUrl: 'http://localhost:8080/public/marker-fade.svg',
                    iconSize: [50, 50], // size of the icon
                    iconAnchor: [30, 34], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
                });
                return L.marker(latlng, {icon: smooveIcon});
            } else {
                let smooveIcon = L.icon({
                    iconUrl: 'http://localhost:8080/public/marker.svg',
                    iconSize: [50, 50], // size of the icon
                    iconAnchor: [30, 34], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
                });
                return L.marker(latlng, {icon: smooveIcon});
            }
        },
        onEachFeature: (feature, layer) => {
            if (feature.properties.deleted === 1) {
                layer.bindPopup(`<h2>${feature.properties.parking_shortname} (deleted)</h2><b>Id:</b> ${feature.properties.id}<br><b>Description:</b> ${feature.properties.description}`);
            } else {
                layer.bindPopup(`<h2>${feature.properties.parking_shortname}</h2><b>Id:</b> ${feature.properties.id}<br><b>Description:</b> ${feature.properties.description}`);
            }
        }
    }).addTo(map);
}

// Add car method
let addCar = (map, geojsonFeature) => {
    L.geoJson(geojsonFeature, {
        pointToLayer: (feature, latlng) => {
            let carIcon = L.icon({
                iconUrl: 'http://localhost:8080/public/custom-car.svg',
                iconSize: [50, 50], // size of the icon
                iconAnchor: [30, 34], // point of the icon which will correspond to marker's location
                popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
            });
            return L.marker(latlng, {icon: carIcon});
        },
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<b>Car Id:</b> ${feature.properties.car}<br><b>Booking Id:</b> ${feature.properties.id}`);
        }
    }).addTo(map);
}

module.exports = {createMarker, createCar, addMarker, addCar};
