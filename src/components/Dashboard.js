'use strict'

import React, { Component } from 'react';
import SimpleLineChart from './SimpleLineChart';

const duration = (x) => {
    return (x.end - x.start) / 4;
}

const sum = (a, b) => a + b;

const averageBooking = (array) => {
    if (array.length > 0) {
        return parseFloat(array.map(duration).reduce(sum) / array.length).toFixed(2);
    } else {
        return 0;
    }
}

export const Dashboard = ({ carMarkers, timeID }) => {
    return (
        <div id="dashboard">
            <div id="infocards">
                <span className="kpi">{carMarkers.length} Cars In Use</span>
                <span className="fact">Average Booking {averageBooking(carMarkers)} Hours</span>
            </div>
            <div id="line-chart">
                <SimpleLineChart usage={carMarkers.length} timeID={timeID} />
            </div>
        </div>
    )
}
