import React, {Component} from 'react';
let config = require('zx-const')[process.env.NODE_ENV];

export function handleReportTitle(reportType, mainReportData) {
    let data = mainReportData.basic;
    let header = '的报告'
    let title;
    if(reportType === config.REPORT_TYPE_PROJECT){
        let arr = data.area.split('/');
        title = `${arr[0]}${arr[1]}${arr[2]}${header}`;
    }else if(reportType === config.REPORT_TYPE_GRADE){
        title = `${data.school}${header}`;
    }else if(reportType === config.REPORT_TYPE_KLASS){
        title = `${data.school}/${data.classroom}${header}`;
    }else if(reportType === config.REPORT_TYPE_PUPIL){
        title = `${data.school}${data.classroom}/${data.name}${header}`;
    }

    return title;
}

export class SectionReportTitle extends Component{
    render(){
        let data = this.props.data;
        let reportTitle = data.reportTitle;
        let subTitle = data.subTitle;
        return(
            <div>
                <div className="zx-subtitle">{subTitle}</div>
                <h1>{reportTitle}</h1>
            </div>
        )
    }
}