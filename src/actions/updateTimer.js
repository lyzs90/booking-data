'use strict';

/*
 * action types
 */

export const INCREMENT = 'INCREMENT';

/*
 * action creators
 */

export const updateTimer = (timeID) => {
    return {
        type: INCREMENT,
        timeID
    }
}
