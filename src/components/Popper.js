'use strict';

import React, { Component } from 'react';

// Define poppers as stateless functional components

const SmoovePopper = ({ shortName, id, description, deleted }) => {
    return (
        <div id ="smoovePopper">
            <h3>{shortName}</h3>
            <p>
                <b>Id:</b> {id}<br />
                <b>Description:</b> {description}<br />
                <b>Deleted:</b> {deleted}
            </p>
        </div>
    )
}

const CarPopper = ({ car, id }) => {
    return (
        <div id = "carPopper">
            <h3>Car {car}</h3>
            <p>
                <b>Booking Id:</b> {id}
            </p>
        </div>
    )
}

module.exports = {SmoovePopper, CarPopper};
