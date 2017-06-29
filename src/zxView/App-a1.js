import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import getCookie from 'zx-misc/getCookie';
import createCookie from 'zx-misc/createCookie';

import ModalDefault from './component/ModalDefault';
import TopNav from './component/TopNav';
import LeftNav from './component/LeftNav/LeftNav';
import DashBoardContainer from './component/DashBoard/DashBoardContainer';
import ReportContainer from './component/ReportContainer';

import './App.css';

let config = require('zx-const')[process.env.NODE_ENV];

class App extends Component {
    constructor() {
        super();
        this.state = {
            wxOpenId: null,
            hasBindedUser: null,
            bindedUsers: null,
            reportIframeSrc: null,
            mainContent: null
        };
    }

    componentDidMount() {
        this.checkUser();
    }

    // 检测微信号与学生账号绑定
    checkUser() {
        console.log(process.env.NODE_ENV);
        let wx_openid = config.TEST_WECHAT_OPENID, data;
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
            console.log('Development mode...');
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

    handleDashBoardShow(el) {
        if (this.dashBoardContainer) {
            this.dashBoardContainer.handleDashBoardShow(el);
        }
    }

    handleDashBoardData(activeReportList) {
        if (this.dashBoardContainer) {
            this.dashBoardContainer.handleDashBoardData(activeReportList);
        }
    }

    handleReportIframe(reportAddress) {
        let reportIframe = <ReportContainer iframeSrc={reportAddress} />;
        this.setState({
            mainContent: reportIframe
        });
    }

    render() {
        let style = {
            height: '100%'
        };

        let mainContent;
        if (this.state.mainContent) {
            mainContent = this.state.mainContent;
        }
        else {
            mainContent = <DashBoardContainer
                wxOpenId={this.state.wxOpenId}
                bindedUsers={this.state.bindedUsers}
                ref={(dashBoardContainer) => { this.dashBoardContainer = dashBoardContainer; }}
            />
        }

        return (
            <div style={style} className="zx-body-container">
                <header className="zx-header">
                    <TopNav />
                    <LeftNav
                        wxOpenId={this.state.wxOpenId}
                        bindedUsers={this.state.bindedUsers}
                        handleReportIframe={this.handleReportIframe.bind(this)}
                        handleDashBoardShow={this.handleDashBoardShow.bind(this)}
                        handleDashBoardData={this.handleDashBoardData.bind(this)}
                    />
                </header>
                <main className="zx-main">
                    <DashBoardContainer
                        wxOpenId={this.state.wxOpenId}
                        bindedUsers={this.state.bindedUsers}
                        ref={(dashBoardContainer) => { this.dashBoardContainer = dashBoardContainer; }}
                    />
                </main>
                <ModalDefault />
            </div>
        )
    }
}

export default App;
