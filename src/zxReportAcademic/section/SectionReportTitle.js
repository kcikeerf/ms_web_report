import React, {Component} from 'react';
let config = require('zx-const')[process.env.NODE_ENV];

export function handleReportTitle(reportType, paperInfoData, mainReportData) {
    let data = mainReportData.basic;
    let reportTitle = paperInfoData.heading;
    let heading, reportTypeLabel;
    if (reportType === config.REPORT_TYPE_PROJECT) {
        let arr = data.area.split('/');
        heading = `${arr[0]}${arr[1]}${arr[2]}`;
        reportTypeLabel = '区域报告';
    }
    else if (reportType === config.REPORT_TYPE_GRADE) {
        heading = `${data.school}`;
        reportTypeLabel = '学校报告';
    }
    else if (reportType === config.REPORT_TYPE_KLASS) {
        heading = `${data.school}·${data.classroom}`;
        reportTypeLabel = '班级报告';
    }
    else if (reportType === config.REPORT_TYPE_PUPIL) {
        heading = `${data.school}·${data.classroom}·${data.name}`;
        reportTypeLabel = '学生报告';
    }

    return {heading, reportTitle, reportTypeLabel};
}

export class SectionReportTitle extends Component{
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