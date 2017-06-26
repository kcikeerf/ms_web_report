import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

function handlePromiseOptional(userName, wxOpenid, reportUrl) {
    let reportAddressOptional;
    if (reportUrl.indexOf('api/wx/v1.1') !== -1) {
        reportAddressOptional = config.API_DOMAIN + reportUrl.replace('.json', '_optional.json');
    }
    else {
        reportAddressOptional = config.API_DOMAIN + '/api/wx/v1.1' + reportUrl.replace('.json', '_optional.json');
    }
    let dataOptional = {
        'user_name': userName,
        'wx_openid': wxOpenid
    };
    let promiseOptional = $.post(reportAddressOptional, dataOptional);

    return promiseOptional;
}

export default handlePromiseOptional;