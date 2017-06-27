import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import getCookie from 'zx-misc/getCookie';

import handleReportType from '../../misc/handleReportType';
import handlePromiseReport from '../../misc/handlePromiseReport';
import handlePromiseOptional from '../../misc/handlePromiseOptional';

//let config = require('zx-const')[process.env.NODE_ENV];

class StudentReportContainer extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        let wxOpenid = getCookie('wx_openid');
        let userName = getCookie('user_name');
        let reportUrl = getCookie('report_url');

        // 根据报告的url判定报告的类型
        let reportType = handleReportType(reportUrl);

        // 报告内容的api数据
        let promiseReport = handlePromiseReport(userName, wxOpenid, reportType, reportUrl);

        // 报告optional的api数据
        let promiseOptional = handlePromiseOptional(userName, wxOpenid, reportUrl);

        // 处理返回的数据
        $.when(promiseReport).done(function(responseReport) {
        }.bind(this));
    }

    render() {
        return (
            <div>
                <h1>学生报告</h1>
            </div>
        )
    }
}

export default StudentReportContainer;
