import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import UserList from './UserList';
import TestList from './TestList';

let config = require('zx-const')[process.env.NODE_ENV];

class LeftNav extends React.Component {
    constructor() {
        super();
        this.state = {
            bindedUserList: null,
            selectedUserName: null,
            selectedUserDisplayName: null,
            selectedUserRole: null,
            selectedTestList: null
        }
    }

    componentDidMount() {
        let bindedUserList = this.props.bindedUserList;
        if (!bindedUserList || bindedUserList.length === 0) {
            this.handleUserInfo();
        }
    }

    // 导航到 设置 页面
    handleNav(event) {
        event.preventDefault();
        //this.context.router.push('/settings');
    }

    handleUserInfo() {
        let accessToken = this.props.accessToken;
        let userInfoApi = config.API_DOMAIN + config.API_GET_USER_INFO;
        let userInfoData = {
            access_token: accessToken
        };
        let userInfoPromise = $.post(userInfoApi, userInfoData);

        $.post(userInfoApi, userInfoData, function(response, status) {
                console.log(response);
                let userName = response.user_name;
                let userDisplayName = response.name;
                let userRole = response.role;
                this.setState({
                    selectedUserName: userName,
                    selectedUserDisplayName: userDisplayName,
                    selectedUserRole: userRole
                });
                this.handleTestList(userName, userRole, userDisplayName);
            }.bind(this),
            'json')
            .fail(function(status) {

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
    handleTestList(userName, userRole, userDisplayName) {
        let accessToken = this.props.accessToken;
        let academicTestListApi = config.API_DOMAIN + config.API_GET_REPORT_LIST_ACADEMIC;

        let academicTestListData = {
            access_token: accessToken,
        };

        $.post(academicTestListApi, academicTestListData, function(response, status) {
                this.setState({
                    selectedUserName: userName,
                    selectedUserRole: userRole,
                    selectedUserDisplayName: userDisplayName,
                    selectedTestList: response.sort(this.sortReportDateDesc)
                });

                let userInfo = {
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
        return diff >= 0;
    }

    render() {
        return (
            <div className="side-nav fixed">
                {
                    this.state.bindedUserList &&
                    <UserList
                        bindedUserList={this.state.bindedUserList}
                        selectedUserName={this.state.selectedUserName}
                        selectedUserRole={this.state.selectedUserRole}
                        handleTestList={this.handleTestList.bind(this)}
                    />
                }
                <TestList
                    accessToken={this.props.accessToken}
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