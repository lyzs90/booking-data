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
        timeID: state.timeID
    }
}

export default connect(mapStateToProps)(Basemap);
