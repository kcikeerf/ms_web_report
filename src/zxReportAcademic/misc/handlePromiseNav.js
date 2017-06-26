import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

function handlePromiseNav(userName, wxOpenid, reportUrl) {
    let reportAddressNav;
    if (reportUrl.indexOf('api/wx/v1.1') !== -1) {
        reportAddressNav = config.API_DOMAIN + reportUrl.replace('.json', '/nav.json');
    }
    else {
        reportAddressNav = config.API_DOMAIN + '/api/wx/v1.1' + reportUrl.replace('.json', '/nav.json');
    }
    let dataNav = {
        'user_name': userName,
        'wx_openid': wxOpenid
    };
    // 获取年级报告nav
    let promiseNav = $.post(reportAddressNav, dataNav);

    return promiseNav;
}

export default handlePromiseNav;