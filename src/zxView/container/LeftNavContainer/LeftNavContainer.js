import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6
import {Link} from 'react-router'
import $ from 'jquery';

import handleResponseError from '../../misc/handleResponseError';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import UserList from './UserList';
import TestList from './TestList';
import ToolBar from './ToolBar';

let config = require('zx-const')[process.env.NODE_ENV];

class LeftNav extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedAccessToken !== this.props.selectedAccessToken) {
            this.handleTestList(nextProps.selectedAccessToken);
        }
    }

    // 加载被选择的用户的报告列表
    handleTestList(selectedAccessToken, selectedUserName = null, selectedUserRole = null, selectedUserDisplayName = null) {
        this.props.handleDashboardTestList(null);

        let academicTestListApi = config.API_DOMAIN + config.API_GET_REPORT_LIST_ACADEMIC;

        let academicTestListData = {
            access_token: selectedAccessToken,
        };

        let academicTestListPromise = $.post(academicTestListApi, academicTestListData);
        academicTestListPromise.done(function (response) {
            response = response.filter((item, index) => {
                let testUrl = item.report_url;
                testUrl = testUrl ? testUrl.replace('/api/v1.2', '') : null;
                return (testUrl && testUrl !== '');
            });
            response = response.reverse();
            this.props.handleDashboardTestList(response);
        }.bind(this));
        academicTestListPromise.fail(function (errorResponse) {
            handleResponseError(this, errorResponse);
        }.bind(this));
    }

    sortReportDateDesc(a, b) {
        let aDate = new Date(a.quiz_date).getTime();
        let bDate = new Date(b.quiz_date).getTime();
        let diff = aDate - bDate;

        return diff <= 0;
    }

    handleReportonMouseEnter() {
        console.log(1111);
        // $(".zx-iconbar").css('width', '100')
        // material css框架使用的是translateX来改变左侧导航的出现隐藏
        let $sideNav = $('.side-nav');
        let $collapsibleBody = $('.collapsible-body');
        console.log('$collapsibleBody', $collapsibleBody);
        let transform = $sideNav.css('transform').split(/[()]/)[1];
        let translateX = transform.split(',')[4].trim();
        console.log('translateX', translateX);
        if (translateX === '-375') {
            $sideNav.removeClass('zx-collapse');
            $sideNav.css('transform', 'translateX(100px)');
            $collapsibleBody.css('transform', 'translateX(0)');
            if ($(window).width() > 1230) {
                // $('.zx-main').css('margin-left', '360px');
            }
            else {
                // $('.zx-main').css('margin-left', '0px');
            }

        }
        // else if (translateX === '0') {
        //     $sideNav.addClass('zx-collapse');
        //     $sideNav.css('transform', 'translateX(-125%)');
        //     if ($(window).width() > 1230) {
        //         // $('.zx-main').css('margin-left', '60px');
        //     }
        //     else {
        //         // $('.zx-main').css('margin-left', '0px');
        //     }
        // }
        // else if (translateX === '100') {
        //     $sideNav.addClass('zx-collapse');
        //     $sideNav.css('transform', 'translateX(-125%)');
        //     if ($(window).width() > 1230) {
        //         // $('.zx-main').css('margin-left', '60px');
        //     }
        //     else {
        //         // $('.zx-main').css('margin-left', '0px');
        //     }
        // }
    }

    handleReportonmouseleave() {
        let $sideNav = $('.side-nav');
        let $collapsibleBody = $('.collapsible-body');
        let transform = $sideNav.css('transform').split(/[()]/)[1];
        let translateX = transform.split(',')[4].trim();
        // $(".zx-iconbar").css('width', '56')
        if (translateX === '100') {
            $sideNav.addClass('zx-collapse');
            $sideNav.css('transform', 'translateX(-125%)');
            $collapsibleBody.css('transform', 'translateX(-125%)');
            if ($(window).width() > 1230) {
                // $('.zx-main').css('margin-left', '60px');
            }
            else {
                // $('.zx-main').css('margin-left', '0px');
            }
        }
    }

    handleToolonMouseEnter() {
        let $zxIconbarTool = $(".zx-iconbar-tool");
        $zxIconbarTool.css('transform', 'translateX(98px)');
    }

    handleToolonmouseleave() {
        let $zxIconbarTool = $(".zx-iconbar-tool");
        $zxIconbarTool.css('transform', 'translateX(-110px)');
    }

    handleRoleonMouseEnter() {
        console.log(1111);
        // $(".zx-iconbar").css('width', '100')
        // material css框架使用的是translateX来改变左侧导航的出现隐藏
        let $sideNav = $('.side-nav');
        let $collapsibleBody = $('.collapsible-body');
        console.log('$collapsibleBody', $collapsibleBody);
        let transform = $sideNav.css('transform').split(/[()]/)[1];
        let translateX = transform.split(',')[4].trim();
        console.log('translateX', translateX);
        if (translateX === '-375') {
            $sideNav.removeClass('zx-collapse');
            $sideNav.css('transform', 'translateX(40px)');
            $collapsibleBody.css('transform', 'translateX(0)');
            if ($(window).width() > 1230) {
                // $('.zx-main').css('margin-left', '360px');
            }
            else {
                // $('.zx-main').css('margin-left', '0px');
            }

        }
        // else if (translateX === '0') {
        //     $sideNav.addClass('zx-collapse');
        //     $sideNav.css('transform', 'translateX(-125%)');
        //     if ($(window).width() > 1230) {
        //         // $('.zx-main').css('margin-left', '60px');
        //     }
        //     else {
        //         // $('.zx-main').css('margin-left', '0px');
        //     }
        // }
        // else if (translateX === '100') {
        //     $sideNav.addClass('zx-collapse');
        //     $sideNav.css('transform', 'translateX(-125%)');
        //     if ($(window).width() > 1230) {
        //         // $('.zx-main').css('margin-left', '60px');
        //     }
        //     else {
        //         // $('.zx-main').css('margin-left', '0px');
        //     }
        // }
    }

    handleRoleonmouseleave() {
        let $sideNav = $('.side-nav');
        let $collapsibleBody = $('.collapsible-body');
        let transform = $sideNav.css('transform').split(/[()]/)[1];
        let translateX = transform.split(',')[4].trim();
        // $(".zx-iconbar").css('width', '56')
        if (translateX === '100') {
            $sideNav.addClass('zx-collapse');
            $sideNav.css('transform', 'translateX(-125%)');
            $collapsibleBody.css('transform', 'translateX(-125%)');
            if ($(window).width() > 1230) {
                // $('.zx-main').css('margin-left', '60px');
            }
            else {
                // $('.zx-main').css('margin-left', '0px');
            }
        }
    }

    render() {
        let contentUserList, contentTestList, contentWarning;
        if (this.props.bindedUserList && this.props.bindedUserList.length > 0) {
            contentUserList = (
                <UserList
                    loginMethod={this.props.loginMethod}
                    mainAccessToken={this.props.mainAccessToken}
                    bindedUserList={this.props.bindedUserList}
                    wxUnionId={this.props.wxUnionId}
                    wxOpenId={this.props.wxOpenId}
                    handleDashboardUserInfo={this.props.handleDashboardUserInfo.bind(this)}
                />
            );
            contentTestList = (
                <TestList
                    mainAccessToken={this.props.mainAccessToken}
                    selectedAccessToken={this.props.selectedAccessToken}
                    selectedUserName={this.props.selectedUserName}
                    selectedUserRole={this.props.selectedUserRole}
                    selectedTestList={this.props.selectedTestList}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            );
        }
        else {
            contentWarning = (
                <div className="zx-nobinded-warning-container">
                    <div className="zx-nobinded-warining-item">
                        <Link to="/manage-account">
                            <div className="zx-nobinded-warining-item">用户未绑定任何身份</div>
                            <div className="zx-nobinded-warining-item">请绑定至少一个身份</div>
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="zx-iconbar">
                    <ul>
                        <li className="nav-item">
                            <div className="qwe">
                                <div className="asd">
                                    <i className="material-icons font-size">person</i>
                                </div>
                                <div
                                    // onMouseEnter={this.handleRoleonMouseEnter.bind(this)}
                                    // onMouseLeave={this.handleRoleonmouseleave.bind(this)}
                                >
                                    <span className="font-size zx-margin">{contentUserList}</span>
                                    <div className="side-nav fixed">
                                        {contentUserList}
                                        {contentTestList}
                                        {contentWarning}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="qwe">
                                <div className="asd">
                                    <i className="material-icons font-size">school</i>
                                </div>
                                <div
                                    onMouseEnter={this.handleReportonMouseEnter.bind(this)}
                                    onMouseLeave={this.handleReportonmouseleave.bind(this)}
                                >
                                    <span className="font-size zx-margin">报告</span>
                                    <div className="side-nav fixed">
                                        {contentUserList}
                                        {contentTestList}
                                        {contentWarning}
                                    </div>
                                </div>

                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="qwe">
                                <div className="asd">
                                    <i className="material-icons font-size">build</i>
                                </div>
                                <div
                                    onMouseEnter={this.handleToolonMouseEnter.bind(this)}
                                    onMouseLeave={this.handleToolonmouseleave.bind(this)}
                                >
                                    <span className="font-size zx-margin">工具</span>
                                    <div className="">
                                        <ToolBar/>
                                    </div>
                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        )
    }
}

LeftNav.contextTypes = {
    router: PropTypes.object.isRequired,
    handleReportIframeShow: PropTypes.func,
    handleDashboardUserInfo: PropTypes.func,
    handleDashboardTestList: PropTypes.func
};

export default LeftNav;