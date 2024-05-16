import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomePage from './HomePage';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
