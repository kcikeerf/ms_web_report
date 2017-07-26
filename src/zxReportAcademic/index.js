import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import registerServiceWorker from './registerServiceWorker';

import Home from './page/Home';
import ReportContainer from './page/ReportContainer';

import ProjectReportContainer from './page/ProjectReport/ProjectReportContainer';
import SchoolReportContainer from './page/SchoolReport/SchoolReportContainer';
import ClassReportContainer from './page/ClassReport/ClassReportContainer';
import StudentReportContainer from './page/StudentReport/StudentReportContainer';

// Expose react-addons-perf
if (process.env.NODE_ENV !== 'production') {
    window.Perf = require('react-addons-perf');
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/report" component={ReportContainer} />
        <Route path="/project" component={ProjectReportContainer} />
        <Route path="/school" component={SchoolReportContainer} />
        <Route path="/class" component={ClassReportContainer} />
        <Route path="/student" component={StudentReportContainer} />
    </Router>
), document.getElementById('root'));

//registerServiceWorker();
