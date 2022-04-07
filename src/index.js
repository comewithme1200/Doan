import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080/';
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App /> 
        </Router>
    </Provider>, 
document.getElementById('root'));

