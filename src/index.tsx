import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.scss';
import {register} from './serviceWorker';
import './web-components';

ReactDOM.render(<App/>, document.querySelector('#root'));


register({scope: '/ma_bjoern/react-wc/'});