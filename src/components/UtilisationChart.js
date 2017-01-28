'use strict'

import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const totalCars = 141;

export default class UtilisationChart extends Component {
    constructor (props) {
        super();
        this.state = {
            data: []
        };
    }

    componentWillReceiveProps (nextProps) {
        let tmpData = [{name: this.props.timeID, usage: Math.round(this.props.usage / totalCars * 100)}];
        this.setState({
            data: [...this.state.data, ...tmpData]
        })
    }

    render () {
        return (
                <AreaChart width={500} height={200} data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="name" label="Time" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Legend />
               <Area name="Fleet Utilisation (%)" type="monotone" dataKey="usage" stroke="#8884d8" fill="#8884d8" activeDot={{r: 8}} />
            </AreaChart>
        )
    }
}
