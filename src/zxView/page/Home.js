import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

import getCookie from 'zx-misc/getCookie';
import removeCookie from 'zx-misc/removeCookie';

import handleUserInfo from '../misc/handleUserInfo';

import ModalDefault from '../component/ModalDefault';
import TopNavContainer from '../container/TopNavContainer/TopNavContainer';
import LeftNavContainer from '../container/LeftNavContainer/LeftNavContainer';
import DashBoardContainer from '../container/DashBoardContainer/DashBoardContainer';
import ReportContainer from '../container/ReportContainer/ReportContainer';

let config = require('zx-const')[process.env.NODE_ENV];

class Home extends Component {
    constructor() {
        super();
        this.state = {
            // 主账号access_token
            mainAccessToken: (getCookie('access_token') !== '') ? getCookie('access_token') : null,
            mainUser: null,
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
        let mainAccessToken = this.state.mainAccessToken;
        if (!mainAccessToken) {
            this.context.router.push('/login');
        }
        else {
            let mainAccessToken = this.state.mainAccessToken;
            let userInfoPromise = handleUserInfo(mainAccessToken);
            this.updateUserInfo(mainAccessToken, userInfoPromise);
        }
    }

    updateUserInfo(mainAccessToken, userInfoPromise) {
        userInfoPromise.done(function (response) {
            let userName = response.user_name;
            let userDisplayName = response.name;
            let userRole = response.role;
            let bindedUserListItem = {
                user_name: userName,
                name: userDisplayName,
                role: userRole,
                oauth: {
                    access_token: mainAccessToken
                }
            };

            this.setState({
                mainUser: bindedUserListItem,
                selectedAccessToken: mainAccessToken,
                selectedUserName: userName,
                selectedUserDisplayName: userDisplayName,
                selectedUserRole: userRole
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

    handleDashboardUserInfo(selectedAccessToken, selectedUserName, selectedUserRole, selectedUserDisplayName) {
        if (this.state.selectedAccessToken !== selectedAccessToken) {
            this.handleReportIframeClear();
            this.setState({
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
        console.log('render');

        let style = {
            height: '100%'
        };

        return (
            <div style={style} className="zx-body-container">
                <header className="zx-header">
                    <TopNavContainer
                        mainAccessToken={this.state.mainAccessToken}
                        selectedAccessToken={this.state.selectedAccessToken}
                    />
                    <LeftNavContainer
                        mainAccessToken={this.state.mainAccessToken}
                        mainUser={this.state.mainUser}
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
