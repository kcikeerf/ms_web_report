import React from 'react';

class ReportIframe extends React.Component {
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
            <div className="zx-iframe-container">
                <div className="zx-iframe zx-iframe-16x9">
                    <iframe
                        id="zx-report-container"
                        src={iframeSrc}
                        frameBorder="0"
                        scrolling="yes"
                        onLoad={this.iframeLoaded.bind(this)}
                    >
                    </iframe>
                </div>
            </div>
        )
    }
}

ReportIframe.contextTypes = {
};

export default ReportIframe;