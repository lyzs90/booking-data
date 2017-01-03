'use strict';

const $ = require('jquery');

let ajax = (options) => {
    return new Promise(function (resolve, reject) {
        $.ajax(options).done(resolve).fail(reject);
    });
}

let findLoc = (locData, locId) => {
    let elem = locData.find(x => x.id === locId);
    return [elem.longitude, elem.latitude];
}

module.exports = {ajax, findLoc};
