// import $ from 'jquery';
// let config = require('zx-const')[process.env.NODE_ENV];

function handleReportType(reportUrl) {
    let reportUrlArr = reportUrl.split('/');
    let reportType = reportUrlArr[reportUrlArr.length-2];

    return reportType;
}

export default handleReportType;