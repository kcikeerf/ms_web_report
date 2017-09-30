import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
// import $ from 'jquery';

import TableAction from '../../component/TableAction';

// let config = require('zx-const')[process.env.NODE_ENV];

function handleTableRecentReport(reportList) {
    let modifiedData = {
        tHeader: [],
        tData: [],
        tAction: []
    };

    modifiedData.tHeader = ['报告', '时间'];

    reportList = reportList.slice(0, 3);
    for (let i in reportList) {
        let reportItem = reportList[i];
        let dataObj = {
            1: reportItem.paper_heading,
            2: reportItem.quiz_date
        };
        modifiedData.tData.push(dataObj);
        modifiedData.tAction.push(reportItem.report_url);
    }

    return modifiedData;
}

export function handleBlockReportSubjectStats(data) {
    let blockData = data.blocks;
    let modifiedData = [];

    let highSchool = [],middleSchool = [],primarySchool =[];

    let primaryReport =  blockData.primary_school_report;
    if(Object.keys(blockData.primary_school_base).length !== 0){
        primaryReport.display = true;
    }else {
        primaryReport.display = false;
    }
    primaryReport.label = '小学';
    primaryReport.icon = 'event_note';
    primaryReport.style1 = 'brown lighten-2';
    primaryReport.style2 = 'brown lighten-1';
    modifiedData.push(primaryReport);

    let middleReport = blockData.middle_school_report;
    if(Object.keys(blockData.middle_school_base).length !== 0){
        middleReport.display = true;
    }else {
        middleReport.display = false;
    }
    middleReport.label = '初中';
    middleReport.icon = 'event_note';
    middleReport.style1 = 'blue-grey lighten-1';
    middleReport.style2 = 'blue-grey';
    modifiedData.push(middleReport);

    let highReport = blockData.high_school_report;
    if(Object.keys(blockData.high_school_base).length !== 0){
        highReport.display = true;
    }else {
        highReport.display = false;
    }
    highReport.label = '高中';
    highReport.style1 = 'cyan darken-1';
    highReport.style2 = 'cyan darken-2';
    highReport.icon = 'event_note';
    modifiedData.push(highReport);

    // let newData = [].concat(data);
    // let config = {
    //     chinese: {
    //         label: '语文',
    //         icon: 'event_note',
    //         style1: 'cyan darken-1',
    //         style2: 'cyan darken-2',
    //     },
    //     math: {
    //         label: '数学',
    //         icon: 'event_note',
    //         style1: 'blue-grey lighten-1',
    //         style2: 'blue-grey'
    //     },
    //     english: {
    //         label: '英语',
    //         icon: 'event_note',
    //         style1: 'brown lighten-2',
    //         style2: 'brown lighten-1',
    //     }
    // };
    //
    // let modifiedData = newData.map((dataItem , index) => {
    //     let newDataItem = {...dataItem};
    //     let subject = dataItem.subject;
    //     if (config.hasOwnProperty(subject)) {
    //         newDataItem.label = config[subject].label;
    //         newDataItem.icon = config[subject].icon;
    //         newDataItem.style1 = config[subject].style1;
    //         newDataItem.style2 = config[subject].style2;
    //     }
    //     newDataItem.status = (dataItem.length === 0) ? false : true;
    //
    //     return newDataItem;
    // });

    return modifiedData;
}

export class BlockReportSubjectStats extends Component {
    render() {
        let data = this.props.data;
        console.log(data);
        let contentSubjectStat;
        contentSubjectStat = data.map((dataItem, index) => {
            // let dataReportRecent = handleTableRecentReport(dataItem.data);
            // let contentReportRecent = <TableAction
            //     user={this.props.user}
            //     tHeader={dataReportRecent.tHeader}
            //     tData={dataReportRecent.tData}
            //     tAction={dataReportRecent.tAction}
            //     handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
            // />;
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
                        <div className="card-content">
                            <div className="zx-recent-report-container">
                                {/*{contentReportRecent}*/}
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

BlockReportSubjectStats.contextTypes = {
    handleReportIframeShow: PropTypes.func
};