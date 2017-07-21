import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getCookie from 'zx-misc/getCookie';
import removeCookie from 'zx-misc/removeCookie';

import handleUserInfo from '../../misc/handleUserInfo';
import handleBindedUserList from '../../misc/handleBindedUserList';
import handleUserRoleLabel from '../../misc/handleUserRoleLabel';

import BlockUserAuthorityList from './BlockUserAuthorityList';
import {BlockBindUserList ,handleBindUserList} from './BlockBindUserList';

let config = require('zx-const')[process.env.NODE_ENV];

export default class SettingsContainer extends Component {
    constructor() {
        super();
        this.state = {
            mainAccessToken: null,
            mainUserName: null,
            mainUserRole: null,
            mainUserDisplayName: null,
            bindedUserList: null
        }
    }

    componentDidMount() {
        let mainAccessToken = getCookie('access_token');
        let bindedUserListPromise = handleBindedUserList(mainAccessToken);
        this.updateBindedUserList(bindedUserListPromise);
        let userInfoPromise = handleUserInfo(mainAccessToken);
        this.updateUserInfo(userInfoPromise);
    }

    updateUserInfo(userInfoPromise) {
        userInfoPromise.done(function (response) {
            this.setState({
                mainUserName: response.user_name,
                mainUserRole: response.role,
                mainUserDisplayName: response.name,
            });
        }.bind(this));
        userInfoPromise.fail(function (errorResponse) {
            let repsonseStatus = errorResponse.status;
            if (repsonseStatus) {
                if (repsonseStatus === 401) {
                    removeCookie('access_token');
                    this.context.router.push('/login');
                }
            }
            else {

            }
        }.bind(this));
    }

    updateBindedUserList(bindedUserListPromise) {
        bindedUserListPromise.done(function (response) {
            this.setState({
                bindedUserList: response
            });

        }.bind(this));
        bindedUserListPromise.fail(function (errorResponse) {
            let repsonseStatus = errorResponse.status;
            if (repsonseStatus) {
                if (repsonseStatus === 401) {
                    removeCookie('access_token');
                    this.context.router.push('/login');
                }
            }
            else {

            }
        }.bind(this));
    }


    render() {
        let mainUserRole = this.state.mainUserRole;
        let mainUserDisplayName = this.state.mainUserDisplayName;
        let mainUserRoleLabel = handleUserRoleLabel(mainUserRole);

        let bindedUserList = this.state.bindedUserList;
        let bindedUserListData = handleBindUserList(bindedUserList);
        return (
            <div className="container">
                <div className="zx-settings-container">
                    <h1 className="zx-settings-heading">
                        <i className="material-icons zx-settings-icon">account_box</i>
                        <span className="zx-settings-name">{mainUserDisplayName}</span>
                        <span className="zx-settings-role">{mainUserRoleLabel}</span>
                    </h1>
                    <div className="divider"></div>
                    <div className="section">
                        <div className="row">
                            <div className="col s12"><BlockUserAuthorityList data={mainUserRole} /></div>
                        </div>
                        <div className="row">
                            <div className="col s12"><BlockBindUserList data={bindedUserListData} /></div>
                        </div>
                    </div>

                </div>
            </div>
        )

    }
}

SettingsContainer.contextTypes = {
    router: PropTypes.object.isRequired
};