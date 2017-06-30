import React from 'react';
import PropTypes from 'prop-types'; // ES6

import createCookie from 'zx-misc/createCookie';

let config = require('zx-const')[process.env.NODE_ENV];

class StudentItem extends React.Component {
    handleReport(e) {
        e.stopPropagation();
        e.preventDefault();
        let reportSrc = config.URL_REPORT_ACADEMIC_STUDENT;
        createCookie('user_name', this.props.userName, 1);
        createCookie('report_url', this.props.reportUrl, 1);

        let reportInfo = {
            reportName: this.props.reportName,
            reportUrl: this.props.reportUrl,
        };
        this.props.handleReportIframeShow(reportSrc, reportInfo);
    }

    render() {
        let groupLabel = this.props.groupLabel.split(/[()]/)[0];
        let icon = 'school';
        let reportLink = null;

        return (
            <li>
                <div className="collapsible-header">
                    <div>
                        <i className="material-icons">{icon}</i>
                        <div className="zx-icon-text">{groupLabel}{reportLink}</div>
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