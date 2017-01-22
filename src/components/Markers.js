'use strict';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { SmovePopper, CarPopper } from './Popper';

// pass remaining props into popper
export const SmoveMarker = ({ map, position, icon, ...props }) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <SmovePopper {...props} />
        </Popup>
    </Marker>
)

// pass remaining props into popper
export const CarMarker = ({ map, position, icon, ...props }) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <CarPopper {...props} />
        </Popup>
    </Marker>
)
