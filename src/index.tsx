import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import {register} from './serviceWorker';

ReactDOM.render(<App/>, document.querySelector('#root'));


register({scope: '/ma_bjoern/react-fw/'});