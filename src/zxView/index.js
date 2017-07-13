import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';

import Home from './page/Home';
import LogIn from './page/LogIn';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/login" component={LogIn} />
    </Router>
), document.getElementById('root'));
//registerServiceWorker();
