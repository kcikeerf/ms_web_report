import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import ReportRecentReportList from './ReportRecentReportList';

// let config = require('zx-const')[process.env.NODE_ENV];

export function handleBlockReportSubjectStats(data) {
    let blockData = data.blocks;
    let modifiedData = [];

    let primaryReport =  blockData.primary_school_report;
    if(Object.keys(blockData.primary_school_base).length >1){
        primaryReport.display = true;
    }else {
        primaryReport.display = false;
    }
    primaryReport.id = 'primaryschool';
    primaryReport.label = '小学';
    primaryReport.icon = 'event_note';
    primaryReport.style1 = 'brown lighten-2';
    primaryReport.style2 = 'brown lighten-1';
    modifiedData.push(primaryReport);

    let middleReport = blockData.middle_school_report;
    if(Object.keys(blockData.middle_school_base).length >1){
        middleReport.display = true;
    }else {
        middleReport.display = false;
    }
    middleReport.id = 'middleschool';
    middleReport.label = '初中';
    middleReport.icon = 'event_note';
    middleReport.style1 = 'blue-grey lighten-1';
    middleReport.style2 = 'blue-grey';
    modifiedData.push(middleReport);

    let highReport = blockData.high_school_report;
    if(Object.keys(blockData.high_school_base).length >1){
        highReport.display = true;
    }else {
        highReport.display = false;
    }
    highReport.id = 'highschool';
    highReport.label = '高中';
    highReport.style1 = 'cyan darken-1';
    highReport.style2 = 'cyan darken-2';
    highReport.icon = 'event_note';
    modifiedData.push(highReport);

    return modifiedData;
}

function handleTableRecentReportList(data) {

}

export class BlockReportSchoolStats extends Component {

    componentDidMount(){
        $(document).ready(function(){
            $('ul.tabs').tabs();
        });
    }
    render() {
        let data = this.props.data;
        let contentSubjectStat;
        contentSubjectStat = data.map((dataItem, index) => {
            let contentReportRecent = <ReportRecentReportList
                user={this.props.user}
                data = {dataItem.report_list}
                selectedAccessToken={this.props.selectedAccessToken}
                id={dataItem.id}
                handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
            />;
            let style1 = 'zx-summary-numb-box ' + dataItem.style1;
            let style2 = 'zx-summary-numb-box ' + dataItem.style2;
            if(dataItem.display){
                return (
                    <div key={index} className="card zx-subject-stats-item z-depth-3">
                        <div className="card-header card-header-position">
                            <div className={style1}>
                                <div className="zx-summary-numb-box-header">
                                    <i className="material-icons zx-summary-numb-box-icon">{dataItem.icon}</i>
                                    <div className="zx-summary-numb-box-subject">{dataItem.label}</div>
                                </div>
                                <div className="zx-summary-numb-box-body">
                                    <div className="zx-summary-numb-box-subcontent">
                                        <i className="material-icons">trending_up</i>
                                        <span>最近新增</span>
                                    </div>
                                    <span className="zx-summary-numb-box-content-increase">{dataItem.stats.lastest.total}</span>
                                    份
                                </div>
                            </div>
                            <div className={style2}>
                                <div className="zx-summary-numb-box-total">
                                    共
                                    <span className="zx-summary-numb-box-content-total">{dataItem.stats.overall.total}</span>
                                    份
                                </div>
                            </div>
                        </div>
                        <div className="card-content zx-card-content">
                            <div className="zx-recent-report-container">
                                {contentReportRecent}
                            </div>
                        </div>
                    </div>
                );
            }else {
                return (
                    <div key={index} className="card zx-subject-stats-item z-depth-3">
                        <div className="card-header card-header-position">
                            <div className={style1}>
                                <div className="zx-summary-numb-box-header">
                                    <i className="material-icons zx-summary-numb-box-icon">{dataItem.icon}</i>
                                    <div className="zx-summary-numb-box-subject">{dataItem.label}</div>
                                </div>
                                <div className="zx-summary-numb-box-body">
                                    <div className="zx-summary-numb-box-subcontent">
                                        <i className="material-icons">trending_up</i>
                                        <span>最近新增</span>
                                    </div>
                                    <span className="zx-summary-numb-box-content-increase">暂无</span>
                                </div>
                            </div>
                            <div className={style2}>
                                <div className="zx-summary-numb-box-total">
                                    <span className="zx-summary-numb-box-content-total">暂无</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="zx-recent-report-container">
                                {/*{contentReportRecent}*/}
                            </div>
                        </div>
                    </div>
                );
            }

        });

        return (
            <div className="section zx-subject-stats-container">
                {contentSubjectStat}
            </div>
        )
    }
}

BlockReportSchoolStats.contextTypes = {
    handleReportIframeShow: PropTypes.func
};