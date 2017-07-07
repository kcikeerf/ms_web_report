import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

function handlePromiseOptional(accessToken, reportUrl) {
    let reportAddressOptional = config.API_DOMAIN + reportUrl.replace('.json', '_optional.json');
    let dataOptional = {
        access_token: accessToken
    };
    let promiseOptional = $.post(reportAddressOptional, dataOptional);

    return promiseOptional;
}

export default handlePromiseOptional;