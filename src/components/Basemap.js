'use strict';

import React from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import utils from '../libs/utils';
import mapmarkers from '../libs/mapmarkers';

const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();

export default class Basemap extends React.Component {
    constructor () {
        super();
        this.state = {
        };
    }

    componentDidMount () {
        console.log('Basemap Did Mount.');
    }

    render () {
        return (
            <Map center={[center.x, center.y]} zoom={12} maxBounds={[[1.56073, 104.11475], [1.16, 103.502]]}>
                <TileLayer
                    url='https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png'
                    detectRetina='true'
                    attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                    maxZoom='18'
                    minZoom='11'
                />
            </Map>
        );
    }
}
