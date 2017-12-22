import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import App from './components/containers/App';

const history = createHistory();

const initialState = {};
const middleware = [thunk, routerMiddleware(history), logger]

// create store with middleware
const configuredMiddleware = applyMiddleware(...middleware);
const store = createStore(reducers, initialState, configuredMiddleware);

//these are all the routes, start with signup page
const RoutesProvider = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

render(RoutesProvider, document.getElementById('app'));