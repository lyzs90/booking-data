'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import App from './containers/App';

/*
 * Store
 * - Holds application state
 * - Allows access to state via getState()
 * - Allows state to be updated via dispatch(action)
 * - Registers listeners via subscribe(listener)
 * - Handles unregistering of listeners via the function returned by subscribe(listener)
 */

let store = createStore(rootReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
