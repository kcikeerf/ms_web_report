import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6
import {Link} from 'react-router'
import $ from 'jquery';

import handleResponseError from '../../misc/handleResponseError';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import UserList from './UserList';
import TestList from './TestList';
import handleToggleMenu from "../../misc/handleToggleMenu";

let config = require('zx-const')[process.env.NODE_ENV];

class LeftNav extends React.Component {

    componentDidMount() {
        $(document).ready(function () {
            $('.tooltipped').tooltip({delay: 50});
        })
    }

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

    handleReportonClick() {
        // material css框架使用的是translateX来改变左侧导航的出现隐藏
        let $zxMargin = $(".zx-iconbar");
        let $width = $zxMargin.css('width');
        let $sideNav = $('.side-nav');
        let $collapsibleHeader = $('.collapsible-header');
        let $collapsibleBody = $('.collapsible-body');
        let transform = $sideNav.css('transform').split(/[()]/)[1];
        let translateX = transform.split(',')[4].trim();
        let $zxIconbarTool = $(".zx-icon-bar-tool");
        if ($width === "56px") {
            if (translateX === '-375') {
                $sideNav.removeClass('zx-collapse');
                $sideNav.css('transform', 'translateX(56px)');
                $(".zx-klass").css('transform', 'translateX(0)');
                $collapsibleBody.css('transform', 'translateX(0)');
                $collapsibleHeader.css('transform', 'translateX(0)');
                $('.zx-main').css('margin-left', '350px');
                if ($(window).width() > 1230) {
                    // $('.zx-main').css('margin-left', '360px');
                }
                else {
                    // $('.zx-main').css('margin-left', '0px');
                }
                $zxIconbarTool.css('transform', 'translateX(-110px)');
            }
            else if (translateX === '56') {
                $('.zx-main').css('margin-left', '56px');
                $sideNav.addClass('zx-collapse');
                $sideNav.css('transform', 'translateX(-125%)');
                $collapsibleBody.css('transform', 'translateX(-125%)');
                if ($(window).width() > 1230) {
                    // $('.zx-main').css('margin-left', '60px');
                }
                else {
                    // $('.zx-main').css('margin-left', '0px');
                }
                $zxIconbarTool.css('transform', 'translateX(-110px)');
            }
        }
        else if ($width === '200px') {
            if (translateX === '-375') {
                $sideNav.removeClass('zx-collapse');
                $sideNav.css('transform', 'translateX(200px)');
                $(".zx-klass").css('transform', 'translateX(0)');
                $collapsibleBody.css('transform', 'translateX(0)');
                $collapsibleHeader.css('transform', 'translateX(0)');
                $('.zx-main').css('margin-left', '500px');
                if ($(window).width() > 1230) {
                    // $('.zx-main').css('margin-left', '360px');
                }
                else {
                    // $('.zx-main').css('margin-left', '0px');
                }
                $zxIconbarTool.css('transform', 'translateX(-110px)');
            }
            else if (translateX === '200') {
                $sideNav.addClass('zx-collapse');
                $sideNav.css('transform', 'translateX(-125%)');
                $collapsibleBody.css('transform', 'translateX(-125%)');
                $('.zx-main').css('margin-left', '200px');
                if ($(window).width() > 1230) {
                    // $('.zx-main').css('margin-left', '60px');
                }
                else {
                    // $('.zx-main').css('margin-left', '0px');
                }
                $zxIconbarTool.css('transform', 'translateX(-110px)');
            }
        }
    }

    handleToolonOnclick() {
        let $sideNav = $('.side-nav');
        let $collapsibleBody = $('.collapsible-body');
        let $zxIconbarTool = $(".zx-icon-bar-tool");
        if ($zxIconbarTool.css('transform') === 'none' ||
            $zxIconbarTool.css('transform').split(/[()]/)[1].split(',')[4].trim() === '-110') {
            let $zxMargin = $(".zx-iconbar");
            let $width = $zxMargin.css('width');
            if ($width === "56px") {
                $zxIconbarTool.css('transform', 'translateX(166px)');
                $zxIconbarTool.css('top', '0');
                $('.zx-main').css('margin-left', '150px');
                $sideNav.addClass('zx-collapse');
                $sideNav.css('transform', 'translateX(-125%)');
                $collapsibleBody.css('transform', 'translateX(-125%)');
            }
            if ($width === "200px") {
                $zxIconbarTool.css('transform', 'translateX(310px)');
                $zxIconbarTool.css('top', '0');
                $('.zx-main').css('margin-left', '295px');
                $sideNav.addClass('zx-collapse');
                $sideNav.css('transform', 'translateX(-125%)');
                $collapsibleBody.css('transform', 'translateX(-125%)');
            }
        }
        else if ($zxIconbarTool.css('transform').split(/[()]/)[1].split(',')[4].trim() === '166') {
            $zxIconbarTool.css('transform', 'translateX(-110px)');
            $('.zx-main').css('margin-left', '55px');
            $sideNav.addClass('zx-collapse');
            $sideNav.css('transform', 'translateX(-125%)');
            $collapsibleBody.css('transform', 'translateX(-125%)');
        }
        else if ($zxIconbarTool.css('transform').split(/[()]/)[1].split(',')[4].trim() === '310') {
            $zxIconbarTool.css('transform', 'translateX(-110px)');
            $('.zx-main').css('margin-left', '195px');
            $sideNav.addClass('zx-collapse');
            $sideNav.css('transform', 'translateX(-125%)');
            $collapsibleBody.css('transform', 'translateX(-125%)');
        }
    }

    //错题打印
    handleIncorrectItem(e) {
        this.context.router.push('/incorrect-item');
    }

    toggleMenu() {
        handleToggleMenu()
    }

    render() {
        let tool;
        let selectedUserRole = getCookie("selectedUserRole");
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

        if (selectedUserRole === config.USER_ROLE_PUPIL) {
            tool = <li className="nav-item">
                <div className="zx-tool zx-cursor" onClick={this.handleToolonOnclick.bind(this)}>
                    <div className="zx-transition">
                        <i className="material-icons zx-font-color">build</i>
                    </div>
                    <div>
                        <span className="zx-font-color zx-cursor">工具</span>
                    </div>
                </div>
                <div className="zx-icon-bar-tool">
                    <div className="zx-iconbar-tool">
                        <li className="nav-item">
                            <div className="zx-quiz-print" onClick={this.handleIncorrectItem.bind(this)}>
                                错题集打印
                            </div>
                        </li>
                    </div>
                </div>
            </li>
        }

        return (
            <div className="zx-iconbar">
                <ul>
                    <li className="nav-item">
                        <div className="zx-left-nav-user-list">
                            <div className="zx-transition zx-cursor"
                                 onClick={this.toggleMenu.bind(this)}
                            >
                                <i className="material-icons zx-font-color">person</i>
                            </div>
                            <div>
                                <div className="zx-font-color zx-cursor">
                                    {contentUserList}
                                </div>
                                <div className="side-nav fixed">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="zx-tool zx-cursor" onClick={this.handleReportonClick.bind(this)}>
                            <div className="zx-transition">
                                <i className="material-icons zx-font-color">school</i>
                            </div>
                            <div>
                                <span className="zx-font-color">报告</span>
                                <div className="side-nav fixed">
                                    {contentTestList}
                                    {contentWarning}
                                </div>
                            </div>
                        </div>
                    </li>
                    {tool}
                </ul>
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