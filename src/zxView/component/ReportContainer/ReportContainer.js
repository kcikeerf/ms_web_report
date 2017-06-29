import React from 'react';
import ReportIframe from './ReportIframe';

class ReportContainer extends React.Component {
    render() {
        let iframeSrc = this.props.iframeSrc;
        return (
            <div className="zx-report-iframe-container">
                <div></div>
                <ReportIframe iframeSrc={iframeSrc} />
            </div>
        )
    }
}

ReportContainer.contextTypes = {
};

export default ReportContainer;