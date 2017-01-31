'use strict'

import React from 'react';
import UtilisationChart from './UtilisationChart';
import { averageDuration } from '../utils/bookingStats';

export const Dashboard = ({ carMarkers, timeID, totalBookings }) => {
    return (
        <div className="dashboard">
            <div className="dashboard__deck">
                <span className="card card--teal">{totalBookings} Total Bookings</span>
                <span className="card card--blue">{carMarkers.length} Cars In Use</span>
                <span className="card card--orange">Average Booking {averageDuration(carMarkers)} Hours</span>
            </div>
            <div className="dashboard__chart">
                <UtilisationChart usage={carMarkers.length} timeID={timeID} />
            </div>
            <div className="dashboard__text">
                <h3>Notes:</h3>
                <p>
                    Smove's current and past rental locations are marked on the map below. The car markers spawn at the start of a booking and despawns when they are returned. The dashed polylines mark instances where the start and end locations of a booking are not the same.
                </p>
            </div>
        </div>
    )
}
