import React from 'react';
// import $ from 'jquery';

class ReportIframe extends React.Component {
    iframeLoaded(e) {
        let iFrame = e.target;
        iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
    }

    iframeReload() {
        document.getElementById('zx-report-container').contentWindow.location.reload(true);
    }

    render() {
        let iframeSrc = this.props.iframeSrc;
        // let iframeWidth = '1000';
        // let iframeHeight = '100%';
        return (
            <div className="zx-iframe-container">
                <div className="zx-iframe zx-iframe-16x9">
                    <iframe
                        title="zx-report-iframe"
                        id="zx-report-container"
                        src={iframeSrc}
                        frameBorder="0"
                        scrolling="no"
                        onLoad={this.iframeLoaded.bind(this)}
                        allowFullScreen
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