'use strict';

import React from 'react';
import { SmoveMarker, CarMarker } from './Markers';

export const SmoveMarkerList = ({ map, markers }) => {
    // pass remaining props into marker
    const items = markers.map(({ key, ...props }) => (
        <SmoveMarker key={key} map={map} {...props} />
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
