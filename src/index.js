import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import board_reducer from './reducers/App_reducer';
import * as serviceWorker from './serviceWorker';
import './index.css';

let store = createStore(board_reducer);
//let store = createStrore(board_reducer, window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()); => ??

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();
