'use strict'

import React from 'react';
import UtilisationChart from './UtilisationChart';
import { averageDuration } from '../utils/bookingStats';

export const Dashboard = ({ carMarkers, timeID, totalBookings }) => {
    return (
        <div id="dashboard">
            <div id="infocards">
                <span className="kpi1">{totalBookings} Total Bookings</span>
                <span className="kpi2">{carMarkers.length} Cars In Use</span>
                <span className="kpi3">Average Booking {averageDuration(carMarkers)} Hours</span>
            </div>
            <div id="line-chart">
                <UtilisationChart usage={carMarkers.length} timeID={timeID} />
            </div>
            <div id="desc">
                <h3>Notes:</h3>
                <p>
                    Smove's current and past rental locations are marked on the map below. The car markers spawn at the start of a booking and despawns when they are returned. The dashed polylines mark instances where the start and end locations of a booking are not the same.
                </p>
            </div>
        </div>
    )
}
