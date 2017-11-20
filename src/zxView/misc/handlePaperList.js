import $ from 'jquery';
import handleResponseError from './handleResponseError';
import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
let config = require('zx-const')[process.env.NODE_ENV];

export function handlePaperList(component, loginMethod, paperListData, setState=false) {
    // let paperListApi = 'http://59.110.7.209:4000/api/v1.2/tests/download_able_list';
    let paperListApi = 'http://59.110.7.209:4000' + config.API_GET_DOWNLOAD_ABLE_LIST;
    let bindedUserListPromise = $.post(paperListApi, paperListData);
    bindedUserListPromise.done(function (response) {
        let newState = {
            loaded: true,
            loginMethod,
            paperList:response.test_list
        };
        component.setState(newState);
    }.bind(this));
    bindedUserListPromise.fail(function (errorResponse) {
        handleResponseError(component ,errorResponse);
    }.bind(this));
}

