import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

export default function handleUserInfo(loginMethod, userInfoData) {
    console.log(userInfoData);
    let userInfoApi = config.API_DOMAIN + config.API_GET_USER_INFO;

    return $.post(userInfoApi, userInfoData);
}