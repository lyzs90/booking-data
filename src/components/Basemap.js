'use strict';

import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import {ajax, findLoc} from '../utils/api';
import {setIcon, createMarkerList} from '../utils/mapmarkers';
import { SmooveMarkerList, CarMarkerList } from './MarkerList';

const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();

export default class Basemap extends Component {
    constructor (props) {
        super();
        this.state = {
            mapType: props.mapType,
            timeID: props.timeID,
            smooveMarkers: [],
            carMarkers: [],
            locData: []
        };
    }

    componentDidMount () {
        console.log('Basemap Did Mount.');
    }

    componentWillReceiveProps (nextProps) {
        console.log('Component Will Receive Props.');
        let smooveMarkers = [];
        let carMarkers = [];
        let model = {};

        ajax({  // Add parking locations
            url: 'http://localhost:8080/locations',
            type: 'get',
            contentType: 'application/json; charset=utf-8'
        }).then((locData) => {
            for (let loc of locData) {
                if (loc.deleted === 1) {
                    // pass props into markerlist
                    createMarkerList(smooveMarkers, {key: locData.indexOf(loc), position: [Number(loc.latitude), Number(loc.longitude)], icon: setIcon('http://localhost:8080/public/marker-fade.svg'), shortName: loc.parking_shortname, id: loc.id, description: loc.description, deleted: loc.deleted});
                } else {
                    // pass props into markerlist
                    createMarkerList(smooveMarkers, {key: locData.indexOf(loc), position: [Number(loc.latitude), Number(loc.longitude)], icon: setIcon('http://localhost:8080/public/marker.svg'), shortName: loc.parking_shortname, id: loc.id, description: loc.description, deleted: loc.deleted});
                }
            }
            // Persist location data for use in next ajax call
            this.setState({
                locData: locData,
                smooveMarkers: smooveMarkers
            });

            return ajax({  // Add cars
                url: 'http://localhost:8080/booking/',
                type: 'get',
                data: { start: this.state.timeID },
                contentType: 'application/json; charset=utf-8'
            });
        }).then((bookingsData) => {
            for (let booking of bookingsData) {
                // convert start and end location id to latlng
                if (booking.start === this.state.timeID) {
                    try {
                        booking.start_location = findLoc(this.state.locData, booking.start_location);
                        booking.end_location = findLoc(this.state.locData, booking.end_location)

                        // pass props into markerlist
                        createMarkerList(carMarkers, {key: bookingsData.indexOf(booking), position: [Number(booking.start_location[1]), Number(booking.start_location[0])], icon: setIcon('http://localhost:8080/public/custom-car.svg'), car: booking.car, id: booking.id});
                    } catch (err) {
                        // location doesn't exist
                    }
                }
            }
        }).then(() => {
            this.setState({
                timeID: this.props.timeID,
                carMarkers: carMarkers
            });
        }
        ).catch((error) => {
            throw error;
        });
    }

    render () {
        return (
            <Map center={[center.x, center.y]} zoom={12} maxBounds={[[1.56073, 104.11475], [1.16, 103.502]]}>
                <TileLayer
                    url={this.props.mapType}
                    detectRetina='true'
                    attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                    maxZoom='18'
                    minZoom='11'
                />
                <SmooveMarkerList markers={this.state.smooveMarkers} />
                <CarMarkerList markers={this.state.carMarkers} />
            </Map>
        );
    }
}
