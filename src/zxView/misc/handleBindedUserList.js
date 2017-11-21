import $ from 'jquery';
import handleResponseError from './handleResponseError';
import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
let config = require('zx-const')[process.env.NODE_ENV];

export function handleAccountBindedUserList(component, loginMethod, bindedUserListData, setState=false) {
    let bindedUserListApi = config.API_DOMAIN + config.API_GET_BINDED_USERS;
    let bindedUserListPromise = $.post(bindedUserListApi, bindedUserListData);
    bindedUserListPromise.done(function (response) {
        let parsedResponse = response;
        //未来学校
        parsedResponse.slave.unshift(parsedResponse.master);
        console.log(parsedResponse);
        let newState = {
            loaded: true,
            loginMethod,
            mainUser: parsedResponse.master,
            bindedUserList: parsedResponse.slave
        };
        if (setState && parsedResponse.slave && parsedResponse.slave.length !== 0) {
            let firstSlave = response.slave[0];
            newState = {
                ...newState,
                selectedAccessToken: firstSlave.oauth.access_token,
                selectedUserName: firstSlave.user_name,
                selectedUserDisplayName: firstSlave.name,
                selectedUserRole: firstSlave.role
            };
        }

        component.setState(newState);
    }.bind(this));
    bindedUserListPromise.fail(function (errorResponse) {
        handleResponseError(component ,errorResponse);
    }.bind(this));
}

export function handleWxBindedUserList(component, loginMethod, zxAccessData, setState=false) {
    let zxAccessApi = config.WX_API_GET_ZX_ACCESS;
    let zxAccessPromise = $.post(zxAccessApi, zxAccessData);
    zxAccessPromise.done(function (response) {
        let parsedResponse = JSON.parse(response);
        //未来学校
        parsedResponse.slave.unshift(parsedResponse.master);

        let mainAccessToken = parsedResponse.master.oauth.access_token;
        createCookie(config.COOKIE.MAIN_ACCESS_TOKEN, mainAccessToken);
        let newState = {
            loaded: true,
            loginMethod,
            mainAccessToken,
            mainUser: parsedResponse.master,
            bindedUserList: parsedResponse.slave
        };
        if (setState && parsedResponse.slave && parsedResponse.slave.length !== 0) {
            let firstSlave = parsedResponse.slave[0];
            newState = {
                ...newState,
                selectedAccessToken: firstSlave.oauth.access_token,
                selectedUserName: firstSlave.user_name,
                selectedUserDisplayName: firstSlave.name,
                selectedUserRole: firstSlave.role
            };
        }
        component.setState(newState);

    }.bind(this));
    zxAccessPromise.fail(function (errorResponse) {
        handleResponseError(component ,errorResponse);
    }.bind(this));
}