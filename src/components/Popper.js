'use strict';

import React, { Component } from 'react';

// Define poppers as stateless functional components

const SmoovePopper = (props) => {
    return (
        <div id ="smoovePopper">
            <h3>{props.shortName}</h3>
            <p>
                <b>Id:</b> {props.id}<br />
                <b>Description:</b> {props.description}<br />
                <b>Deleted:</b> {props.deleted}
            </p>
        </div>
    )
}

const CarPopper = (props) => {
    return (
        <div id = "carPopper">
            <h3>Car {props.car}</h3>
            <p>
                <b>Booking Id:</b> {props.id}
            </p>
        </div>
    )
}

module.exports = {SmoovePopper, CarPopper};
