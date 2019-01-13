import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import App from './App';
import board_reducer from './reducer/App_reducer';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import './index.css';

const logger = createLogger();
let store = createStore(board_reducer, applyMiddleware(thunk, logger));
//let store = createStrore(board_reducer, window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()); => ??

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();
