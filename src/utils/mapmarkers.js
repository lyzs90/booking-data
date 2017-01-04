'use strict';

import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const smooveIcon = L.icon({
    iconUrl: 'http://localhost:8080/public/marker.svg',
    iconSize: [50, 50], // size of the icon
    iconAnchor: [30, 34], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
});
const smooveIconFade = L.icon({
    iconUrl: 'http://localhost:8080/public/marker-fade.svg',
    iconSize: [50, 50], // size of the icon
    iconAnchor: [30, 34], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
});
const carIcon = L.icon({
    iconUrl: 'http://localhost:8080/public/custom-car.svg',
    iconSize: [50, 50], // size of the icon
    iconAnchor: [30, 34], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
});

const SmooveMarker = ({ map, position, icon, shortName, id, description}) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <p>Location: {shortName}, Id: {id}, Description: {description}</p>
        </Popup>
    </Marker>
)

const CarMarker = ({ map, position, icon, car, id}) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <p>Car Id: {car}, Booking Id: {id}</p>
        </Popup>
    </Marker>
)

const SmooveMarkersList = ({ map, markers }) => {
    const items = markers.map(({ key, ...props }) => (
        <SmooveMarker key={key} map={map} {...props} />
    ));
    return <div style={{display: 'none'}}>{items}</div>;
}

const CarMarkersList = ({ map, markers }) => {
    const items = markers.map(({ key, ...props }) => (
        <CarMarker key={key} map={map} {...props} />
    ));
    return <div style={{display: 'none'}}>{items}</div>;
}

module.exports = {smooveIcon, smooveIconFade, carIcon, SmooveMarker, CarMarker, SmooveMarkersList, CarMarkersList};
