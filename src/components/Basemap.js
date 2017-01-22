'use strict';

import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import { ajax, findLoc } from '../utils/api';
import { setIcon, addToMarkerList, deleteFromMarkerList } from '../utils/mapmarkers';
import { SmoveMarkerList, CarMarkerList } from './MarkerList';
import { PolylineList } from './PolylineList'
import { Dashboard } from './Dashboard';

const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();

export default class Basemap extends Component {
    constructor (props) {
        super();
        this.state = {
            mapType: props.mapType,
            timeID: props.timeID,
            smoveMarkers: [],
            carMarkers: [],
            locData: [],
            totalBookings: 0,
            polyLineList: []
        };
    }

    componentDidMount () {
        ajax({ // Add parking locations
            url: 'http://localhost:8080/locations',
            type: 'get',
            contentType: 'application/json; charset=utf-8'
        })
        .then((locData) => {
            const inactiveMarkers = locData
                .filter((loc) => loc.deleted === 1)
                .map((loc) => {
                    return {key: locData.indexOf(loc), position: [Number(loc.latitude), Number(loc.longitude)], icon: setIcon('http://localhost:8080/public/marker-fade.svg'), shortName: loc.parking_shortname, id: loc.id, description: loc.description, deleted: loc.deleted}
                });

            const activeMarkers = locData
                .filter((loc) => loc.deleted === 0)
                .map((loc) => {
                    return {key: locData.indexOf(loc), position: [Number(loc.latitude), Number(loc.longitude)], icon: setIcon('http://localhost:8080/public/marker.svg'), shortName: loc.parking_shortname, id: loc.id, description: loc.description, deleted: loc.deleted}
                });

            return {
                locData,
                inactiveMarkers,
                activeMarkers
            };
        })
        .then((results) => {
            this.setState({
                locData: results.locData,  // Persist location data for use in next ajax call
                smoveMarkers: [...results.inactiveMarkers, ...results.activeMarkers]
            });
        })
        .catch((error) => {
            throw error;
        });
    }

    componentWillReceiveProps (nextProps) {
        ajax({  // Add cars
            url: 'http://localhost:8080/booking/',
            type: 'get',
            data: { start: this.state.timeID },
            contentType: 'application/json; charset=utf-8'
        })
        .then((bookingsData) => {
            // record no. of bookings
            this.setState({
                totalBookings: this.state.totalBookings + bookingsData.length
            });
            return bookingsData;
        })
        .then((bookingsData) => {
            const activeCars = bookingsData
                .filter((booking) => booking.start === this.state.timeID)
                .map((booking) => {
                    try {
                        // convert start and end location id to latlng
                        booking.start_location = findLoc(this.state.locData, booking.start_location);
                        booking.end_location = findLoc(this.state.locData, booking.end_location)

                        // draw polyline if start location =/= end location
                        if (JSON.stringify(booking.start_location) !== JSON.stringify(booking.end_location)) {
                            let tmpPolyline = [
                                booking.start_location,
                                booking.end_location
                            ];
                            this.setState({
                                polyLineList: this.state.polyLineList.concat([tmpPolyline])
                            })
                        }

                        // pass props into markerlist
                        return {key: bookingsData.indexOf(booking), position: [Number(booking.start_location[0]), Number(booking.start_location[1])], icon: setIcon('http://localhost:8080/public/custom-car.svg'), car: booking.car, id: booking.id, start: booking.start, end: booking.end};
                    } catch (err) {
                        // Location ID does not exist
                        return false;
                    }
                })
                .filter(Boolean)
            console.log(activeCars)
            return activeCars;
        })
        .then((activeCars) => {
            this.setState({
                carMarkers: this.state.carMarkers.concat(...activeCars)
            })
        })
        .then(() => {
            // iterate through existing car marker list and remove those whose bookings ended
            return deleteFromMarkerList(this.state.carMarkers, this.state.timeID);
        })
        .then((carMarkers) => {
            this.setState({
                timeID: this.props.timeID,
                carMarkers: carMarkers
            });
        })
        .catch((error) => {
            throw error;
        });
    }

    render () {
        return (
            <div id="basemap">
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
