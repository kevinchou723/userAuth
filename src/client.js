"use strict"
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

// create store with middleware
const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

const Routes = (
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path="/" component={} />
            <Route exact path="/" component={} />
            <Route exact path="/" component={} />
        </BrowserRouter>
    </Provider>
)

render(
    Routes, document.getElementById('app')
);