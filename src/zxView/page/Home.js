import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

import getCookie from 'zx-misc/getCookie';
import removeCookie from 'zx-misc/removeCookie';

import ModalDefault from '../component/ModalDefault';
import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav/LeftNav';
import DashBoardContainer from '../component/DashBoard/DashBoardContainer';
import ReportContainer from '../component/ReportContainer/ReportContainer';

let config = require('zx-const')[process.env.NODE_ENV];

class Home extends Component {
    constructor() {
        super();
        this.state = {
            accessToken: (getCookie('access_token') !== '') ? getCookie('access_token') : null,
            wxOpenId: null,
            bindedUserList: null,
            selectedUserName: null,
            selectedUserDisplayName: null,
            selectedUserRole: null,
            selectedTestList: null,
            reportIframeSrc: null,
            reportIframeActive: false,
            reportIframeShow: false

        };
    }

    componentDidMount() {
        let access_token = this.state.accessToken;
        if (!access_token) {
            this.context.router.push('/login');
        }
        else {
            this.setState({
                accessToken: access_token
            });
            this.handleBindedUserList(access_token);
        }

    }

    handleBindedUserList(access_token) {
        let bindedUserListApi = config.API_DOMAIN + config.API_GET_BINDED_USERS;
        let bindedUserListData = {
            access_token: access_token
        };
        let bindedUserListPromise = $.post(bindedUserListApi, bindedUserListData);
        bindedUserListPromise.done(function (bindedUserListResponse) {
            this.setState({
                bindedUserList: bindedUserListResponse
            });
        }.bind(this));
        bindedUserListPromise.fail(function (errorResponse) {
            let repsonseText = errorResponse.responseText;
            let error = JSON.parse(repsonseText).error;
            if (error === 'Access Token 已过期') {
                removeCookie('access_token');
                this.setState({
                    access_token: null
                });
                this.context.router.push('/login');
            }
        }.bind(this));
    }

    handleReportIframeShow(reportAddress, reportInfo, target=null) {
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
            selectedTestList: userInfo.selectedTestList
        });
    }

    render() {
        let style = {
            height: '100%'
        };

        return (
            <div style={style} className="zx-body-container">
                <header className="zx-header">
                    <TopNav
                        accessToken={this.state.accessToken}
                    />
                    <LeftNav
                        accessToken={this.state.accessToken}
                        bindedUserList={this.state.bindedUserList}
                        handleReportIframeShow={this.handleReportIframeShow.bind(this)}
                        handleUserDashboard={this.handleUserDashboard.bind(this)}
                    />
                </header>
                <main className="zx-main">
                    <DashBoardContainer
                        accessToken={this.state.accessToken}
                        userName={this.state.selectedUserName}
                        userDisplayName={this.state.selectedUserDisplayName}
                        userRole={this.state.selectedUserRole}
                        testList={this.state.selectedTestList}
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

Home.contextTypes = {
    router: PropTypes.object.isRequired,
    handleReportIframeShow: PropTypes.func,
    handleUserDashboard: PropTypes.func
};

export default Home;
