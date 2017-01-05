'use strict';

import React, { Component } from 'react';
import Timer from '../components/Timer';
import Basemap from '../components/Basemap';

import { connect } from 'react-redux'
import { changeMap } from '../actions/changeMap';

// use connect method if 'smart' components need to listen to the store
const mapStateToProps = (state) => {
    return {
        mapType: state.mapType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMap: (mapType) => {
            dispatch(changeMap(mapType))
        }
    }
}

class App extends Component {
    componentDidMount () {
        // now has access to data from store i.e. this.props.mapType
        // and access to dispatch actions i.e. this.props.changeMap
        console.log(this.props.mapType);
        console.log(this.props.changeMap);
    }

    render () {
        // will pass down store data and dispatch components to children
        return (
            <div>
                <Timer changeMap={this.props.changeMap} />
                <Basemap mapType={this.props.mapType} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
