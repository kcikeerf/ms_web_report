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
        }
        else {
            el.addClass('active');
            el.children('.collapsible-body').slideDown(300);
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
        let reportSrc = config.URL_REPORT_ACADEMIC_GRADE;
        createCookie('user_name', this.props.userName, 1);
        createCookie('report_url_grade', this.props.reportUrl, 1);
        createCookie('tmp_grade_class_number', 0, 1);
        localStorage.removeItem('gradeScrollPosition');

        this.props.handleReportIframe(reportSrc);
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
                    reportUrl={klassItem[1].report_url}
                    handleReportIframe={this.props.handleReportIframe.bind(this)}
                />
            });
            contentGroupList = <ul className="collapsible zx-collapsible-child zx-padding-15" data-collapsible="expandable">{klassItems}</ul>
        }
        else {
            contentGroupList = <span className="zy-text-align-center">报告加载中...</span>
        }

        let groupLabel = this.props.groupLabel;
        let icon = 'account_balance';
        let reportLink = <span
            className="zx-report-link tooltipped"
            data-position="bottom"
            data-delay="50"
            data-tooltip="点击[查看报告]，查看学校报告"
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

SchoolItem.contextTypes = {
    router: PropTypes.object.isRequired,
    handleReportIframe: PropTypes.func
};

export default SchoolItem;