'use strict';

import React from 'react';
import { Polyline } from 'react-leaflet';

export const PolylineList = ({ polylines }) => {
    // pass remaining props into marker
    const items = polylines.map((latlng) => (
        <Polyline positions={latlng} />
    ));
    return <div style={{display: 'none'}}>{items}</div>;
}
