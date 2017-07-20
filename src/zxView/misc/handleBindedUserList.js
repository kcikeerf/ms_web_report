import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

export default function handleBindedUserList(mainAccessToken) {
    let bindedUserListApi = config.API_DOMAIN + config.API_GET_BINDED_USERS;
    let bindedUserListData = {
        access_token: mainAccessToken
    };
    return $.post(bindedUserListApi, bindedUserListData);
}