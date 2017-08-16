import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import {handleAccountBindedUserList} from '../../misc/handleBindedUserList';
import handleUserRoleLabel from '../../misc/handleUserRoleLabel';

import Preloader from '../../component/Preloader';

import BlockAccountAuthorityList from './BlockAccountAuthorityList';
import BlockBindAccountList from './BlockBindAccountList';

let config = require('zx-const')[process.env.NODE_ENV];

export default class ManageAccountContainer extends Component {
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

    handleBindedUserList() {
        let mainAccessToken = this.state.mainAccessToken;
        let loginMethod = getCookie(config.COOKIE.LOGIN_METHOD);
        let bindedUserListData = {
            access_token: mainAccessToken,
        };
        handleAccountBindedUserList(this, loginMethod, bindedUserListData);
    }
    //更新用户列表
    handleUpdateBindedUserList() {
        this.handleBindedUserList();
    }

    render() {
        let mainUserName;
        let loginMethod = this.state.loginMethod;
        if (loginMethod === config.LOGIN_ACCOUNT) {
            if (this.state.mainUser.name === '-') {
                mainUserName = config.VISITOR;
            }
            else {
                mainUserName = this.state.mainUser.name;
            }
        } else {
            console.log(555,this.state);
            if (this.state.mainUser && this.state.mainUser.name !== '-') {
                mainUserName = this.state.mainUser.name;
            }
            else if (this.state.mainUser && this.state.mainUser.third_party &&
                this.state.mainUser.third_party[loginMethod] &&
                this.state.mainUser.third_party[loginMethod].nickname) {
                mainUserName = this.state.mainUser.third_party[loginMethod].nickname;
            }
            else {
                mainUserName = config.VISITOR;
            }
        }

        let mainAccessToken = this.state.mainAccessToken;
        let mainUserRole = this.state.mainUser ? this.state.mainUser.role : null;
        let mainUserRoleLabel = handleUserRoleLabel(mainUserRole);
        let bindedUserListData = this.state.bindedUserList;
        // let bindedUserListData = handleBindUserList(bindedUserList);

        let preloader = 'zx-page-preloader';
        preloader = this.state.loaded ? preloader : `${preloader} active`;

        return (
            <div className="container">
                <Preloader preloader = {preloader} />
                <div className="zx-settings-container">
                    <h1 className="zx-settings-heading">
                        <i className="material-icons zx-settings-icon">account_box</i>
                        <span className="zx-settings-name">{mainUserName}</span>
                        {/*<span className="zx-settings-role">{mainUserRoleLabel}</span>*/}
                    </h1>
                    <div className="divider"></div>
                    <div className="section">
                        {/*
                        <div className="row">
                            <div className="col s12">
                                <BlockAccountAuthorityList
                                    mainAccessToken={mainAccessToken}
                                    data={mainUserRole}
                                />
                            </div>
                        </div>
                        */}
                        <div className="row">
                            <div className="col s12">
                                <BlockBindAccountList
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

ManageAccountContainer.contextTypes = {
    router: PropTypes.object.isRequired,
    handleUpdata: PropTypes.func,
    handleAddCompeletta: PropTypes.func
};