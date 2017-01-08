'use strict'

import React, { Component } from 'react';
import SimpleLineChart from './SimpleLineChart';
import { averageDuration } from '../utils/bookingStats';

export const Dashboard = ({ carMarkers, timeID }) => {
    return (
        <div id="dashboard">
            <div id="infocards">
                <span className="kpi">{carMarkers.length} Cars In Use</span>
                <span className="fact">Average Booking {averageDuration(carMarkers)} Hours</span>
            </div>
            <div id="line-chart">
                <SimpleLineChart usage={carMarkers.length} timeID={timeID} />
            </div>
        </div>
    )
}
