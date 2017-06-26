import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import App from './App';
import ProjectReportContainer from './page/ProjectReport/ProjectReportContainer';
import SchoolReportContainer from './page/SchoolReport/SchoolReportContainer';
import ClassReportContainer from './page/ClassReport/ClassReportContainer';
import StudentReportContainer from './page/StudentReport/StudentReportContainer';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/project" component={ProjectReportContainer} />
        <Route path="/school" component={SchoolReportContainer} />
        <Route path="/class" component={ClassReportContainer} />
        <Route path="/student" component={StudentReportContainer} />
    </Router>
), document.getElementById('root'));

registerServiceWorker();
