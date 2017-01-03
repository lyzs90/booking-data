'use strict';

const restify = require('restify');
const bookings = require('./data/bookingdata.json');
const locations = require('./data/smoovelocations.json');

console.log(`Loaded ${bookings.length} records.`);
console.log(`Loaded ${locations.length} locations.`);

var server = restify.createServer();
server.use(restify.queryParser({ mapParams: false }));
server.use(restify.CORS({
    origins: ['http://localhost:3000'],
    credentials: true,
    headers: ['Access-Control-Allow-Origin']
}));
server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname
}));

// batch locations query
server.get('/locations', (req, res, next) => {
    res.send(locations);
    next();
});

// batch bookings query
server.get('/bookings', (req, res, next) => {
    res.send(bookings);
    next();
});

server.listen(8080, () => {
    console.log(`${server.name} listening at ${server.url}`);
});
