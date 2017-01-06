'use strict';

import React, { Component } from 'react';
import { MapTypes } from '../actions/changeMap';
import timeToString from '../utils/timeToString';

const { DAY_MAP, NIGHT_MAP } = MapTypes;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default class Timer extends Component {
    constructor (props) {
        super();
        this.state = {
            day: 'Sunday',
            dayID: 1,
            hours: '06',
            mins: '00',
            timeID: props.timeID,
            countdownID: ''
        };
    }

    componentDidMount () {
        let count = setInterval(() => {
            // calculate the hours and mins from bigTime
            let tempHours = this.state.hours * 1;
            let tempMins = this.state.mins * 1;

            if (this.state.dayID === 6 && this.state.hours === '23' && this.state.mins === '45') {
                // stop timer
                clearInterval(this.state.countdownID);
                this.setState({
                    hours: '00',
                    mins: '00',
                    dayID: 0,
                    day: days[this.state.dayID]
                });
            } else if (this.state.hours === '23' && this.state.mins === '45') {
                this.setState({
                    hours: '00',
                    dayID: this.state.dayID + 1,
                    day: days[this.state.dayID]
                });
            } else if (this.state.mins === '45') {
                this.setState({
                    mins: '00',
                    hours: timeToString(tempHours + 1)
                });
            } else {
                // increment by 15mins
                this.setState({
                    mins: timeToString(tempMins + 15),
                    timeID: this.props.updateTimer(this.state.timeID)
                });
            }
        }, 1000)

        this.setState({
            countdownID: count
        });
    }

    componentWillReceiveProps (nextProps) {
        if (this.state.hours === '18') {
            // change to night map at 6pm
            this.props.changeMap(NIGHT_MAP);
        } else if (this.state.hours === '06') {
            // change to day map at 6am
            this.props.changeMap(DAY_MAP);
        }
    }

    render () {
        return (
            <div id="timer">
                <h1>Visualising a week's worth of booking data...</h1>
                <h3>{this.state.day}, {this.state.hours}:{this.state.mins}</h3>
            </div>
        );
    }
}
