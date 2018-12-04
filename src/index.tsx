import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Index from './pages/index';
import {register} from './serviceWorker';

ReactDOM.render(<Index />, document.querySelector('#root'));


register({scope: '/ma_bjoern/react-fw/'});