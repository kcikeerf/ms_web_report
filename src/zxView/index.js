import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';

import Home from './page/Home';
import LogIn from './page/LogIn';
import Settings from './page/Settings';
import BindUser from './page/BindUser';

// Expose react-addons-perf
if (process.env.NODE_ENV !== 'production') {
    window.Perf = require('react-addons-perf');
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/login" component={LogIn} />
        <Route path="/settings" component={Settings} />
        <Route path="/bindUser" component={BindUser} />
    </Router>
), document.getElementById('root'));
//registerServiceWorker();
