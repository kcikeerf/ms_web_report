import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

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
            selectedAccessToken: null,
            mainAccessToken: (getCookie('access_token') !== '') ? getCookie('access_token') : null,
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
        let mainAccessToken = this.state.mainAccessToken;
        if (!mainAccessToken) {
            this.context.router.push('/login');
        }
        else {
            this.setState({
                mainAccessToken: mainAccessToken
            });
            this.handleBindedUserList(mainAccessToken);
        }

    }

    handleBindedUserList(mainAccessToken) {
        let bindedUserListApi = config.API_DOMAIN + config.API_GET_BINDED_USERS;
        let bindedUserListData = {
            access_token: mainAccessToken
        };
        let bindedUserListPromise = $.post(bindedUserListApi, bindedUserListData);
        bindedUserListPromise.done(function (bindedUserListResponse) {
            this.setState({
                bindedUserList: bindedUserListResponse
            });
        }.bind(this));
        bindedUserListPromise.fail(function (errorResponse) {
            let repsonseJSON = errorResponse.responseJSON;
            if (repsonseJSON) {
                let error = repsonseJSON.error;
                if (error === 'Access Token 已过期') {
                    removeCookie('access_token');
                    this.setState({
                        selectedAccessToken: null,
                        mainAccessToken: null
                    });
                    this.context.router.push('/login');
                }
            }
            else {

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
        $('.collapsible-header').removeClass('zx-li-open');

        this.setState({
            reportIframeSrc: null,
            reportIframeActive: false,
            reportIframeShow: false
        });
    }

    handleUserDashboard(userInfo) {
        if (this.state.selectedAccessToken !== userInfo.selectedAccessToken) {
            this.handleReportIframeClear();
        }

        this.setState({
            selectedAccessToken: userInfo.selectedAccessToken,
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
                        mainAccessToken={this.state.mainAccessToken}
                        selectedAccessToken={this.state.selectedAccessToken}
                    />
                    <LeftNav
                        mainAccessToken={this.state.mainAccessToken}
                        selectedAccessToken={this.state.selectedAccessToken}
                        bindedUserList={this.state.bindedUserList}
                        handleReportIframeShow={this.handleReportIframeShow.bind(this)}
                        handleReportIframeClear={this.handleReportIframeClear.bind(this)}
                        handleUserDashboard={this.handleUserDashboard.bind(this)}
                    />
                </header>
                <main className="zx-main">
                    <DashBoardContainer
                        mainAccessToken={this.state.mainAccessToken}
                        selectedAccessToken={this.state.selectedAccessToken}
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
