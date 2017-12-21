import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import Routes from './routes';

// create store with middleware
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

//these are all the routes, start with signup page
const RoutesProvider = (
    <Provider store={store}>
        <BrowserRouter>
            { Routes }
        </BrowserRouter>
    </Provider>
);

render(RoutesProvider, document.getElementById('app'));