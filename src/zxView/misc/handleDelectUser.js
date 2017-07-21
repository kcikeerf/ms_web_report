import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

export default function handleDelectUserList(data) {
    let delectUserListApi = config.API_DOMAIN + config.API_UNBINDING_USER;
    let userData = data;

    return $.post(delectUserListApi, userData);
}