import React from 'react';

class ReportContainer extends React.Component {
    iframeLoaded(e) {
        let iframe = e.target;
        setTimeout(function() {
            iframe.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        }, 2000);

    }
    render() {
        let iframeSrc = this.props.iframeSrc;
        let iframeWidth = '1000';
        let iframeHeight = '100%';
        return (
            <div className="zx-report-iframe-container">
                <iframe
                    id="zx-report-container"
                    src={iframeSrc}
                    width={iframeWidth}
                    height={iframeHeight}
                    frameBorder="0"
                    scrolling="no"
                    onLoad={this.iframeLoaded.bind(this)}
                >
                </iframe>
            </div>
        )
    }
}

ReportContainer.contextTypes = {
};

export default ReportContainer;