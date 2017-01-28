'use strict';

import React from 'react';
import Timer from '../components/Timer';
import Basemap from '../components/Basemap';

import { connect } from 'react-redux'
import { changeMap, MapTypes } from '../actions/changeMap';
import { updateTimer } from '../actions/updateTimer';

// use connect method if 'smart' components need to listen to the store
const mapStateToProps = (state) => {
    return {
        mapType: state.mapType,
        timeID: state.timeID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMap: (mapType) => {
            dispatch(changeMap(mapType))
        },
        updateTimer: () => {
            dispatch(updateTimer())
        }
    }
}

const App = ({ changeMap, updateTimer, mapType, timeID }) => {
    return (
        <div id="flexdiv">
            <Timer changeMap={changeMap} timeID={timeID} updateTimer={updateTimer} />
            <Basemap mapType={mapType} timeID={timeID} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
