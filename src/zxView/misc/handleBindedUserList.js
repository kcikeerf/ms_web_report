import $ from 'jquery';
import handleResponseError from './handleResponseError';
import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
let config = require('zx-const')[process.env.NODE_ENV];

export default function handleBindedUserList(component, loginMethod, bindedUserListData, combine=false) {
    let bindedUserListApi = config.API_DOMAIN + config.API_GET_BINDED_USERS;
    let bindedUserListPromise = $.post(bindedUserListApi, bindedUserListData);
    bindedUserListPromise.done(function (response) {
        let newState = {
            loginMethod,
            mainUser: response.master,
            bindedUserList: response.slave
        };
        if (combine && response.slave && response.slave.length !== 0) {
            let firstSlave = response.slave[0];
            newState = {
                ...newState,
                selectedAccessToken: firstSlave.oauth.access_token,
                selectedUserName: firstSlave.user_name,
                selectedUserDisplayName: firstSlave.name,
                selectedUserRole: firstSlave.role
            };
        }

        if (loginMethod === config.LOGIN_WX) {
            let mainAccessToken = response.master.oauth.access_token;
            newState = {
                ...newState,
                mainAccessToken: mainAccessToken,
            };
            createCookie(config.COOKIE.MAIN_ACCESS_TOKEN, mainAccessToken);
        }
        component.setState(newState);
    }.bind(this));
    bindedUserListPromise.fail(function (errorResponse) {
        // let repsonseStatus = errorResponse.status;
        // if (repsonseStatus) {
        //     if (repsonseStatus === 401) {
        //         removeCookie(config.COOKIE.MAIN_ACCESS_TOKEN);
        //         component.context.router.push('/login');
        //     }
        // }
        // else {
        //
        // }
        handleResponseError(component ,errorResponse);

    }.bind(this));
}