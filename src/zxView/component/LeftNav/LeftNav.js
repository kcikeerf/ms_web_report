import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import UserItem from './UserItem';
import ReportItem from './ReportItem';

let config = require('zx-const')[process.env.NODE_ENV];

class LeftNav extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedUserName: null,
            selectedUserDisplayName: null,
            selectedUserRole: null,
            selectedReportList: null
        }
    }

    componentDidMount() {
        $('#zxUserSelect').change(function(){
            let userName = $('#zxUserSelect').find(':selected').val();
            let userRole = $('#zxUserSelect').find(':selected').attr('data-user-role');
            let userDisplayName = $('#zxUserSelect').find(':selected').attr('data-user-display-name');

            if (userName !== this.state.selectedUserName) {
                this.setState({
                    selectedUserName: null,
                    selectedUserDisplayName: null,
                    selectedUserRole: null,
                    selectedReportList: null
                });

                this.handleReportList(userName, userRole, userDisplayName);
            }
        }.bind(this));
    }

    // 导航到 设置 页面
    handleNav(event) {
        event.preventDefault();
        //this.context.router.push('/settings');
    }

    // 加载被选择的用户的报告列表
    handleReportList(userName, userRole, userDisplayName) {
        let wxOpenId = this.props.wxOpenId;
        let apiAddressReportList = config.API_DOMAIN + config.API_GET_REPORT_LIST_ACADEMIC;

        let data = {
            'user_name': userName,
            'wx_openid': wxOpenId
        };

        $.post(apiAddressReportList, data, function(response, status) {
                this.setState({
                    selectedUserName: userName,
                    selectedUserRole: userRole,
                    selectedUserDisplayName: userDisplayName,
                    selectedReportList: response.sort(this.sortReportDateDesc)
                });

                let userInfo = {
                    selectedUserName: this.state.selectedUserName,
                    selectedUserRole: this.state.selectedUserRole,
                    selectedUserDisplayName: this.state.selectedUserDisplayName,
                    selectedReportList: this.state.selectedReportList,
                };

                this.props.handleUserDashboard(userInfo);

            }.bind(this),
            'json')
            .fail(function(status) {

            });
    }

    sortReportDateDesc(a, b) {
        let aDate = new Date(a.quiz_date).getTime();
        let bDate = new Date(b.quiz_date).getTime();
        let diff = aDate - bDate;
        if (diff >= 0) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        let bindedUsers = this.props.bindedUsers;
        let userList;
        let contentUserSelectTitle = '用户加载中...';
        if (bindedUsers) {
            contentUserSelectTitle = '选择用户';
            userList = bindedUsers.map((bindedUser, index) => {
                return <UserItem
                    key={index}
                    id={index}
                    wxOpenId={this.props.wxOpenId}
                    userName={bindedUser.user_name}
                    userDisplayName={bindedUser.name}
                    userRole={bindedUser.role}
                    handleReportIframe={this.props.handleReportIframe.bind(this)}
                    handleReportList={this.handleReportList.bind(this)}
                />
            });
        }

        let selectedReportList = this.state.selectedReportList;
        let contentReportList;
        let contentReportListTitle = '报告列表加载中...';
        let preloader = 'preloader-wrapper active zx-preloader show';
        if (selectedReportList) {
            contentReportListTitle = '报告列表';
            preloader = 'preloader-wrapper zx-preloader hide';
            contentReportList = selectedReportList.map((reportItem, index) => {
                return <ReportItem
                    key={index}
                    wxOpenId={this.props.wxOpenId}
                    userName={this.state.selectedUserName}
                    userRole={this.state.selectedUserRole}
                    reportName={reportItem.paper_heading}
                    reportUrl={reportItem.report_url}
                    handleReportIframe={this.props.handleReportIframe.bind(this)}
                />
            });
            contentReportList =
                <ul className="zx-collapsible-parent">
                    {contentReportList}
                </ul>
            ;
        }

        return (
            <div className="side-nav fixed">
                <div className="zx-list-subtitle">{contentUserSelectTitle}</div>
                <div className="zx-user-select-container">
                    <div className="input-field">
                        <select id="zxUserSelect">
                            {userList}
                        </select>
                    </div>
                </div>
                <div className="zx-list-subtitle">{contentReportListTitle}</div>
                <div className="zx-preloader-report-list-container">
                    <div className={preloader}>
                        <div className="spinner-layer">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {contentReportList}
            </div>

        )
    }
}

LeftNav.contextTypes = {
    //router: PropTypes.object.isRequired,
    handleReportIframe: PropTypes.func,
    handleUserDashboard: PropTypes.func
};


export default LeftNav;