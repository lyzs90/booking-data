'use strict';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { SmoovePopper, CarPopper } from './Popper';

// pass remaining props into popper
export const SmooveMarker = ({ map, position, icon, ...props }) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <SmoovePopper {...props} />
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
