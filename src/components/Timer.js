'use strict';

import React from 'react';

export default class Timer extends React.Component {
    constructor () {
        super();
        this.state = {
            day: 'Sunday',
            hours: '06',
            mins: '00'
        };
    }

    componentDidMount () {
        console.log('Timer Did Mount.');
    }

    render () {
        return (
          <div id="timer"></div>
        );
    }
}
