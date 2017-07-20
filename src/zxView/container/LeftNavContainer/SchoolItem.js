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
            el.children('.collapsible-header').find('.zx-list-expand').text('keyboard_arrow_right');
        }
        else {
            el.addClass('active');
            el.children('.collapsible-body').slideDown(300);
            el.children('.collapsible-header').find('.zx-list-expand').text('keyboard_arrow_down');
            if (!this.state.klassList) {
                this.handleKlassList();
            }
        }
    }

    handleKlassList() {
        let selectedAccessToken = this.props.selectedAccessToken;

        let klassReportNav = config.API_DOMAIN + '/api/v1.2' + this.props.reportUrl.replace('.json', '/nav.json');

        let klassReportNavData = {
            access_token: selectedAccessToken
        };

        $.post(klassReportNav, klassReportNavData, function(response, status) {
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
        createCookie('selected_access_token', this.props.selectedAccessToken, 1);
        createCookie('selected_user_name', this.props.selectedUserName, 1);
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
                    selectedAccessToken={this.props.selectedAccessToken}
                    selectedUserName={this.props.selectedUserName}
                    groupLabel={klassItem[1].label}
                    reportName={this.props.reportName}
                    reportUrl={klassItem[1].report_url}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            });
            contentGroupList = <ul className="collapsible zx-collapsible-child" data-collapsible="expandable">{klassItems}</ul>
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

        let groupLabel = this.props.groupLabel;
        let icon = 'keyboard_arrow_right';

        return (
            <li onClick={this.handleReport.bind(this)}>
                <div className="collapsible-header">
                    <i className="material-icons zx-list-expand" onClick={this.handleExpand.bind(this)}>{icon}</i>
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