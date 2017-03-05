import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas';

/*
    Store:
        - Holds application state
        - Allows access to state via getState()
        - Allows state to be updated via dispatch(action)
        - Registers listeners via subscribe(listener)
        - Handles unregistering of listeners via the function returned by subscribe(listener)
 */

const sagaMiddleware = createSagaMiddleware();

const enhancers = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    rootReducer,
    enhancers
);

sagaMiddleware.run(rootSaga);

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/rootReducer').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;
