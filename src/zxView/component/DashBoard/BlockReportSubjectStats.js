import React, {Component} from 'react';
import $ from 'jquery';

import TableDefault from '../TableDefault';

let config = require('zx-const')[process.env.NODE_ENV];

function handleTableRecentReport(reportList) {
    let modifiedData = {
        tHeader: [],
        tData: []
    };

    modifiedData.tHeader = ['测试', '时间'];

    reportList = reportList.slice(0, 3);
    for (let i in reportList) {
        let reportItem = reportList[i];
        let dataObj = {
            1: reportItem.paper_heading,
            2: reportItem.quiz_date
        };
        modifiedData.tData.push(dataObj);
    }

    return modifiedData;
}

export function handleBlockReportSubjectStats(data, options) {
    let config = {
        chinese: {
            label: '语文',
            icon: 'content_paste',
            style1: 'cyan darken-1',
            style2: 'cyan darken-2',
        },
        math: {
            label: '数学',
            icon: 'flag',
            style1: 'blue-grey lighten-1',
            style2: 'blue-grey'
        },
        english: {
            label: '英语',
            icon: 'create',
            style1: 'brown lighten-2',
            style2: 'brown lighten-1',
        }
    };

    let modifiedData = data.map((dataItem , index) => {
        let subject = dataItem.subject;
        if (config.hasOwnProperty(subject)) {
            dataItem.label = config[subject].label;
            dataItem.icon = config[subject].icon;
            dataItem.style1 = config[subject].style1;
            dataItem.style2 = config[subject].style2;
        }
        dataItem.status = (dataItem.length === 0) ? false : true;

        return dataItem;
    });

    console.log(modifiedData);

    return modifiedData;
}

export class BlockReportSubjectStats extends Component {
    render() {
        let data = this.props.data;

        let contentSubjectStat;
        contentSubjectStat = data.map((dataItem, index) => {
            let dataReportRecent = handleTableRecentReport(dataItem.data);
            let contentReportRecent = <TableDefault tHeader={dataReportRecent.tHeader} tData={dataReportRecent.tData}/>;
            let style1 = 'zx-summary-numb-box ' + dataItem.style1;
            let style2 = 'zx-summary-numb-box ' + dataItem.style2;
            return (
                <div className="card zx-subject-stats-item">
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
                                <span className="zx-summary-numb-box-content-increase">100,000</span>
                                份
                            </div>
                        </div>
                        <div className={style2}>
                            <div className="zx-summary-numb-box-total">
                                共
                                <span className="zx-summary-numb-box-content-total">100,000</span>
                                份
                                <a className="btn-floating btn-large halfway-fab waves-effect waves-light red">
                                    <i className="material-icons">visibility</i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="zx-recent-report-container">
                            {contentReportRecent}
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="section zx-subject-stats-container">
                {contentSubjectStat}
            </div>
        )
    }
}