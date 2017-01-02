'use strict';

const L = require('leaflet');

// Create GeoJSON object
let createGeoJSON = (data) => {
    return {
        'type': 'Feature',
        'properties': {
            'description': data.description,
            'parking_shortname': data.parking_shortname,
            'id': data.id
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [Number(data.longitude), Number(data.latitude)]
        }
    };
}

// Add marker method
let addMarker = (map, geojsonFeature) => {
    L.geoJson(geojsonFeature, {
        pointToLayer: (feature, latlng) => {
            let smooveIcon = L.icon({
                iconUrl: 'http://localhost:8080/public/custom-marker.svg',
                iconSize: [150, 150], // size of the icon
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                popupAnchor: [-3, -36] // point from which the popup should open relative to the iconAnchor
            });
            return L.marker(latlng, {icon: smooveIcon});
        },
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<h2>${feature.properties.parking_shortname}</h2><b>Id:</b> ${feature.properties.id}<br><b>Description:</b> ${feature.properties.description}`);
        }
    }).addTo(map);
}

module.exports = {createGeoJSON, addMarker};
