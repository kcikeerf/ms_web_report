import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import handleBindedUserList from '../../misc/handleBindedUserList';
import handleUserRoleLabel from '../../misc/handleUserRoleLabel';

import BlockUserAuthorityList from './BlockUserAuthorityList';
import BlockBindUserList from './BlockBindUserList';

let config = require('zx-const')[process.env.NODE_ENV];

export default class SettingsContainer extends Component {
    constructor() {
        super();
        let mainAccessToken = getCookie(config.COOKIE.MAIN_ACCESS_TOKEN);
        this.state = {
            flag: null,
            mainAccessToken: (mainAccessToken !== '') ? mainAccessToken : null,
            loginMethod: null,
            mainUser: null,
            bindedUserList: null
        }
    }

    componentDidMount() {
        this.handleBindedUserList();
    }
    //请求用户列表
    handleBindedUserList() {
        let mainAccessToken = this.state.mainAccessToken;
        let loginMethod;
        let bindedUserListData = {
            access_token: mainAccessToken,
        };
        handleBindedUserList(this, loginMethod, bindedUserListData);
    }
    //更新用户列表
    handleUpdateBindedUserList() {
        this.handleBindedUserList();
    }

    render() {
        let mainAccessToken = this.state.mainAccessToken;
        let mainUserRole = this.state.mainUser ? this.state.mainUser.role : null;
        let mainUserDisplayName = this.state.mainUser ? this.state.mainUser.name : null;
        let mainUserRoleLabel = handleUserRoleLabel(mainUserRole);

        let bindedUserListData = this.state.bindedUserList;
        // let bindedUserListData = handleBindUserList(bindedUserList);
        return (
            <div className="container">
                <div className="zx-settings-container">
                    <h1 className="zx-settings-heading">
                        <i className="material-icons zx-settings-icon">account_box</i>
                        <span className="zx-settings-name">{mainUserDisplayName}</span>
                        {/*<span className="zx-settings-role">{mainUserRoleLabel}</span>*/}
                    </h1>
                    <div className="divider"></div>
                    <div className="section">
                        {/*
                        <div className="row">
                            <div className="col s12">
                                <BlockUserAuthorityList
                                    mainAccessToken={mainAccessToken}
                                    data={mainUserRole}
                                />
                            </div>
                        </div>
                        */}
                        <div className="row">
                            <div className="col s12">
                                <BlockBindUserList
                                    mainAccessToken={mainAccessToken}
                                    data={bindedUserListData}
                                    handleUpdateBindedUserList={this.handleUpdateBindedUserList.bind(this)}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )

    }
}

SettingsContainer.contextTypes = {
    router: PropTypes.object.isRequired,
    handleUpdata: PropTypes.func,
    handleAddCompeletta: PropTypes.func
};