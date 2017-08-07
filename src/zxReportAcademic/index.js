import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

//import registerServiceWorker from './registerServiceWorker';

import Home from './page/Home';
import ReportContainer from './page/ReportContainer';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/report" component={ReportContainer} />
    </Router>
), document.getElementById('root'));

//registerServiceWorker();
