import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import createCookie from 'zx-misc/createCookie';

let config = require('zx-const')[process.env.NODE_ENV];

class StudentItem extends React.Component {
    handleReport(e) {
        e.stopPropagation();
        e.preventDefault();
        let target = $(e.target).parents('li')[0];
        let reportSrc = config.URL_REPORT_ACADEMIC;
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
        let groupLabel = this.props.groupLabel.split(/[()]/)[0];
        let icon = 'school';
        let reportLink = null;

        return (
            <li onClick={this.handleReport.bind(this)}>
                <div className="collapsible-header">
                    <div className="zx-icon-text">
                        <i className="material-icons">{icon}</i>
                        {groupLabel}{reportLink}
                    </div>
                </div>
            </li>
        )
    }
}

StudentItem.contextTypes = {
    handleReportIframeShow: PropTypes.func
};

export default StudentItem;