import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

export default function handleLogin(loginData) {
    let loginApi = config.API_DOMAIN + config.API_LOGIN;
    let loginPromise = $.post(loginApi, loginData);

    return loginPromise;
}