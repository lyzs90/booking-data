'use strict';

import React, { Component } from 'react';
import { MapTypes } from '../actions/changeMap';
import { weeklyReset, incrementDays, incrementHours, incrementMins, cacheCountdownID } from '../utils/stateChanges';

const { DAY_MAP, NIGHT_MAP } = MapTypes;
const isNight = (hours) => hours === '18';
const isDay = (hours) => hours === '06';
const isEndOfWeek = (dayID, hours, mins) => dayID === 6 && hours === '23' && mins === '45';
const isEndOfDay = (hours, mins) => hours === '23' && mins === '45';
const isEndOfHour = (mins) => mins === '45';

export default class Timer extends Component {
    constructor (props) {
        super();
        this.state = {
            day: 'Sunday',
            dayID: 1,
            hours: '06',
            mins: '00',
            countdownID: ''
        };
    }

    componentDidMount () {
        let countdownID = setInterval(() => {
            // calculate the hours and mins from string time
            let tempHours = this.state.hours * 1;
            let tempMins = this.state.mins * 1;

            if (isEndOfWeek(this.state.dayID, this.state.hours, this.state.mins)) {
                // stop timer
                clearInterval(this.state.countdownID);
                this.setState(weeklyReset);
            } else if (isEndOfDay(this.state.hours, this.state.mins)) {
                this.setState(incrementDays);
            } else if (isEndOfHour(this.state.mins)) {
                this.setState(incrementHours(tempHours));
            } else {
                // increment by 15mins
                this.props.updateTimer();
                this.setState(incrementMins(tempMins));
            }
        }, 1000)

        this.setState(cacheCountdownID(countdownID));
    }

    componentDidUpdate () {
        if (isNight(this.state.hours)) {
            // change to night map at 6pm
            this.props.changeMap(NIGHT_MAP);
        } else if (isDay(this.state.hours)) {
            // change to day map at 6am
            this.props.changeMap(DAY_MAP);
        }
    }

    render () {
        return (
            <div className="timer">
                <div className="timer__info">
                    <p>
                        Current and past rental locations are marked on the map below. The car markers spawn at the start of a booking and despawns when they are returned. The dashed polylines mark instances where the start and end locations of a booking are not the same.
                    </p>
                </div>
                <h3 className="timer__clock">{this.state.day}, {this.state.hours}:{this.state.mins}</h3>
            </div>
        );
    }
}
