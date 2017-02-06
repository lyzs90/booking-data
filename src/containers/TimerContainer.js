'use strict';

import React from 'react';
import Timer from '../components/Timer';

import { connect } from 'react-redux'
import { changeMap } from '../actions/changeMap';
import { updateTimer } from '../actions/updateTimer';

// use connect method if 'smart' components need to listen to the store
const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
