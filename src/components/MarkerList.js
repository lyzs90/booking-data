'use strict';

import React from 'react';
import { SmooveMarker, CarMarker } from './Markers';

export const SmooveMarkerList = ({ map, markers }) => {
    // pass remaining props into marker
    const items = markers.map(({ key, ...props }) => (
        <SmooveMarker key={key} map={map} {...props} />
    ));
    return <div style={{display: 'none'}}>{items}</div>;
}

export const CarMarkerList = ({ map, markers }) => {
    // pass remaining props into marker
    const items = markers.map(({ key, ...props }) => (
        <CarMarker key={key} map={map} {...props} />
    ));
    return <div style={{display: 'none'}}>{items}</div>;
}
