'use strict';

const $ = require('jquery');

export const ajax = (options) => {
    return new Promise(function (resolve, reject) {
        $.ajax(options).done(resolve).fail(reject);
    });
}

export const findLoc = (locData, locId) => {
    let elem = locData.find(x => x.id === locId);
    return [elem.latitude, elem.longitude];
}
