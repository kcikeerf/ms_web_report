import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import '../style/style-general.css';
import '../style/style-view.css';

import getCookie from 'zx-misc/getCookie';
import createCookie from 'zx-misc/createCookie';

import ModalDefault from './component/ModalDefault';
import TopNav from './component/TopNav';
import LeftNav from './component/LeftNav/LeftNav';
import DashBoardContainer from './component/DashBoard/DashBoardContainer';
import ReportContainer from './component/ReportContainer/ReportContainer';

let config = require('zx-const')[process.env.NODE_ENV];

class App extends Component {
    constructor() {
        super();
        this.state = {
            wxOpenId: null,
            hasBindedUser: null,
            bindedUsers: null,
            selectedUserName: null,
            selectedUserDisplayName: null,
            selectedUserRole: null,
            selectedReportList: null,
            reportIframeSrc: null,
            reportIframeActive: false,
            reportIframeShow: false

        };
    }

    componentDidMount() {
        this.checkUser();
    }

    // 检测微信号与学生账号绑定
    checkUser() {
        let wx_openid = config.TEST_WECHAT_OPENID, data;
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
            wx_openid = config.TEST_WECHAT_OPENID;
            createCookie('wx_openid', wx_openid);

        }
        else {
            wx_openid = getCookie('wx_openid');
        }

        let api_url;
        api_url = config.API_DOMAIN + config.API_GET_BINDED_USERS;
        // 获取和微信openid所绑定的用户列表，如果没有绑定任何用户，则跳转到登录界面
        data = {
            'wx_openid': wx_openid
        };
        setTimeout(function () {
            $.post(api_url, data, function(response, status) {
                    let users = $.parseJSON(response.data);
                    if (users !== null) {
                        if (users.length > 0) {
                            users.sort(this.handleUserRoleSort);
                            this.setState({
                                wxOpenId: wx_openid,
                                hasBindedUser: true,
                                bindedUsers: users
                            });
                        }
                        else {
                            this.setState({
                                hasBindedUser: false
                            });
                        }
                    }
                    else {
                        //@TODO: 返回空数据的时候有报错
                        this.setState({
                            hasBindedUser: false
                        });
                    }
                }.bind(this),
                'json')
            // @TODO: 500的话是没有response的
                .fail(function(status) {
                    this.setState({
                        hasBindedUser: false
                    });
                }.bind(this));
        }.bind(this), 500);

    }

    // 导航到 设置 页面
    handleNav(event) {
        event.preventDefault();
        this.context.router.push('/settings');
    }

    handleUserRoleSort(a, b) {
        if (a.role === 'teacher' && b.role === 'pupil') {
            return -1;
        }
        else if (a.role === 'teacher' && b.role === 'teacher') {
            return 0;
        }
        else if (a.role === 'pupil' && b.role === 'teacher') {
            return 1;
        }
        else if (a.role === 'pupil' && b.role === 'pupil') {
            return 0;
        }
    }

    handleReportIframeShow(reportAddress, reportInfo, target=null) {
        if (target) {
            target.children('.collapsible-header').addClass('zx-li-open');
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
        this.setState({
            reportIframeSrc: null,
            reportIframeActive: false,
            reportIframeShow: false
        });
    }

    handleUserDashboard(userInfo) {
        this.setState({
            selectedUserName: userInfo.selectedUserName,
            selectedUserDisplayName: userInfo.selectedUserDisplayName,
            selectedUserRole: userInfo.selectedUserRole,
            selectedReportList: userInfo.selectedReportList
        });
    }

    render() {
        let style = {
            height: '100%'
        };

        return (
            <div style={style} className="zx-body-container">
                <header className="zx-header">
                    <TopNav />
                    <LeftNav
                        wxOpenId={this.state.wxOpenId}
                        bindedUsers={this.state.bindedUsers}
                        handleReportIframeShow={this.handleReportIframeShow.bind(this)}
                        handleUserDashboard={this.handleUserDashboard.bind(this)}
                    />
                </header>
                <main className="zx-main">
                    <DashBoardContainer
                        wxOpenId={this.state.wxOpenId}
                        userName={this.state.selectedUserName}
                        userDisplayName={this.state.selectedUserDisplayName}
                        userRole={this.state.selectedUserRole}
                        reportList={this.state.selectedReportList}
                        handleReportIframeShow={this.handleReportIframeShow.bind(this)}
                    />
                    <ReportContainer
                        active={this.state.reportIframeActive}
                        show={this.state.reportIframeShow}
                        iframeSrc={this.state.reportIframeSrc}
                        handleReportIframeClear={this.handleReportIframeClear.bind(this)}
                        ref={(iframe) => {this.iframe = iframe}}
                    />
                </main>
                <ModalDefault />
            </div>
        )
    }
}

export default App;
