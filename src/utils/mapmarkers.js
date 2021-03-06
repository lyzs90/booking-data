'use strict';

import L from 'leaflet';
import { findLoc } from '../utils/api';
import { addPolylines } from '../utils/stateChanges';
import md5 from 'blueimp-md5';

export const setIcon = (iconUrl) => {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [50, 50], // size of the icon
        iconAnchor: [30, 34], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
    });
}

export const initBasemap = (locData) => {
    const inactiveMarkers = locData
        .filter((loc) => loc.deleted === 1)
        .map((loc) => {
            return {key: locData.indexOf(loc), position: [Number(loc.latitude), Number(loc.longitude)], icon: setIcon('http://localhost:8080/public/marker-fade.svg'), shortName: loc.parking_shortname, id: loc.id, description: loc.description, deleted: loc.deleted}
        });

    const activeMarkers = locData
        .filter((loc) => loc.deleted === 0)
        .map((loc) => {
            return {key: locData.indexOf(loc), position: [Number(loc.latitude), Number(loc.longitude)], icon: setIcon('http://localhost:8080/public/marker.svg'), shortName: loc.parking_shortname, id: loc.id, description: loc.description, deleted: loc.deleted}
        });

    return {
        locData,
        inactiveMarkers,
        activeMarkers
    };
}

/*
    Passing context is necessary so that this.state and this.setState will be obtained/called from the basemap context
*/
export const getActiveCars = (context, props) => {
    const activeCars = props.bookingsData
        .filter((booking) => booking.start === props.timeID - 1)
        .map((booking) => {
            try {
                // convert start and end location id to latlng
                booking.start_location = findLoc(props.locData, booking.start_location);
                booking.end_location = findLoc(props.locData, booking.end_location)

                // draw polyline if start location =/= end location
                if (JSON.stringify(booking.start_location) !== JSON.stringify(booking.end_location)) {
                    let tmpPolyline = [
                        booking.start_location,
                        booking.end_location
                    ];
                    context.setState(addPolylines(tmpPolyline));
                }

                // generate md5 hash of object to use as key
                let key = md5(JSON.stringify(booking));

                // pass props into markerlist
                return {key: key, position: [Number(booking.start_location[0]), Number(booking.start_location[1])], icon: setIcon('http://localhost:8080/public/custom-car.svg'), car: booking.car, id: booking.id, start: booking.start, end: booking.end};
            } catch (err) {
                // Location ID does not exist
                return false;
            }
        })
        .filter(Boolean);
    return activeCars;
}

export const getInactiveCars = (markerList, time) => {
    const tmpList = new Set([markerList]);
    return markerList.filter((marker) => {
        return Number(marker.end) === Number(time);
    });
}

