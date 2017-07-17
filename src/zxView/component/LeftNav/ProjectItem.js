import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import SchoolItem from './SchoolItem';
import KlassItem from './KlassItem';
// import StudentItem from './StudentItem';

import createCookie from 'zx-misc/createCookie';

let config = require('zx-const')[process.env.NODE_ENV];

export default class ProjectItem extends React.Component {
    constructor() {
        super();
        this.state = {
            groupList: null
        }
    }

    componentDidMount() {
    }

    handleExpand(e) {
        e.preventDefault();
        e.stopPropagation();
        let el = $(e.target).closest('li');

        let isActive = el.hasClass('active');
        if (isActive) {
            el.removeClass('active');
            el.children('.collapsible-body').slideUp(300);
            el.children('.collapsible-header').find('.zx-list-expand').text('keyboard_arrow_right');
        }
        else {
            el.addClass('active');
            el.children('.collapsible-body').slideDown(300);
            el.children('.collapsible-header').find('.zx-list-expand').text('keyboard_arrow_down');
            if (!this.state.groupList) {
                this.handleGroupList();
            }
        }


    }
    handleGroupList() {
        let reportUrl = this.props.reportUrl;
        let selectedAccessToken = this.props.selectedAccessToken;
        let selectedUserName= this.props.selectedUserName;
        let selectedUserRole = this.props.selectedUserRole;
        let testId, tenantId;

        let childReportNav;
        let childReportNavData = {
            access_token: selectedAccessToken
        };
        if (selectedUserRole === config.USER_ROLE_TEACHER) {
            let reportArr = reportUrl.substring(reportUrl.indexOf('.')).split('/');
            let positionTests = reportArr.indexOf('tests');
            testId = reportArr[ positionTests + 1 ];

            let positionGrade = reportArr.indexOf('grade');
            tenantId = reportArr[ positionGrade + 1 ].split('.')[0];

            childReportNav = config.API_DOMAIN + config.API_KLASS_LIST;
            childReportNavData.child_user_name = selectedUserName;
            childReportNavData.test_id = testId;
            childReportNavData.tenant_uid = tenantId;
        }
        else {
            childReportNav = config.API_DOMAIN + reportUrl.replace('.json', '/nav.json');
        }

        $.post(childReportNav, childReportNavData, function(response, status) {
                if (selectedUserRole === config.USER_ROLE_TEACHER) {
                    this.setState({
                        groupList: response
                    });
                }
                else {
                    response = JSON.parse(response);
                    this.setState({
                        groupList: response[Object.keys(response)[0]]
                    });
                }

            }.bind(this),
            'json')
            .fail(function(status) {

            });
    }

    handleReport(e) {
        e.stopPropagation();
        let selectedUserRole = this.props.selectedUserRole;
        let target = $(e.target).parents('li');

        e.preventDefault();
        let reportSrc;
        if (selectedUserRole === config.USER_ROLE_AREA_ADMINISTRATOR) {
            reportSrc = config.URL_REPORT_ACADEMIC_PROJECT;
        }
        else if (selectedUserRole === config.USER_ROLE_PROJECT_ADMINISTRATOR) {
            reportSrc = config.URL_REPORT_ACADEMIC_PROJECT;
        }
        else if (selectedUserRole === config.USER_ROLE_TENANT_ADMINISTRATOR) {
            reportSrc = config.URL_REPORT_ACADEMIC_GRADE;
        }
        else if (selectedUserRole === config.USER_ROLE_TEACHER) {
            reportSrc = config.URL_REPORT_ACADEMIC_GRADE;
        }
        else if (selectedUserRole === config.USER_ROLE_PUPIL) {
            reportSrc = config.URL_REPORT_ACADEMIC_STUDENT;
        }
        createCookie('selected_access_token', this.props.selectedAccessToken, 1);
        createCookie('user_name', this.props.userName, 1);
        createCookie('report_url', this.props.reportUrl, 1);

        let reportInfo = {
            reportName: this.props.reportName,
            reportUrl: this.props.reportUrl,
        };
        this.props.handleReportIframeShow(reportSrc, reportInfo, target);
    }

    render() {
        // 获取报告类型
        let reportUrlArr = this.props.reportUrl.split('/');
        let reportType = reportUrlArr[reportUrlArr.length-2];

        let groupList = this.state.groupList;
        let contentGroupList;
        if (reportType !== 'pupil') {
            if (groupList) {
                let groupItems = groupList.map((groupItem, index) => {
                    let GroupItem;
                    if (reportType === 'klass') {
                        GroupItem = KlassItem;
                    }
                    else if (reportType === 'grade') {
                        GroupItem = KlassItem;
                    }
                    else if (reportType === 'project') {
                        GroupItem = SchoolItem;
                    }

                    return <GroupItem
                        key={index}
                        selectedAccessToken={this.props.selectedAccessToken}
                        selectedUserName={this.props.selectedUserName}
                        groupLabel={groupItem[1].label}
                        reportName={this.props.reportName}
                        reportUrl={groupItem[1].report_url}
                        handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                    />
                });
                contentGroupList =
                    <div className="collapsible-body">
                        <ul className="collapsible zx-collapsible-child" data-collapsible="expandable">{groupItems}</ul>
                    </div>
                ;
            }
            else {
                contentGroupList =
                    <div className="collapsible-body">
                        <div>
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        </div>
                    </div>
                ;
            }
        }

        let groupLabel = this.props.reportName;
        let icon = 'keyboard_arrow_right';
        let textIcon = 'school';

        return (
            <li onClick={this.handleReport.bind(this)}>
                <div className="collapsible-header">
                    {
                        contentGroupList &&
                        <i className="material-icons zx-list-expand" onClick={this.handleExpand.bind(this)}>{icon}</i>
                    }
                    <div className="zx-icon-text">
                        {groupLabel}
                    </div>
                </div>
                {contentGroupList}
            </li>
        )
    }
}

ProjectItem.contextTypes = {
    handleReportIframeShow: PropTypes.func
};