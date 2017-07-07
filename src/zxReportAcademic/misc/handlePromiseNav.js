import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

function handlePromiseNav(accessToken, reportUrl) {
    reportUrl = reportUrl.substring(reportUrl.indexOf('/reports_warehouse') + 1);
    let reportAddressNav = config.API_DOMAIN + config.API_VERSION + reportUrl.replace('.json', '/nav.json');
    let dataNav = {
        access_token: accessToken
    };
    // 获取年级报告nav
    let promiseNav = $.post(reportAddressNav, dataNav);

    return promiseNav;
}

export default handlePromiseNav;