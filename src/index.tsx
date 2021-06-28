import React from 'react';
import ReactDOM from 'react-dom';
import moment from "moment";
import "moment-timezone";
import App from './App';

moment.tz.setDefault("Asia/Hong_Kong");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

