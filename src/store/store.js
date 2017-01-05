'use strict';

import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

/*
 * Store
 * - Holds application state
 * - Allows access to state via getState()
 * - Allows state to be updated via dispatch(action)
 * - Registers listeners via subscribe(listener)
 * - Handles unregistering of listeners via the function returned by subscribe(listener)
 */

let store = createStore(rootReducer);

import { changeMap, MapTypes } from './actions/changeMap';

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// Dispatch some actions
store.dispatch(changeMap(MapTypes.NIGHT_MAP))

// Stop listening to state updates
unsubscribe()
