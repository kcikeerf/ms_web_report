import React, {Component} from 'react';
import { Map, is } from 'immutable';
let config = require('zx-const')[process.env.NODE_ENV];

//处理标题的方法
export function handleReportTitle(reportType, paperInfoData, mainReportData) {
    let data = mainReportData.basic;
    let reportTitle = paperInfoData.heading;
    let heading, reportTypeLabel;
    if (reportType === config.REPORT_TYPE_PROJECT) {
        let arr = data.area.split('/');
        heading = `${arr[0]}${arr[1]}${arr[2]}`;
        reportTypeLabel = config.REPORT_TYPE_PROJECT_LABEL;
    }
    else if (reportType === config.REPORT_TYPE_GRADE) {
        heading = `${data.school}`;
        reportTypeLabel = config.REPORT_TYPE_GRADE_LABEL;
    }
    else if (reportType === config.REPORT_TYPE_KLASS) {
        heading = `${data.school}·${data.classroom}`;
        reportTypeLabel = config.REPORT_TYPE_KLASS_LABEL;
    }
    else if (reportType === config.REPORT_TYPE_PUPIL) {
        heading = `${data.school}·${data.classroom}·${data.name}`;
        reportTypeLabel = config.REPORT_TYPE_PUPIL_LABEL;
    }

    return {heading, reportTitle, reportTypeLabel};
}

//显示标题的block
export class SectionReportTitle extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render(){
        let data = this.props.data;
        let reportTitle = data.reportTitle;
        let heading = data.heading;
        let reportTypeLabel = data.reportTypeLabel;
        return(
            <div className="zx-title-container">
                <div className="zx-subtitle">
                    <div className="zx-report-title">{reportTitle}</div>
                    <div className="zx-report-type">{reportTypeLabel}</div>
                </div>
                <h1>{heading}</h1>
            </div>
        )
    }
}