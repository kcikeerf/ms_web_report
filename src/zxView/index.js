import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';

import Home from './page/Home';
import LogIn from './page/LogIn';
import ManageAccount from './page/ManageAccount';
import ManageRelation from './page/ManageRelation';
import IncorrentItem from './page/IncorrentItem';

// Expose react-addons-perf
if (process.env.NODE_ENV !== 'production') {
    window.Perf = require('react-addons-perf');
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/login" component={LogIn} />
        <Route path="/manage-account" component={ManageAccount} />
        <Route path="/manage-relation" component={ManageRelation} />
        <Route path="/incorrect-item" component={IncorrentItem} />
    </Router>
), document.getElementById('root'));
//registerServiceWorker();
