'use strict';

const isEmpty = (array) => {
    return array.length === 0;
}

const duration = (x) => {
    return (x.end - x.start) / 4;
}

const sum = (a, b) => a + b;

export const averageDuration = (array) => {
    if (!isEmpty(array)) {
        return parseFloat(array.map(duration).reduce(sum) / array.length).toFixed(2);
    } else {
        return 0;
    }
}
