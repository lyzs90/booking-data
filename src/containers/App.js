'use strict';

import React, { Component } from 'react';
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
        updateTimer: (timeID) => {
            dispatch(updateTimer(timeID))
        }
    }
}

class App extends Component {
    componentDidMount () {
        // now has access to data from store i.e. this.props.mapType
        // and access to dispatch actions i.e. this.props.changeMap
        console.log(this.props.mapType);
        console.log(this.props.timeID);
        console.log(this.props.changeMap);
        console.log(this.props.updateTimer);
    }

    render () {
        // will pass down store data and dispatch components to children
        return (
            <div id="flexdiv">
                <Timer changeMap={this.props.changeMap} timeID={this.props.timeID} updateTimer={this.props.updateTimer} />
                <Basemap mapType={this.props.mapType} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
