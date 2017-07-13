import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import removeCookie from 'zx-misc/removeCookie';

import UserList from './UserList';
import TestList from './TestList';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

let config = require('zx-const')[process.env.NODE_ENV];

class LeftNav extends React.Component {
    constructor() {
        super();
        this.state = {
            bindedUserList: [],
            selectedAccessToken: null,
            selectedUserName: null,
            selectedUserDisplayName: null,
            selectedUserRole: null,
            selectedTestList: null
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.bindedUserList !== this.props.bindedUserList) {
            this.setState({
                bindedUserList: [
                    ...this.state.bindedUserList,
                    ...nextProps.bindedUserList
                ]
            });
        }
    }

    componentDidMount() {
        this.setState({
            bindedUserList: this.props.bindedUserList
        });
        this.handleUserInfo();
        $('.side-nav').mCustomScrollbar({
            scrollInertia: 400,
            mouseWheel:{ scrollAmount: 200 }
        });
    }

    // 导航到 设置 页面
    handleNav(event) {
        event.preventDefault();
        //this.context.router.push('/settings');
    }

    handleUserInfo() {
        let mainAccessToken = this.props.mainAccessToken;
        let userInfoApi = config.API_DOMAIN + config.API_GET_USER_INFO;
        let userInfoData = {
            access_token: mainAccessToken
        };

        $.post(userInfoApi, userInfoData, function(response, status) {
                let userName = response.user_name;
                let userDisplayName = response.name;
                let userRole = response.role;
                let bindedUserListItem = {
                    user_name: userName,
                    name: userDisplayName,
                    role: userRole,
                    oauth: {
                        access_token: this.props.mainAccessToken
                    }
                };
                let bindedUserlist = this.state.bindedUserList;
                if (bindedUserlist) {
                    bindedUserlist = bindedUserlist.unshift(bindedUserListItem);
                }
                else {
                    bindedUserlist = [bindedUserListItem];
                }
                this.setState({
                    bindedUserList: bindedUserlist,
                    selectedUserName: userName,
                    selectedUserDisplayName: userDisplayName,
                    selectedUserRole: userRole
                });
                console.log(this.props.mainAccessToken);

                this.handleTestList(this.props.mainAccessToken, userName, userRole, userDisplayName);
            }.bind(this),
            'json')
            .fail(function(xhr, status) {
                let repsonseJSON = xhr.responseJSON;
                if (repsonseJSON) {
                    let error = repsonseJSON.error;
                    if (error === 'Access Token 无效') {
                        removeCookie('access_token');
                        this.setState({
                            access_token: null
                        });
                        this.context.router.push('/login');
                    }
                }
            });
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

    // 加载被选择的用户的报告列表
    handleTestList(selectedAccessToken, userName, userRole, userDisplayName) {
        console.log(selectedAccessToken);
        let academicTestListApi = config.API_DOMAIN + config.API_GET_REPORT_LIST_ACADEMIC;

        let academicTestListData = {
            access_token: selectedAccessToken,
        };

        $.post(academicTestListApi, academicTestListData, function(response, status) {
                this.setState({
                    selectedAccessToken: selectedAccessToken,
                    selectedUserName: userName,
                    selectedUserRole: userRole,
                    selectedUserDisplayName: userDisplayName,
                    selectedTestList: response.sort(this.sortReportDateDesc)
                });

                let userInfo = {
                    selectedAccessToken: selectedAccessToken,
                    selectedUserName: this.state.selectedUserName,
                    selectedUserRole: this.state.selectedUserRole,
                    selectedUserDisplayName: this.state.selectedUserDisplayName,
                    selectedTestList: this.state.selectedTestList,
                };
                this.props.handleUserDashboard(userInfo);
        }.bind(this), 'json')
            .fail(function(status) {

            });

    }

    sortReportDateDesc(a, b) {
        let aDate = new Date(a.quiz_date).getTime();
        let bDate = new Date(b.quiz_date).getTime();
        let diff = aDate - bDate;
        return diff <= 0;
    }

    render() {
        return (
            <div className="side-nav fixed">
                <UserList
                    bindedUserList={this.state.bindedUserList}
                    selectedUserName={this.state.selectedUserName}
                    selectedUserRole={this.state.selectedUserRole}
                    handleTestList={this.handleTestList.bind(this)}
                />
                <TestList
                    mainAccessToken={this.props.mainAccessToken}
                    selectedAccessToken={this.state.selectedAccessToken}
                    selectedUserName={this.state.selectedUserName}
                    selectedUserRole={this.state.selectedUserRole}
                    selectedTestList={this.state.selectedTestList}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            </div>

        )
    }
}

LeftNav.contextTypes = {
    //router: PropTypes.object.isRequired,
    handleReportIframeShow: PropTypes.func,
    handleUserDashboard: PropTypes.func
};


export default LeftNav;