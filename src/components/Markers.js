'use strict';

import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { SmoovePopper, CarPopper } from './Popper';

// Define markers as stateless functional components

// pass remaining props into popper
const _SmooveMarker = ({ map, position, icon, ...props }) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <SmoovePopper {...props} />
        </Popup>
    </Marker>
)

// pass remaining props into popper
const _CarMarker = ({ map, position, icon, ...props }) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <CarPopper {...props} />
        </Popup>
    </Marker>
)

const SmooveMarkersList = ({ map, markers }) => {
    // pass remaining props into marker
    const items = markers.map(({ key, ...props }) => (
        <_SmooveMarker key={key} map={map} {...props} />
    ));
    return <div style={{display: 'none'}}>{items}</div>;
}

const CarMarkersList = ({ map, markers }) => {
    // pass remaining props into marker
    const items = markers.map(({ key, ...props }) => (
        <_CarMarker key={key} map={map} {...props} />
    ));
    return <div style={{display: 'none'}}>{items}</div>;
}

module.exports = {SmooveMarkersList, CarMarkersList};
