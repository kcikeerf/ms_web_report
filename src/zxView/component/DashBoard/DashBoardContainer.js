import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

// import handleAllEchartsResize from 'zx-chart/handleAllEchartsResize';
import DashBoardProject from './DashBoardProject';

import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

let config = require('zx-const')[process.env.NODE_ENV];

class DashBoardContainer extends React.Component {
    constructor() {
       super();
       this.state = {
           reportList: null
       }
    }

    componentDidMount() {
        $('.zx-dashboard-container').mCustomScrollbar({
            theme: 'minimal-dark'
        });
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

        // @TODO: 获取报告'总数目'和'新增数目'
        let dataReportTotalStats = {
            total: 300000,
            increase: 100000
        };

        // @TODO: 获取各学科报告'总数目'
        let pieData = {
            data:[
                {name: '语文', value: 1000},
                {name: '数学', value: 2000},
                {name: '英语', value: 3000},
            ],
            title:'学科报告占比'
        };


        return (
            <div className="zx-dashboard-container">
                <DashBoardProject
                    wxOpenId={this.props.wxOpenId}
                    userName={this.props.userName}
                    userDisplayName={this.props.userDisplayName}
                    userRole={this.props.userRole}
                    activeReportData={activeReportData}
                    dataReportTotalStats={dataReportTotalStats}
                    pieData={pieData}
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