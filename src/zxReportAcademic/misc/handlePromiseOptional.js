import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

function handlePromiseOptional(accessToken, reportUrl) {
    reportUrl = reportUrl.substring(reportUrl.indexOf('/reports_warehouse') + 1);
    let reportAddressOptional = config.API_DOMAIN + config.API_VERSION + reportUrl.replace('.json', '_optional.json');
    let dataOptional = {
        access_token: accessToken
    };
    let promiseOptional = $.post(reportAddressOptional, dataOptional);

    return promiseOptional;
}

export default handlePromiseOptional;