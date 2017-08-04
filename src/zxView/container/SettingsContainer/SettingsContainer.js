import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import handleUserInfo from '../../misc/handleUserInfo';
import handleBindedUserList from '../../misc/handleBindedUserList';
import handleUserRoleLabel from '../../misc/handleUserRoleLabel';

import BlockUserAuthorityList from './BlockUserAuthorityList';
import BlockBindUserList from './BlockBindUserList';

let config = require('zx-const')[process.env.NODE_ENV];

export default class SettingsContainer extends Component {
    constructor() {
        super();
        let mainAccessToken = getCookie(config.API_ACCESS_TOKEN);
        this.state = {
            flag:null,
            mainAccessToken: (mainAccessToken !== '') ? mainAccessToken : null,
            mainUserName: null,
            mainUserRole: null,
            mainUserDisplayName: null,
            bindedUserList: null
        }
    }

    componentDidMount() {
        let mainAccessToken = this.state.mainAccessToken;
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
                    removeCookie(config.API_ACCESS_TOKEN);
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
                    removeCookie(config.API_ACCESS_TOKEN);
                    this.context.router.push('/login');
                }
            }
            else {

            }
        }.bind(this));
    }
    //传给添加完成弹框组件的函数
    handleAddCompelet(){
        let mainAccessToken = this.state.mainAccessToken;
        let bindedUserListPromise = handleBindedUserList(mainAccessToken);
        this.updateBindedUserList(bindedUserListPromise);
    }

    //传给删除弹框的钩子函数 用来改变状态
    handleUpdata(userListData){
        this.setState({
            bindedUserList: userListData
        });
    }

    render() {
        let mainAccessToken = this.state.mainAccessToken;
        let mainUserRole = this.state.mainUserRole;
        let mainUserDisplayName = this.state.mainUserDisplayName;
        let mainUserRoleLabel = handleUserRoleLabel(mainUserRole);

        let bindedUserListData = this.state.bindedUserList;
        // let bindedUserListData = handleBindUserList(bindedUserList);
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
                            <div className="col s12">
                                <BlockUserAuthorityList
                                    mainAccessToken={mainAccessToken}
                                    data={mainUserRole}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <BlockBindUserList
                                    mainAccessToken={mainAccessToken}
                                    data={bindedUserListData}
                                    handleUpdata={this.handleUpdata.bind(this)}
                                    handleAddCompelet= {this.handleAddCompelet.bind(this)}
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