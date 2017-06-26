import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

function handlePromiseReport(userName, wxOpenid, reportType, reportUrl) {
    let addressGetReport = config.API_DOMAIN;
    if (reportType === 'pupil') {
        addressGetReport += config.API_GET_REPORT_PUPIL;
    }
    else if (reportType === 'klass') {
        addressGetReport += config.API_GET_REPORT_KLASS;
    }
    else if (reportType === 'grade') {
        addressGetReport += config.API_GET_REPORT_GRADE;
    }
    else if (reportType === 'project') {
        addressGetReport += config.API_GET_REPORT_PROJECT;
    }
    let reportUrlApi = reportUrl.replace('/api/wx/v1.1', '');
    reportUrlApi = reportUrlApi.split('?')[0];
    let dataGetReport = {
        'user_name': userName,
        'wx_openid': wxOpenid,
        'report_url': reportUrlApi
    };
    let promiseReport = $.post(addressGetReport, dataGetReport);

    return promiseReport;
}

export default handlePromiseReport;