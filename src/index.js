'use strict';

import React from 'react';
import { render } from 'react-dom';
import Timer from './components/Timer';
import Basemap from './components/Basemap';

render(<Timer />, document.getElementById('root'));
render(<Basemap />, document.getElementById('root'));
