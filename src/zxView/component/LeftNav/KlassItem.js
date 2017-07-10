import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import StudentItem from './StudentItem';

import createCookie from 'zx-misc/createCookie';

let config = require('zx-const')[process.env.NODE_ENV];

class KlassItem extends React.Component {
    constructor() {
        super();
        this.state = {
            studentList: null
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
            el.children('.collapsible-header').find('.material-icons').text('keyboard_arrow_right');
        }
        else {
            el.addClass('active');
            el.children('.collapsible-body').slideDown(300);
            el.children('.collapsible-header').find('.material-icons').text('keyboard_arrow_down');
            if (!this.state.studentList) {
                this.handleStudentList();
            }
        }

    }

    handleStudentList() {
        let accessToken = this.props.accessToken;

        let pupilReportNav = config.API_DOMAIN + '/api/v1.2' + this.props.reportUrl.replace('.json', '/nav.json');

        let pupilReportNavData = {
            access_token: accessToken
        };

        $.post(pupilReportNav, pupilReportNavData, function(response, status) {
                response = JSON.parse(response);
                this.setState({
                    studentList: response[Object.keys(response)[0]]
                });
            }.bind(this),
            'json')
            .fail(function(status) {

            });
    }

    handleReport(e) {
        e.stopPropagation();
        e.preventDefault();
        let target = $(e.target).parents('li')[0];
        let reportSrc = config.URL_REPORT_ACADEMIC_CLASS;
        createCookie('access_token', this.props.accessToken, 1);
        createCookie('selected_user_name', this.props.selectedUserName, 1);
        createCookie('report_url', this.props.reportUrl, 1);

        let reportInfo = {
            reportName: this.props.reportName,
            reportUrl: this.props.reportUrl,
        };
        this.props.handleReportIframeShow(reportSrc, reportInfo, target);
    }

    render() {
        let studentList = this.state.studentList;
        let contentGroupList;
        if (studentList) {
            let studentItems = studentList.map((studentItem, index) => {
                return <StudentItem
                    key={index}
                    accessToken={this.props.accessToken}
                    selectedUserName={this.props.selectedUserName}
                    groupLabel={studentItem[1].label}
                    reportName={this.props.reportName}
                    reportUrl={studentItem[1].report_url}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            });
            contentGroupList = <ul className="collapsible zx-collapsible-child" data-collapsible="expandable">{studentItems}</ul>
        }
        else {
            contentGroupList = <span className="zy-text-align-center">报告加载中...</span>
        }

        let groupLabel = this.props.groupLabel;
        let icon = 'keyboard_arrow_right';

        return (
            <li onClick={this.handleReport.bind(this)}>
                <div className="collapsible-header">
                    <i className="material-icons" onClick={this.handleExpand.bind(this)}>{icon}</i>
                    <div className="zx-icon-text">{groupLabel}</div>
                </div>
                <div className="collapsible-body">
                    {contentGroupList}
                </div>
            </li>
        )
    }
}

KlassItem.contextTypes = {
    handleReportIframeShow: PropTypes.func
};

export default KlassItem;