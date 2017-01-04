'use strict';

let timeToString = (time) => {
    return (time < 10 ? '0' : '') + time;
};

module.exports = timeToString;
