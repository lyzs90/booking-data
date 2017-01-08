# Booking Data Visualisation

Visualisation of one week's worth of Smoove's booking data.

<img src="https://s30.postimg.org/69cc3mo4x/viz.png" width="360">

## Dataset

A single booking consists of:

| Field        | Type         | Description  |
| ------------- |-------------| -----|
| id      | Number | Unique ID of the booking |
| car      | Number | ID of the car |
| start      | Number | Start time of the booking<br />*Time is in blocks of 15 minutes, starting at Sunday 6am. <br />E.g 4 = Sunday 7am, 96 = Monday 6am, etc.* |
| end      | Number | End time of the booking |
| start_location      | Number | ID of the bookings start location |
| end_location      | Number | ID of the bookings end location |

There are 1486 bookings, on 141 cars, using 54 locations.

## Getting Started
- Install packages: `npm install --dev`
- Start restify server: `npm start`
- In a separate terminal, start browser-sync server: `gulp`
