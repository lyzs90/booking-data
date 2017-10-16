'use strict';

import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';

import { findLoc } from '../utils/api';
import { initBasemap, getActiveCars, getInactiveCars } from '../utils/mapmarkers';
import { cacheLocations, spawnSmoveMarkers, updateTotalBookings, addPolylines, updateTimeID, updateCarMarkers } from '../utils/stateChanges';

import { MarkerList } from './MarkerList';
import { PolylineList } from './PolylineList'
import { Dashboard } from './Dashboard';

const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();

export default class Basemap extends Component {
    constructor (props) {
        super();
        this.state = {
            smoveMarkers: [],
            carMarkers: [],
            totalBookings: 0,
            polyLineList: []
        };
    }

    componentDidMount () {
        // prefetch locations
        this.props.getLocations();
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.locData.length === 0 && nextProps.locData.length !== 0) {
            // if basemap not initialised
            const results = initBasemap(nextProps.locData);
            this.setState(spawnSmoveMarkers(results.activeMarkers, results.inactiveMarkers));
        }

        if (nextProps.timeID - this.props.timeID === 1) {
            const basemap = this;
            this.props.getBookings(this.props.timeID)

            // record no. of bookings
            this.setState(updateTotalBookings(this.props.bookingsData));

            // append new bookings
            const activeCars = getActiveCars(basemap, this.props);
            this.setState(updateCarMarkers(activeCars, []))

            // iterate through existing car marker list and remove those whose bookings ended
            const inactiveCars = getInactiveCars(this.state.carMarkers, this.props.timeID);
            this.setState(updateCarMarkers([], inactiveCars));
        }
    }

    render () {
        return (
            <div className="basemap">
                <Dashboard carMarkers={this.state.carMarkers} timeID={this.props.timeID} totalBookings={this.state.totalBookings} />
                <Map center={[center.x, center.y]} zoom={12} maxBounds={[[1.56073, 104.11475], [1.16, 103.502]]}>
                    <TileLayer
                        url={this.props.mapType}
                        detectRetina='true'
                        attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                        maxZoom='18'
                        minZoom='11'
                    />
                    <MarkerList type="smove" markers={this.state.smoveMarkers} />
                    <MarkerList type="car" markers={this.state.carMarkers} />
                    <PolylineList polylines={this.state.polyLineList} />
                </Map>
            </div>

        );
    }
}
