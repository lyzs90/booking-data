'use strict';

import L from 'leaflet';

const setIcon = (iconUrl) => {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [50, 50], // size of the icon
        iconAnchor: [30, 34], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
    });
}

const addToMarkerList = (markerList, markerObject) => {
    let tmpMarker = [markerObject];
    return markerList.push(...tmpMarker);
}

module.exports = {setIcon, addToMarkerList};
