'use strict';

import React from 'react';
import Menu from 'react-motion-menu';

export default class MotionMenu extends React.Component {
    render () {
        return (
            <div id="MotionMenu">
              <Menu
                direction='horizontal'
                distance={80}
                width={50}
                height={50}
                y={0}
                x={0}
                customStyle={{
                    color: '#fff',
                    textAlign: 'center',
                    lineHeight: '50px',
                    backgroundColor: '#16A085',
                    border: 'solid 1px #16A085',
                    borderRadius: '50%'
                }}>
                <i className='bars'></i>
                <a href='http://google.com'><i className='home'></i></a>
                <a href='http://google.com'><i className='heart'></i></a>
              </Menu>
            </div>
        );
    }
}
