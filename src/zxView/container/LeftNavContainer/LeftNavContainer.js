import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { Link } from 'react-router'
import $ from 'jquery';

import handleResponseError from '../../misc/handleResponseError';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import UserList from './UserList';
import TestList from './TestList';
import handleJsonParse from '../../../misc/handleJsonParse';

let config = require('zx-const')[process.env.NODE_ENV];

class LeftNav extends React.Component {
    componentWillReceiveProps(nextProps) {
        //本地localhost模式
        if(process.env.NODE_ENV === config.DEV_ENV){
            if (nextProps.selectedAccessToken !== this.props.selectedAccessToken){
                let academicTestListApi = config.API_DOMAIN + config.REPORT_LIST + `/list_${nextProps.selectedAccessToken}.json`;
                let academicTestListPromise = $.get(academicTestListApi);
                academicTestListPromise.done(function (response) {
                    response = handleJsonParse(response);
                    response = response.filter((item, index) => {
                        let testUrl = item.report_url;
                        testUrl = testUrl ? testUrl.replace('/api/v1.2', '') : null;
                        return (testUrl && testUrl !== '');
                    });
                    response = response.reverse();

                    this.props.handleDashboardTestList(response);
                }.bind(this));
            }
        }else {
            if (nextProps.selectedAccessToken !== this.props.selectedAccessToken) {
                this.handleTestList(nextProps.selectedAccessToken);
            }
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
            <div className="side-nav fixed">
                {contentUserList}
                {contentTestList}
                {contentWarning}
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

LeftNav.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LeftNav;