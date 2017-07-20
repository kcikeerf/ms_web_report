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