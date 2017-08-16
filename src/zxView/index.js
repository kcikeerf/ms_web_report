import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';

import Home from './page/Home';
import LogIn from './page/LogIn';
import ManageAccount from './page/ManageAccount';
import ManageRelation from './page/ManageRelation';

// Expose react-addons-perf
if (process.env.NODE_ENV !== 'production') {
    window.Perf = require('react-addons-perf');
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/login" component={LogIn} />
        <Route path="/manageAccount" component={ManageAccount} />
        <Route path="/manageRelation" component={ManageRelation} />
    </Router>
), document.getElementById('root'));
//registerServiceWorker();
