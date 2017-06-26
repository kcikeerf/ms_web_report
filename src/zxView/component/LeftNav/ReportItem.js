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
        $(document).ready(function () {
            $('.tooltipped').tooltip({delay: 50});
        });
    }
    handleExpand(e) {
        e.stopPropagation();
        let el = $(e.target).closest('li');

        let isActive = el.hasClass('active');
        if (isActive) {
            el.removeClass('active');
            el.children('.collapsible-body').slideUp(300);
        }
        else {
            el.addClass('active');
            el.children('.collapsible-body').slideDown(300);
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
        e.stopPropagation();
        e.preventDefault();
        let reportSrc = config.URL_REPORT_ACADEMIC_PROJECT;
        createCookie('user_name', this.props.userName, 1);
        createCookie('report_url', this.props.reportUrl, 1);

        this.props.handleReportIframe(reportSrc);
    }

    render() {
        let groupList = this.state.groupList;
        let contentGroupList;
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
                    reportUrl={groupItem[1].report_url}
                    handleReportIframe={this.props.handleReportIframe.bind(this)}
                />
            });
            contentGroupList = <ul className="collapsible zx-collapsible-child zx-padding-15" data-collapsible="expandable">{groupItems}</ul>
        }
        else {
            contentGroupList = <span className="zy-text-align-center">报告加载中...</span>
        }

        let groupLabel = this.props.reportName;
        let icon = 'library_books';
        let reportLink = <span
            className="zx-report-link tooltipped"
            data-position="right"
            data-delay="50"
            data-tooltip="点击[查看报告]，查看区域报告"
            onClick={this.handleReport.bind(this)}
        >
            &nbsp;&nbsp;[查看报告]
        </span>;

        return (
            <li onClick={this.handleExpand.bind(this)}>
                <div className="collapsible-header">
                    <div>
                        <i className="material-icons">{icon}</i>
                        <div className="zx-icon-text">{groupLabel}{reportLink}</div>
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
    handleReportIframe: PropTypes.func
};

export default ReportItem;