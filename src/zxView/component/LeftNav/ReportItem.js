import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import SchoolItem from './SchoolItem';
import KlassItem from './KlassItem';
import StudentItem from './StudentItem';

import createCookie from 'zx-misc/createCookie';

let config = require('zx-const')[process.env.NODE_ENV];

class ReportItem extends React.Component {
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
            el.children('.collapsible-header').find('.material-icons').text('keyboard_arrow_down');
        }
        else {
            el.addClass('active');
            el.children('.collapsible-body').slideDown(300);
            el.children('.collapsible-header').find('.material-icons').text('keyboard_arrow_up');
            if (!this.state.groupList) {
                this.handleGroupList();
            }
        }


    }
    handleGroupList() {
        let wxOpenId = this.props.wxOpenId;
        let userName = this.props.userName;

        let reportAddressProjectNav = config.API_DOMAIN + this.props.reportUrl.replace('.json', '/nav.json');

        let data = {
            'user_name': userName,
            'wx_openid': wxOpenId
        };

        $.post(reportAddressProjectNav, data, function(response, status) {
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
        //高亮效果
        let target = e.target;
        let index = $(target).parents('li').index();
        $('.zx-icon-text').css('color','#fff').eq(index).css('color','rgba(189, 189, 189, 0.8)');

        if (this.props.userRole === config.USER_ROLE_TEACHER) {
            $('#zxModalWarning').modal('open');
        }
        else {
            e.stopPropagation();
            e.preventDefault();
            let reportSrc;
            if (this.props.userRole === config.USER_ROLE_AREA_ADMINISTRATOR) {
                reportSrc = config.URL_REPORT_ACADEMIC_PROJECT;
            }
            else if (this.props.userRole === config.USER_ROLE_TENANT_ADMINISTRATOR) {
                reportSrc = config.URL_REPORT_ACADEMIC_GRADE;
            }
            else if (this.props.userRole === config.USER_ROLE_PUPIL) {
                reportSrc = config.URL_REPORT_ACADEMIC_STUDENT;
            }
            createCookie('user_name', this.props.userName, 1);
            createCookie('report_url', this.props.reportUrl, 1);

            let reportInfo = {
                reportName: this.props.reportName,
                reportUrl: this.props.reportUrl,
            };
            this.props.handleReportIframeShow(reportSrc, reportInfo);
        }
    }

    render() {
        let groupList = this.state.groupList;
        let contentGroupList, preloader;
        if (groupList) {
            let groupItems = groupList.map((groupItem, index) => {

                let reportUrlArr = this.props.reportUrl.split('/');
                let reportType = reportUrlArr[reportUrlArr.length-2];
                let GroupItem;
                if (reportType === 'pupil') {
                    GroupItem = StudentItem;
                }
                else if (reportType === 'klass') {
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
                    wxOpenId={this.props.wxOpenId}
                    userName={this.props.userName}
                    groupLabel={groupItem[1].label}
                    reportName={this.props.reportName}
                    reportUrl={groupItem[1].report_url}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            });
            contentGroupList = <ul className="collapsible zx-collapsible-child zx-padding-left" data-collapsible="expandable">{groupItems}</ul>
        }

        else {
            contentGroupList =
                <div>
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            ;
        }

        let groupLabel = this.props.reportName;
        let icon = 'keyboard_arrow_down';

        return (
            <li onClick={this.handleReport.bind(this)}>
                <div className="collapsible-header">
                    <div>
                        <i className="material-icons" onClick={this.handleExpand.bind(this)}>{icon}</i>
                        <div className="zx-icon-text">{groupLabel}</div>
                    </div>
                </div>
                <div className="collapsible-body">
                    {contentGroupList}
                </div>
            </li>
        )
    }
}

ReportItem.contextTypes = {
    handleReportIframeShow: PropTypes.func
};

export default ReportItem;