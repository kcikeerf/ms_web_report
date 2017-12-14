import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

export default function handlePrintPaper(data) {
    let delectUserListApi = config.API_DOMAIN + config.API_GET_INCORRRNT_ITEM;
    return $.post(delectUserListApi, data);
}