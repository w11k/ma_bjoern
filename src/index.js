// Import Framework7-React plugin
import Framework7React from 'framework7-react';
// Framework7 styles
import 'framework7/css/framework7.min.css';
// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle';
// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
// Import main App component
import App from './components/App.jsx';
// Custom app styles
import './css/app.css';
// Icons
import './css/icons.css';
// ServiceWorker
import * as serviceWorker from './serviceWorker';

// Init Framework7-React plugin
Framework7.use(Framework7React);

// Mount React App
ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register({scope: '/ma_bjoern/react-nui/'});
