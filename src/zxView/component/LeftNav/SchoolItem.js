import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import createCookie from 'zx-misc/createCookie';

import KlassItem from './KlassItem';

let config = require('zx-const')[process.env.NODE_ENV];

class SchoolItem extends React.Component {
    constructor() {
        super();
        this.state = {
            klassList: null
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
            if (!this.state.klassList) {
                this.handleKlassList();
            }
        }
    }

    handleKlassList() {
        let wxOpenId = this.props.wxOpenId;
        let userName = this.props.userName;

        let reportAddressProjectNav = config.API_DOMAIN + '/api/wx/v1.1' + this.props.reportUrl.replace('.json', '/nav.json');

        let data = {
            'user_name': userName,
            'wx_openid': wxOpenId
        };

        $.post(reportAddressProjectNav, data, function(response, status) {
                response = JSON.parse(response);
                this.setState({
                    klassList: response[Object.keys(response)[0]]
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
        let reportSrc = config.URL_REPORT_ACADEMIC_GRADE;
        createCookie('user_name', this.props.userName, 1);
        createCookie('report_url', this.props.reportUrl, 1);

        let reportInfo = {
            reportName: this.props.reportName,
            reportUrl: this.props.reportUrl,
        };
        this.props.handleReportIframeShow(reportSrc, reportInfo, target);
    }

    render() {
        let klassList = this.state.klassList;
        let contentGroupList;
        if (klassList) {
            let klassItems = klassList.map((klassItem, index) => {
                return <KlassItem
                    key={index}
                    wxOpenId={this.props.wxOpenId}
                    userName={this.props.userName}
                    groupLabel={klassItem[1].label}
                    reportName={this.props.reportName}
                    reportUrl={klassItem[1].report_url}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            });
            contentGroupList = <ul className="collapsible zx-collapsible-child" data-collapsible="expandable">{klassItems}</ul>
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

SchoolItem.contextTypes = {
    handleReportIframeShow: PropTypes.func
};

export default SchoolItem;