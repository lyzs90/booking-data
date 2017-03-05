'use strict';

/*
  Fuctional setState: Declare state update logic outside of component class. setState will take a function of signature (state, props) => newState. If you need to pass in extra arguments, you have to wrap your functional setState in another function.
  Benefits:
  - Safer handling of multiple setState calls
  - Easier to test state changes
  - Declarative i.e. component class no longer cares how state updates
  - Clean / resuable code
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

// doesnt require extra arguments, just prev state and props
export const updateTimeID = (state, props) => ({
    timeID: props.timeID
})

export const updateCarMarkers = (array) => {
    return () => ({
        carMarkers: array
    });
};

