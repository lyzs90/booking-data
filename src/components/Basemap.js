'use strict';

import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import { getLocations, getBookings, findLoc } from '../utils/api';
import { initBasemap, getActiveCars, setIcon, addToMarkerList, deleteFromMarkerList } from '../utils/mapmarkers';
import { cacheLocations, spawnSmoveMarkers, updateTotalBookings, addPolylines, updateTimeID, updateCarMarkers } from '../utils/stateChanges';
import { SmoveMarkerList, CarMarkerList } from './MarkerList';
import { PolylineList } from './PolylineList'
import { Dashboard } from './Dashboard';

const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();

export default class Basemap extends Component {
    constructor (props) {
        super();
        this.state = {
            smoveMarkers: [],
            carMarkers: [],
            locData: [],
            totalBookings: 0,
            polyLineList: []
        };
    }

    componentDidMount () {
        getLocations()
        .then((locData) => initBasemap(locData))
        .then((results) => {
            this.setState(cacheLocations(results.locData));  // Persist location data for use in findLoc call
            this.setState(spawnSmoveMarkers(results.activeMarkers, results.inactiveMarkers));
        })
        .catch((error) => {
            throw error;
        });
    }

    componentWillReceiveProps (nextProps) {
        const basemap = this;
        getBookings(nextProps.timeID)
        .then((bookingsData) => {
            // record no. of bookings
            this.setState(updateTotalBookings(bookingsData));
            return bookingsData;
        })
        .then((bookingsData) => getActiveCars(basemap, nextProps, bookingsData))
        .then((activeCars) => {
            // append new bookings
            this.setState(updateCarMarkers([...this.state.carMarkers, ...activeCars]))
        })
        .then(() => {
            // iterate through existing car marker list and remove those whose bookings ended
            let activeCars = deleteFromMarkerList(this.state.carMarkers, nextProps.timeID);
            this.setState(updateCarMarkers(activeCars));
        })
        .then(() => {
            this.setState(updateTimeID);  // can just use function name here
        })
        .catch((error) => {
            throw error;
        });
    }

    render () {
        return (
            <div className="basemap">
                <Dashboard carMarkers={this.state.carMarkers} timeID={this.state.timeID} totalBookings={this.state.totalBookings} />
                <Map center={[center.x, center.y]} zoom={12} maxBounds={[[1.56073, 104.11475], [1.16, 103.502]]}>
                    <TileLayer
                        url={this.props.mapType}
                        detectRetina='true'
                        attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                        maxZoom='18'
                        minZoom='11'
                    />
                    <SmoveMarkerList markers={this.state.smoveMarkers} />
                    <CarMarkerList markers={this.state.carMarkers} />
                    <PolylineList polylines={this.state.polyLineList} />
                </Map>
            </div>

        );
    }
}
