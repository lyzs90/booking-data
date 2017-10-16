'use strict';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Popper } from './Popper';

// pass remaining props into popper
export const MarkerComponent = ({ map, position, icon, ...props }) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <Popper {...props} />
        </Popup>
    </Marker>
)
