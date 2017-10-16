'use strict';

import React from 'react';

export const Popper = ({ type, ...props }) => {
    if (type === 'smove') {
        return (
            <div id ="smovePopper">
                <h3>{props.shortName}</h3>
                <p>
                    <b>Id:</b> {props.id}<br />
                    <b>Deleted:</b> {props.deleted}<br />
                    <b>Description:</b> {props.description}
                </p>
            </div>
        )
    }

    if (type === 'car') {
        return (
            <div id = "carPopper">
                <h3>Car {props.car}</h3>
                <p>
                    <b>Booking Id:</b> {props.id}
                </p>
            </div>
        )
    }
}
