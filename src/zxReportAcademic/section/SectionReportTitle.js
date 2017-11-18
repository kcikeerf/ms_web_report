import React, {Component} from 'react';
import {Map, is} from 'immutable';
import $ from 'jquery';

export class SectionReportTitle extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    reportPrint() {
        let html = this.convertCanvasToBase64($("#report-print"));
        html.print({
            globalStyles: true,
            mediaPrint: true,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred(),
            timeout: 750,
            title: null,
            doctype: '<!doctype html>'
        });

    }

    convertCanvasToBase64(contentDocument) {
        let regularCanvas = contentDocument.find('canvas');
        [].forEach.call(regularCanvas, function (canvasElement) {
            let img = new Image();
            img.src = canvasElement.toDataURL();
            canvasElement.replaceWith(img);
        });

        return contentDocument;
    }

    render() {
        let id = this.props.id;
        let data = this.props.data;
        let reportTitle = data.reportTitle;
        let reportHeading = data.reportHeading;
        let reportLabel = data.reportLabel;
        return (
            <div id={id} className="header">
                <div className="zx-title-container">
                    <div className="zx-subtitle">
                        <div className="zx-report-title">{reportTitle}</div>
                        {/*<div className="zx-report-type">{reportLabel}</div>*/}
                        <div className="zx-report-type" onClick={this.reportPrint.bind(this)}>打印报告</div>
                    </div>
                    <h1>{reportHeading}</h1>
                </div>
            </div>
        )
    }
}