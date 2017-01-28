'use strict';

import L from 'leaflet';

export const setIcon = (iconUrl) => {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [50, 50], // size of the icon
        iconAnchor: [30, 34], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
    });
}


export const deleteFromMarkerList = (markerList, time) => {
    const tmpList = new Set([markerList]);
    return markerList.filter((marker) => {
        return Number(marker.end) !== Number(time);
    });
}
