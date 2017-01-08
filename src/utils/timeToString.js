'use strict';

export const timeToString = (time) => {
    return (time < 10 ? '0' : '') + time;
};
