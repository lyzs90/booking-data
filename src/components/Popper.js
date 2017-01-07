'use strict';

import React, { Component } from 'react';

const SmoovePopper = ({ shortName, id, description, deleted }) => {
    return (
        <div id ="smoovePopper">
            <h3>{shortName}</h3>
            <p>
                <b>Id:</b> {id}<br />
                <b>Deleted:</b> {deleted}<br />
                <b>Description:</b> {description}
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
