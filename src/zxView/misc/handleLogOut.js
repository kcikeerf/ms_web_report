import $ from 'jquery';
import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
let config = require('zx-const')[process.env.NODE_ENV];

function handleLogOut(component, tokenData) {
    let loginOutApi = config.API_DOMAIN + config.API_LOGOUT;
    let loginOutPromise = $.post(loginOutApi, tokenData);

    for (let i in config.COOKIE) {
        removeCookie(config.COOKIE[i]);
    }
    component.context.router.push('/login');
}

export default handleLogOut;