'use strict'

import React from 'react';

export const Dashboard = ({ carMarkers }) => {
    return (
        <div id="infocards">
            <span className="kpi">{carMarkers.length} Cars Rented</span>
            <span className="fact">Average Booking 5.5 Hours</span>
        </div>
    )
}
