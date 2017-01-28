'use strict';

/*
 * action types
 */

export const INCREMENT = 'INCREMENT';

/*
 * action creators
 */

export const updateTimer = () => {
    return {
        type: INCREMENT
    }
}
