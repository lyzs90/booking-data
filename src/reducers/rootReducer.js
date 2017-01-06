'use strict';

import { combineReducers } from 'redux';
import { CHANGE_MAP, MapTypes } from '../actions/changeMap';
import { INCREMENT } from '../actions/updateTimer';

const { DAY_MAP } = MapTypes;

/*
 * Reducers specify how the application state changes in response to actions
 * NEVER: mutate arguments, perform side effects eg. API calls and routing transitions, or call non-pure functions eg. Date.now() or Math.random()
 */

const mapType = (state = DAY_MAP, action) => {
    switch (action.type) {
        case CHANGE_MAP:
            return action.mapType
        default:
            return state;
    }
}

const timeID = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    mapType,
    timeID
})

export default rootReducer;
