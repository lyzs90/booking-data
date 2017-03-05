'use strict';

import React from 'react';
import Basemap from '../components/Basemap';

import { connect } from 'react-redux'
import { changeMap } from '../actions/changeMap';
import { updateTimer } from '../actions/updateTimer';

// use connect method if 'smart' components need to listen to the store
const mapStateToProps = (state) => {
    return {
        mapType: state.mapType,
        timeID: state.timeID,
        locData: state.locations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLocations: () => {
            dispatch({type: 'FETCH_LOCATIONS_REQUESTED'})
        },
        getBookings: (timeID) => {
            dispatch({type: 'FETCH_BOOKINGS_REQUESTED', payload: {timeID}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basemap);
