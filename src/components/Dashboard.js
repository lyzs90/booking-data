'use strict'

import React from 'react';
import UtilisationChart from './UtilisationChart';
import { averageDuration } from '../utils/bookingStats';

export const Dashboard = ({ carMarkers, timeID, totalBookings }) => {
    return (
        <div className="dashboard">
            <div className="dashboard__deck">
                <div className="card card--blue">
                    <div className="card__metric">{totalBookings}</div>
                    <div className="card__desc">Total Bookings</div>
                </div>
                <div className="card card--blue">
                    <div className="card__metric">{carMarkers.length}</div>
                    <div className="card__desc">Cars In Use</div>
                </div>
                <div className="card card--blue">
                    <div className="card__metric">{averageDuration(carMarkers)}</div>
                    <div className="card__desc">Average Booking (Hrs)</div>
                </div>
            </div>
            <div className="dashboard__chart">
                <UtilisationChart usage={carMarkers.length} timeID={timeID} />
            </div>
        </div>
    )
}
