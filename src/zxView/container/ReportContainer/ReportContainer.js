import React from 'react';
import PropTypes from 'prop-types'; // ES6

import {handleParseReportUrl} from 'zx-misc/handleReportUrl';
import ReportIframe from './ReportIframe';

class ReportContainer extends React.Component {
    render() {
        let iframeSrc;
        let reportInfo = this.props.reportInfo;
        let reportIframeSrc = this.props.reportIframeSrc;
        if (reportIframeSrc && reportInfo) {
            let query = handleParseReportUrl(reportInfo.reportUrl);
            iframeSrc = `${reportIframeSrc}?${query}`;
        }
        let className = 'zx-report-iframe-container';
        if (this.props.show) {
            className = 'zx-report-iframe-container show';
        }
        return (
            <div className={className}>
                <button
                    className="btn zx-icon-clear"
                    onClick={this.props.handleReportIframeClear.bind(this)}>
                    <i className="material-icons">clear</i>
                </button>
                <ReportIframe
                    iframeSrc={iframeSrc}
                    ref={(iframe) => {this.iframe = iframe}}
                />
            </div>
        )
    }
}

ReportContainer.contextTypes = {
    handleReportIframeClear: PropTypes.func
};

export default ReportContainer;