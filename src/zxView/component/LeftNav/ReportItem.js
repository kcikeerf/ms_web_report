import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import SchoolItem from './SchoolItem';
import KlassItem from './KlassItem';
import StudentItem from './StudentItem';

let config = require('zx-const')[process.env.NODE_ENV];

class ReportItem extends React.Component {
    constructor() {
        super();
        this.state = {
            groupList: null
        }
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

        return (
            <li onClick={this.handleExpand.bind(this)}>
                <div className="collapsible-header">
                    <div>
                        <i className="material-icons">library_books</i>
                        <div className="zx-icon-text">{this.props.reportName}</div>
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