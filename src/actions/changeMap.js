'use strict';

/*
 * Actions are payloads of information that send data from your application to your store i.e. they describe the fact that something happened. They are the only source of information for the store. You send them to store using store.dispatch().
 */

/*
 * action types
 */

export const CHANGE_MAP = 'CHANGE_MAP';

/*
 * other constants
 */

export const MapTypes = {
    DAY_MAP: 'https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png',
    NIGHT_MAP: 'http://maps-{s}.onemap.sg/v2/Night/{z}/{x}/{y}.png'
}

/*
 * action creators
 */

export const changeMap = (mapType) => {
    return {
        type: CHANGE_MAP,
        mapType
    }
}
