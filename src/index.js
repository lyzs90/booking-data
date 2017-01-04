'use strict';

import React from 'react';
import { render } from 'react-dom';
import Timer from './components/Timer';
import Basemap from './components/Basemap';

// TODO: day night cycle http://maps-{s}.onemap.sg/v2/Night/{z}/{x}/{y}.png

render(<Timer />, document.getElementById('timer'));
render(<Basemap />, document.getElementById('map'));
