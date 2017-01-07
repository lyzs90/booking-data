'use strict'

import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class SimpleLineChart extends Component {
    constructor (props) {
        super();
        this.state = {
            data: []
        };
    }

    componentWillReceiveProps (nextProps) {
        let tmpData = [{name: this.props.timeID, usage: this.props.usage}];
        // TODO: store prev data
        this.setState({
            data: tmpData
        })
    }

    render () {
        return (
            <LineChart width={300} height={200} data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="name"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line type="monotone" dataKey="usage" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        )
    }
}
