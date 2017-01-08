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
        this.setState({
            data: this.state.data.concat(tmpData)
        })
    }

    render () {
        return (
                <LineChart width={500} height={200} data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="name" label="Time" />
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line name="No. of Cars in Use" type="monotone" dataKey="usage" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        )
    }
}
