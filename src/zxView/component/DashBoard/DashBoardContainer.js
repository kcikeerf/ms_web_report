import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import handleAllEchartsResize from 'zx-chart/handleAllEchartsResize';
import DashBoardProject from './DashBoardProject';

let config = require('zx-const')[process.env.NODE_ENV];

class DashBoardContainer extends React.Component {
    constructor() {
       super();
       this.state = {
           reportList: null
       }
    }

    render() {
        let reportList = this.props.reportList;
        let reportChinese = [], reportMath = [], reportEnglish = [];
        for (let i in reportList) {
            let report = reportList[i];
            if (report.subject === config.REPORT_CHINESE) {
                reportChinese.push(report);
            }
            else if (report.subject === config.REPORT_MATH) {
                reportMath.push(report);
            }
            else if (report.subject === config.REPORT_ENGLISH) {
                reportEnglish.push(report);
            }
        }

        // @TODO: 监测mutate的情况
        let activeReportData = [
            {
                subject: 'chinese',
                order: 4,
                data: reportChinese
            },
            {
                subject: 'math',
                order: 2,
                data: reportMath
            },
            {
                subject: 'english',
                order: 3,
                data: reportEnglish
            }
        ];

        return (
            <div className="zx-dashboard-container">
                <DashBoardProject
                    wxOpenId={this.props.wxOpenId}
                    userName={this.props.userName}
                    userDisplayName={this.props.userDisplayName}
                    userRole={this.props.userRole}
                    activeReportData={activeReportData}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            </div>

        )
    }
}

DashBoardContainer.contextTypes = {
    handleReportIframeShow: PropTypes.func
};

export default DashBoardContainer;