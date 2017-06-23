import React from 'react';
import PropTypes from 'prop-types'; // ES6

let config = require('zx-const')[process.env.NODE_ENV];

class StudentItem extends React.Component {
    handleReport(e) {
        e.stopPropagation();
        e.preventDefault();
        let reportSrc = config.URL_REPORT_ACADEMIC_STUDENT;

        this.props.handleReportIframe(reportSrc);
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
    router: PropTypes.object.isRequired,
    handleReportIframe: PropTypes.func
};

export default StudentItem;