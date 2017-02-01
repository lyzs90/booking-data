'use strict';

// Add parking locations
export const getLocations = () => {
    return fetch('http://localhost:8080/locations', {
        method: 'GET',
        mode: 'cors',  // no-cors by default
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        })
    }).then((response) => response.json())
}

// Add cars
export const getBookings = (timeID) => {
    // parameters
    const params = {
        'start': timeID
    };
    // encode URI i.e. spaces to %20
    const esc = encodeURIComponent;
    // map to query object
    const query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    return fetch(`http://localhost:8080/booking/?${query}`, {
        method: 'GET',
        mode: 'cors',  // no-cors by default
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        })
    }).then((response) => response.json())
}

export const findLoc = (locData, locId) => {
    let elem = locData.find(x => x.id === locId);
    return [elem.latitude, elem.longitude];
}
