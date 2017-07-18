import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import removeCookie from 'zx-misc/removeCookie';

import UserList from './UserList';
import TestList from './TestList';

let config = require('zx-const')[process.env.NODE_ENV];

class LeftNav extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedAccessToken !== this.props.selectedAccessToken) {
            this.handleTestList(nextProps.selectedAccessToken);
        }
    }

    // 加载被选择的用户的报告列表
    handleTestList(selectedAccessToken, selectedUserName=null, selectedUserRole=null, selectedUserDisplayName=null) {
        this.props.handleDashboardTestList(null);

        let academicTestListApi = config.API_DOMAIN + config.API_GET_REPORT_LIST_ACADEMIC;

        let academicTestListData = {
            access_token: selectedAccessToken,
        };

        let academicTestListPromise = $.post(academicTestListApi, academicTestListData);
        academicTestListPromise.done(function (response) {
            response= response.filter((item, index) => {
                let testUrl = item.report_url;
                testUrl = testUrl ? testUrl.replace('/api/v1.2', '') : null;
                return (testUrl&&testUrl!=='');
            });
            this.props.handleDashboardTestList(response.sort(this.sortReportDateDesc));
        }.bind(this));
        academicTestListPromise.fail(function (errorResponse) {

        }.bind(this));
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

    sortReportDateDesc(a, b) {
        let aDate = new Date(a.quiz_date).getTime();
        let bDate = new Date(b.quiz_date).getTime();
        let diff = aDate - bDate;
        return diff <= 0;
    }

    render() {
        return (
            <div className="side-nav fixed">
                {
                    this.props.mainUser &&
                    <UserList
                        mainAccessToken={this.props.mainAccessToken}
                        mainUser={this.props.mainUser}
                        handleDashboardUserInfo={this.props.handleDashboardUserInfo.bind(this)}
                    />
                }
                <TestList
                    mainAccessToken={this.props.mainAccessToken}
                    selectedAccessToken={this.props.selectedAccessToken}
                    selectedUserName={this.props.selectedUserName}
                    selectedUserRole={this.props.selectedUserRole}
                    selectedTestList={this.props.selectedTestList}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
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