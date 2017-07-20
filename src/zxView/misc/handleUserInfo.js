import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

export default function handleUserInfo(mainAccessToken) {
    let userInfoApi = config.API_DOMAIN + config.API_GET_USER_INFO;
    let userInfoData = {
        access_token: mainAccessToken
    };

    return $.post(userInfoApi, userInfoData);
}