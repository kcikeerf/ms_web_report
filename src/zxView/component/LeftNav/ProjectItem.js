import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import SchoolItem from './SchoolItem';
import KlassItem from './KlassItem';
import StudentItem from './StudentItem';

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
            el.children('.collapsible-header').find('.material-icons').text('keyboard_arrow_right');
        }
        else {
            el.addClass('active');
            el.children('.collapsible-body').slideDown(300);
            el.children('.collapsible-header').find('.material-icons').text('keyboard_arrow_down');
            if (!this.state.groupList) {
                this.handleGroupList();
            }
        }


    }
    handleGroupList() {
        let accessToken = this.props.accessToken;

        let childReportNav = config.API_DOMAIN + this.props.reportUrl.replace('.json', '/nav.json');

        let childReportNavData = {
            access_token: accessToken
        };

        $.post(childReportNav, childReportNavData, function(response, status) {
                response = JSON.parse(response);
                this.setState({
                    groupList: response[Object.keys(response)[0]]
                });
            }.bind(this),
            'json')
            .fail(function(status) {

            });
    }

    handleReport(e) {
        e.stopPropagation();
        let selectedUserRole = this.props.selectedUserRole;
        let target = $(e.target).parents('li');

        if (selectedUserRole === config.USER_ROLE_TEACHER) {
            $('#zxModalWarning').modal('open');
        }
        else {
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
            else if (selectedUserRole === config.USER_ROLE_PUPIL) {
                reportSrc = config.URL_REPORT_ACADEMIC_STUDENT;
            }
            createCookie('user_name', this.props.userName, 1);
            createCookie('report_url', this.props.reportUrl, 1);

            let reportInfo = {
                reportName: this.props.reportName,
                reportUrl: this.props.reportUrl,
            };
            this.props.handleReportIframeShow(reportSrc, reportInfo, target);
        }
    }

    render() {
        // 获取报告类型
        let reportUrlArr = this.props.reportUrl.split('/');
        let reportType = reportUrlArr[reportUrlArr.length-2];

        let groupList = this.state.groupList;
        let contentGroupList, preloader;
        if (reportType !== config.REPORT_TYPE_PUPIL) {
            if (groupList) {
                let groupItems = groupList.map((groupItem, index) => {
                    let GroupItem;
                    if (reportType === config.REPORT_TYPE_KLASS) {
                        GroupItem = KlassItem;
                    }
                    else if (reportType === config.REPORT_TYPE_GRADE) {
                        GroupItem = KlassItem;
                    }
                    else if (reportType === config.REPORT_TYPE_PROJECT) {
                        GroupItem = SchoolItem;
                    }

                    return <GroupItem
                        key={index}
                        accessToken={this.props.accessToken}
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

        return (
            <li onClick={this.handleReport.bind(this)}>
                <div className="collapsible-header">
                    {
                        contentGroupList &&
                        <i className="material-icons" onClick={this.handleExpand.bind(this)}>{icon}</i>
                    }
                    <div className="zx-icon-text">{groupLabel}</div>
                </div>
                {contentGroupList}
            </li>
        )
    }
}

ProjectItem.contextTypes = {
    handleReportIframeShow: PropTypes.func
};