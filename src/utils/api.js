'use strict';

const $ = require('jquery');

export const ajax = (options) => {
    return new Promise(function (resolve, reject) {
        $.ajax(options).done(resolve).fail(reject);
    });
}

// Add parking locations
export const getLocations = () => {
    return ajax({
        url: 'http://localhost:8080/locations',
        type: 'get',
        contentType: 'application/json; charset=utf-8'
    })
}

// Add cars
export const getBookings = (timeID) => {
    return ajax({
        url: 'http://localhost:8080/booking/',
        type: 'get',
        data: { start: timeID },
        contentType: 'application/json; charset=utf-8'
    })
}

export const findLoc = (locData, locId) => {
    let elem = locData.find(x => x.id === locId);
    return [elem.latitude, elem.longitude];
}
