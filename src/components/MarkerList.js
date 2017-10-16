'use strict';

import React from 'react';
import { MarkerComponent } from './Marker';

export const MarkerList = ({ map, type, markers }) => {
    // pass remaining props into marker
    const items = markers.map(({ key, ...props }) => (
        <MarkerComponent key={key} map={map} {...props} />
    ));
    return <div style={{display: 'none'}}>{items}</div>;
}