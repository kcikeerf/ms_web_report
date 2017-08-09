import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
import handleURLParameter from 'zx-misc/handleURLParameter';

import handleBindedUserList from '../misc/handleBindedUserList';
import handleResponseError from '../misc/handleResponseError';

import ModalDefault from '../component/ModalDefault';
import TopNavContainer from '../container/TopNavContainer/TopNavContainer';
import LeftNavContainer from '../container/LeftNavContainer/LeftNavContainer';
import DashBoardContainer from '../container/DashBoardContainer/DashBoardContainer';
import ReportContainer from '../container/ReportContainer/ReportContainer';

let config = require('zx-const')[process.env.NODE_ENV];

class Home extends Component {
    constructor() {
        super();
        let mainAccessToken = getCookie(config.COOKIE.MAIN_ACCESS_TOKEN);
        this.state = {
            loginMethod: null,
            wxAccessToken: null,
            wxCode: handleURLParameter('code'),
            wxUnionId: null,
            wxOpenId: null,
            clientAccessToken: null,
            mainAccessToken: (mainAccessToken !== '') ? mainAccessToken : null,
            mainUser: null,
            bindedUserList: null,
            reportInfo: null,
            reportIframeSrc: null,
            reportIframeActive: false,
            reportIframeShow: false,
            selectedAccessToken: null,
            selectedUserName: null,
            selectedUserDisplayName: null,
            selectedUserRole: null,
            selectedTestList: null,
        };
    }

    componentDidMount() {
        let loginMethod, bindedUserListData;
        let mainAccessToken = this.state.mainAccessToken;
        if (!mainAccessToken) { // mainAccessToken不存在则表明不是通过账号密码登录的
            if (this.state.wxCode) { // wxCode存在则表明是通过微信扫码登录的
                // 获取zx access
                let zxAccessTokenApi = config.WX_API_GET_ZX_ACCESS;
                let zxAccessTokenPromise = $.get(zxAccessTokenApi);

                // 获取wx access
                let wxAccessTokenData = {
                    code: this.state.wxCode
                };
                let wxAccessTokenApi = config.WX_API_GET_WX_ACCESS + '?' + $.param(wxAccessTokenData);
                let wxAccessTokenPromise = $.get(wxAccessTokenApi);

                // 获取zx access和wx access成功
                zxAccessTokenPromise.done(function (responseZx) {
                    loginMethod = config.LOGIN_WX;
                    let clientAccessToken = responseZx;
                    wxAccessTokenPromise.done(function (responseWx) {
                        let parsedResponseWx = JSON.parse(responseWx);
                        if (parsedResponseWx.errcode) {
                            this.context.router.push('/login');
                        }
                        else {
                            bindedUserListData = {
                                access_token: clientAccessToken,
                                third_party: 'wx',
                                wx_unionid: parsedResponseWx.unionid,
                                wx_openid: parsedResponseWx.openid
                            };

                            createCookie(config.COOKIE.CLIENT_ACCESS_TOKEN, clientAccessToken);
                            createCookie(config.COOKIE.WX_UNIONID, parsedResponseWx.unionid);
                            createCookie(config.COOKIE.WX_OPENID, parsedResponseWx.openid);
                            handleBindedUserList(this, loginMethod, bindedUserListData, true);
                        }
                    }.bind(this));

                }.bind(this));

                // 获取zx access失败
                zxAccessTokenPromise.fail(function (errorResponse) {
                    this.context.router.push('/login');
                }.bind(this));

                // 获取xx access失败
                wxAccessTokenPromise.fail(function (errorResponse) {
                    this.context.router.push('/login');
                }.bind(this));
            }
            else {
                this.context.router.push('/login');
            }
        }
        else {
            loginMethod = config.LOGIN_ACCOUNT;
            bindedUserListData = {
                access_token: mainAccessToken,
            };
            handleBindedUserList(this, loginMethod, bindedUserListData, true);
        }

    }

    updateUserLoginState(loginMethod, mainAccessToken, userInfoPromise) {
        userInfoPromise.done(function (response) {
            this.setState({
                loginMethod,
                mainAccessToken,
                mainUser: response
            });
        }.bind(this));
        userInfoPromise.fail(function (errorResponse) {
            handleResponseError(this ,errorResponse);
        }.bind(this));
    }

