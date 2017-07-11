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
           testList: null,
           allStat: {
               total: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
               new: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
           },
           chineseStat: {
               total: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
               new: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
           },
           mathStat: {
               total: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
               new: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
           },
           englishStat: {
               total: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
               new: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
           },
       }
    }

    componentDidMount() {
        $('.zx-dashboard-container').mCustomScrollbar({
            theme: 'minimal-dark',
            scrollInertia: 400
        });

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.testList !== this.props.testList) {
            this.handleTestStats(nextProps.testList);
        }
    }

    // 获取报告总数等统计
    handleTestStats(testList) {
        console.log(testList);
        let allStatTotalValue = this.state.allStat.total.value;
        let allStatTotalGrade = this.state.allStat.total.grade;
        let allStatTotalKlass = this.state.allStat.total.klass;
        let allStatTotalPupil = this.state.allStat.total.pupil;
        let allStatNewValue = this.state.allStat.new.value;
        let allStatNewGrade = this.state.allStat.new.grade;
        let allStatNewKlass = this.state.allStat.new.klass;
        let allStatNewPupil = this.state.allStat.new.pupil;

        let chineseStatTotalValue = this.state.chineseStat.total.value;
        let chineseStatTotalGrade = this.state.chineseStat.total.grade;
        let chineseStatTotalKlass = this.state.chineseStat.total.klass;
        let chineseStatTotalPupil = this.state.chineseStat.total.pupil;
        let chineseStatNewValue = this.state.chineseStat.new.value;
        let chineseStatNewGrade = this.state.chineseStat.new.grade;
        let chineseStatNewKlass = this.state.chineseStat.new.klass;
        let chineseStatNewPupil = this.state.chineseStat.new.pupil;

        let mathStatTotalValue = this.state.mathStat.total.value;
        let mathStatTotalGrade = this.state.mathStat.total.grade;
        let mathStatTotalKlass = this.state.mathStat.total.klass;
        let mathStatTotalPupil = this.state.mathStat.total.pupil;
        let mathStatNewValue = this.state.mathStat.new.value;
        let mathStatNewGrade = this.state.mathStat.new.grade;
        let mathStatNewKlass = this.state.mathStat.new.klass;
        let mathStatNewPupil = this.state.mathStat.new.pupil;

        let englishStatTotalValue = this.state.englishStat.total.value;
        let englishStatTotalGrade = this.state.englishStat.total.grade;
        let englishStatTotalKlass = this.state.englishStat.total.klass;
        let englishStatTotalPupil = this.state.englishStat.total.pupil;
        let englishStatNewValue = this.state.englishStat.new.value;
        let englishStatNewGrade = this.state.englishStat.new.grade;
        let englishStatNewKlass = this.state.englishStat.new.klass;
        let englishStatNewPupil = this.state.englishStat.new.pupil;

        for (let i in testList) {
            let testItem = testList[i];
            let reportUrl = testItem.report_url;
            let reprtStatsApi = config.API_DOMAIN + reportUrl.replace('.json', '/report_stat.json');
            let reprtStatsData = {
                access_token: this.props.accessToken
            };
            $.post(reprtStatsApi, reprtStatsData, function(response, status) {
                response = JSON.parse(response);
                console.log(response);
                let testGrade = response.grade;
                let testKlass = response.klass;
                let testPupil = response.pupil;
                let testAll = testGrade + testKlass + testPupil;
                if (testItem.subject === config.REPORT_CHINESE) {
                }
                else if (testItem.subject === config.REPORT_MATH) {
                }
                else if (testItem.subject === config.REPORT_ENGLISH) {
                }
                }.bind(this),
                'json')
                .fail(function(status) {

                });
        }

    }

    render() {
        let testList = this.props.testList;

        let testTotal = 0, testTotalNew = 0;
        let testChineseTotal = 0, testChineseNew = 0;
        let testMathTotal = 0, testMathNew = 0;
        let testEnglishTotal = 0, testEnglishNew = 0;
        let testChinese = [], testMath = [], testEnglish = [];
        for (let i in testList) {
            let report = testList[i];
            if (report.subject === config.REPORT_CHINESE) {
                testChinese.push(report);
            }
            else if (report.subject === config.REPORT_MATH) {
                testMath.push(report);
            }
            else if (report.subject === config.REPORT_ENGLISH) {
                testEnglish.push(report);
            }
        }

        let testTotalData = {

        };

        // @TODO: 监测mutate的情况
        let testSubjectData = [
            {
                subject: 'chinese',
                order: 1,
                data: testChinese
            },
            {
                subject: 'math',
                order: 2,
                data: testMath
            },
            {
                subject: 'english',
                order: 3,
                data: testEnglish
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
                    testSubjectData={testSubjectData}
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