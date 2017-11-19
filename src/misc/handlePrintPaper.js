import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

export default function handlePrintPaper(data) {
    let delectUserListApi = 'http://59.110.7.209:4000' + config.API_GET_INCORRRNT_ITEM;
    let userData = data;

    return $.post(delectUserListApi, userData);
}