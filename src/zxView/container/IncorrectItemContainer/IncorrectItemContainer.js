import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import {handleAccountBindedUserList} from '../../misc/handleBindedUserList';
import {handlePaperList} from '../../misc/handlePaperList';
import handleUserRoleLabel from '../../misc/handleUserRoleLabel';

import Preloader from '../../component/Preloader';

import BlockDownloadableList from './BlockDownloadableList';

let config = require('zx-const')[process.env.NODE_ENV];

export default class IncorrectItemContainer extends Component {

    constructor() {
        super();
        let mainAccessToken = getCookie(config.COOKIE.MAIN_ACCESS_TOKEN);
        this.state = {
            flag: null,
            mainAccessToken: (mainAccessToken !== '') ? mainAccessToken : null,
            loginMethod: null,
            paperList: null,
            mainUser: null,
            bindedUserList: null

        }
    }

    componentDidMount() {
        this.handleBindedUserList();
        this.handlePaperList();
    }

    handlePaperList() {
        let selectedAccessToken = getCookie('selectedAccessToken');
        let loginMethod = getCookie(config.COOKIE.LOGIN_METHOD);
        let paperListData = {
            access_token: selectedAccessToken,
        };
        handlePaperList(this, loginMethod, paperListData);
    }

    handleBindedUserList() {
        let {mainAccessToken} = this.state;
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
        let {loginMethod} = this.state;
        if (this.state.mainUser) {
            if (loginMethod === config.LOGIN_ACCOUNT) {
                if (this.state.mainUser.name === '-') {
                    mainUserName = config.VISITOR;
                }
                else {
                    mainUserName = this.state.mainUser.name;
                }
            } else {
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
        }
        let mainAccessToken = this.state.mainAccessToken;
        let mainUserRole = this.state.mainUser ? this.state.mainUser.role : null;
        let mainUserRoleLabel = handleUserRoleLabel(mainUserRole);
        let paperList = this.state.paperList;
        // let bindedUserListData = handleBindUserList(bindedUserList);

        let selectedUserDisplayName = JSON.parse(getCookie('selectedUserDisplayName'));
        let preloader = 'zx-page-preloader';
        preloader = this.state.loaded ? preloader : `${preloader} active`;

        return (
            <div className="container">
                <Preloader preloader={preloader}/>
                <div className="zx-settings-container">
                    <h1 className="zx-settings-heading">
                        <i className="material-icons zx-settings-icon">account_box</i>
                        <span className="zx-settings-name">{selectedUserDisplayName}</span>
                    </h1>
                    <div className="divider"></div>
                    <div className="section">
                        <div className="row">
                            <div className="col s12">
                                <BlockDownloadableList
                                    mainAccessToken={mainAccessToken}
                                    data={paperList}
                                    // handleUpdateBindedUserList={this.handleUpdateBindedUserList.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

IncorrectItemContainer.contextTypes = {
    router: PropTypes.object.isRequired,
    handleUpdata: PropTypes.func,
    handleAddCompeletta: PropTypes.func
};