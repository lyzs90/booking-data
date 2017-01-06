'use strict';

import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { ajax, findLoc } from '../utils/api';
import { setIcon, addToMarkerList, deleteFromMarkerList } from '../utils/mapmarkers';
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
    }

    componentWillReceiveProps (nextProps) {
        ajax({  // Add parking locations
            url: 'http://localhost:8080/locations',
            type: 'get',
            contentType: 'application/json; charset=utf-8'
        })
        .then((locData) => {
            for (let loc of locData) {
                // prevent buildup of smoovemarkers
                if (loc.deleted === 1 && this.state.smooveMarkers.length < locData.length) {
                    // pass props into markerlist
                    addToMarkerList(this.state.smooveMarkers, {key: locData.indexOf(loc), position: [Number(loc.latitude), Number(loc.longitude)], icon: setIcon('http://localhost:8080/public/marker-fade.svg'), shortName: loc.parking_shortname, id: loc.id, description: loc.description, deleted: loc.deleted});
                } else if (loc.deleted === 0 && this.state.smooveMarkers.length < locData.length) {
                    // pass props into markerlist
                    addToMarkerList(this.state.smooveMarkers, {key: locData.indexOf(loc), position: [Number(loc.latitude), Number(loc.longitude)], icon: setIcon('http://localhost:8080/public/marker.svg'), shortName: loc.parking_shortname, id: loc.id, description: loc.description, deleted: loc.deleted});
                }
            }
            // Persist location data for use in next ajax call
            this.setState({
                locData: locData
            });

            return ajax({  // Add cars
                url: 'http://localhost:8080/booking/',
                type: 'get',
                data: { start: this.state.timeID },
                contentType: 'application/json; charset=utf-8'
            });
        })
        .then((bookingsData) => {
            for (let booking of bookingsData) {
                // spawn car markers when booking starts
                if (booking.start === this.state.timeID) {
                    try {
                        // convert start and end location id to latlng
                        booking.start_location = findLoc(this.state.locData, booking.start_location);
                        booking.end_location = findLoc(this.state.locData, booking.end_location)

                        // pass props into markerlist
                        addToMarkerList(this.state.carMarkers, {key: bookingsData.indexOf(booking), position: [Number(booking.start_location[1]), Number(booking.start_location[0])], icon: setIcon('http://localhost:8080/public/custom-car.svg'), car: booking.car, id: booking.id, end: booking.end});
                    } catch (err) {
                        // Location ID does not exist
                    }
                }
            }
        })
        .then(() => {
            // iterate through existing car marker list and remove those whose bookings ended
            deleteFromMarkerList(this.state.carMarkers, this.state.timeID);
        })
        .then(() => {
            this.setState({
                timeID: this.props.timeID
            });
        })
        .catch((error) => {
            throw error;
        });
    }

    render () {
        return (
            <div id="basemap">
                <div id="infocards">
                    <span className="kpi">{this.state.carMarkers.length} Cars Rented</span>
                    <span className="fact">Average Booking 5.5 Hours</span>
                </div>
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
            </div>

        );
    }
}
