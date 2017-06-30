import React from 'react';
import PropTypes from 'prop-types'; // ES6
import ReportIframe from './ReportIframe';

class ReportContainer extends React.Component {
    render() {
        let iframeSrc = this.props.iframeSrc;
        let className = 'zx-report-iframe-container';
        if (this.props.show) {
            className = 'zx-report-iframe-container show';
        }
        return (
            <div className={className}>
                <i className="material-icons zx-icon-clear" onClick={this.props.handleReportIframeClear.bind(this)}>clear</i>
                <ReportIframe iframeSrc={iframeSrc} />
            </div>
        )
    }
}

ReportContainer.contextTypes = {
    handleReportIframeClear: PropTypes.func
};

export default ReportContainer;