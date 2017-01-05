'use strict';

import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { SmoovePopper, CarPopper } from './Popper';

// Define markers as stateless functional components

// pass remaining props into popper
const SmooveMarker = ({ map, position, icon, ...props }) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <SmoovePopper {...props} />
        </Popup>
    </Marker>
)

// pass remaining props into popper
const CarMarker = ({ map, position, icon, ...props }) => (
    <Marker map={map} position={position} icon={icon}>
        <Popup>
            <CarPopper {...props} />
        </Popup>
    </Marker>
)

module.exports = {SmooveMarker, CarMarker};
