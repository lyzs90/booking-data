'use strict';

import _ from 'lodash';

import { timeToString } from '../utils/timeToString';

/*
  Fuctional setState: Declare state update logic outside of component class. setState will take a function of signature (state, props) => newState. If you need to pass in extra arguments, you have to wrap your functional setState in another function.
  Benefits:
  - Safer handling of multiple setState calls
  - Easier to test state changes
  - Declarative i.e. component class no longer cares how state updates
  - Clean / resuable code
*/

/*
    Basemap setState Functions
*/
export const cacheLocations = (locData) => {
    return () => ({
        locData
    });
};

export const spawnSmoveMarkers = (inactiveMarkers, activeMarkers) => {
    return () => ({
        smoveMarkers: [...inactiveMarkers, ...activeMarkers]
    });
};

export const updateTotalBookings = (bookingsData) => {
    return (state) => ({
        totalBookings: state.totalBookings + bookingsData.length
    });
};

export const addPolylines = (tmpPolyline) => {
    return (state) => ({
        polyLineList: state.polyLineList.concat([tmpPolyline])
    });
};

export const updateCarMarkers = (activeCars, inactiveCars) => {
    return (state) => ({
        // return the diff between both arrays i.e. remove inactiveCars
        carMarkers: _.difference([...state.carMarkers, ...activeCars], inactiveCars)
    });
};

/*
    Timer setState Functions
*/
export const weeklyReset = () => ({
    hours: '00',
    mins: '00',
    dayID: 0,
    day: 'Sunday'
});

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const incrementDays = (state) => ({
    hours: '00',
    dayID: state.dayID + 1,
    day: days[state.dayID]
});

export const incrementHours = (tempHours) => {
    return () => ({
        mins: '00',
        hours: timeToString(tempHours + 1)
    });
};

export const incrementMins = (tempMins) => {
    return () => ({
        mins: timeToString(tempMins + 15)
    });
};

export const cacheCountdownID = (countdownID) => {
    return () => ({
        countdownID
    });
};