    handleReportIframeShow(reportAddress, reportInfo, target = null) {
        if (target) {
            $('.collapsible-header').removeClass('zx-li-open');
            $(target).children('.collapsible-header').addClass('zx-li-open');
        }

        this.setState({
            reportInfo: reportInfo,
            reportIframeSrc: reportAddress,
            reportIframeActive: true,
            reportIframeShow: true
        });
        this.iframe.iframe.iframeReload();
    }

    handleReportIframeClear() {
        $('.collapsible-header').removeClass('zx-li-open');

        this.setState({
            reportIframeSrc: null,
            reportIframeActive: false,
            reportIframeShow: false
        });
    }

    handleDashboardUserInfo(selectedAccessToken, selectedUserName, selectedUserRole, selectedUserDisplayName) {
        // console.log(selectedAccessToken);
        // console.log(selectedUserName);
        // console.log(selectedUserRole);
        // console.log(selectedUserDisplayName);
        if (this.state.selectedAccessToken !== selectedAccessToken) {
            this.setState({
                reportIframeSrc: null,
                reportIframeActive: false,
                reportIframeShow: false,
                selectedAccessToken: selectedAccessToken,
                selectedUserName: selectedUserName,
                selectedUserDisplayName: selectedUserDisplayName,
                selectedUserRole: selectedUserRole
            });
        }
    }

    handleDashboardTestList(selectedTestList) {
        this.setState({
            selectedTestList: selectedTestList
        });
    }

    render() {
        console.log(this.state);
        let style = {
            height: '100%'
        };

        return (
            <div style={style} className="zx-body-container">
                <header className="zx-header">
                    <TopNavContainer
                        mainUser={this.state.mainUser}
                        mainAccessToken={this.state.mainAccessToken}
                        selectedAccessToken={this.state.selectedAccessToken}
                    />
                    <LeftNavContainer
                        loginMethod={this.state.loginMethod}
                        mainAccessToken={this.state.mainAccessToken}
                        mainUser={this.state.mainUser}
                        bindedUserList={this.state.bindedUserList}
                        wxUnionId={this.state.wxUnionId}
                        wxOpenId={this.state.wxOpenId}
                        selectedAccessToken={this.state.selectedAccessToken}
                        selectedUserName={this.state.selectedUserName}
                        selectedUserRole={this.state.selectedUserRole}
                        selectedUserDisplayName={this.state.selectedUserDisplayName}
                        selectedTestList={this.state.selectedTestList}
                        handleReportIframeShow={this.handleReportIframeShow.bind(this)}
                        handleReportIframeClear={this.handleReportIframeClear.bind(this)}
                        handleDashboardUserInfo={this.handleDashboardUserInfo.bind(this)}
                        handleDashboardTestList={this.handleDashboardTestList.bind(this)}
                    />
                </header>
                <main className="zx-main">
                    <DashBoardContainer
                        mainAccessToken={this.state.mainAccessToken}
                        selectedAccessToken={this.state.selectedAccessToken}
                        selectedUserName={this.state.selectedUserName}
                        selectedUserRole={this.state.selectedUserRole}
                        selectedUserDisplayName={this.state.selectedUserDisplayName}
                        selectedTestList={this.state.selectedTestList}
                        handleReportIframeShow={this.handleReportIframeShow.bind(this)}
                    />
                    <ReportContainer
                        active={this.state.reportIframeActive}
                        show={this.state.reportIframeShow}
                        reportInfo={this.state.reportInfo}
                        reportIframeSrc={this.state.reportIframeSrc}
                        handleReportIframeClear={this.handleReportIframeClear.bind(this)}
                        ref={(iframe) => {
                            this.iframe = iframe
                        }}
                    />
                </main>
                <ModalDefault />
            </div>
        )
    }
}

Home.contextTypes = {
    router: PropTypes.object.isRequired,
    handleReportIframeShow: PropTypes.func,
    handleUserDashboard: PropTypes.func
};

export default Home;
