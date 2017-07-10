import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import '../../../style/style-report.css';

import getCookie from 'zx-misc/getCookie';

import StudentReportDetails from './StudentReportDetails';

import handleReportType from '../../misc/handleReportType';
import handlePromiseReport from '../../misc/handlePromiseReport';
// import handlePromiseOptional from '../../misc/handlePromiseOptional';
// import handlePromiseNav from '../../misc/handlePromiseNav';

import {handleReportTitle} from '../../section/SectionReportTitle';
import {handleBlockReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {handleBlockReportScore} from '../../section/SectionReportScore';
import {
    handleChartRadarInclicatorsLv1Data,
    handleChartBarInclicatorsLv1Data,
    handleTableInclicatorsLv1Data,
    handleScatterInclicatorsLvTwoData,
    handletableInclicatorsLvTwoData
} from '../../section/SectionInclicatorsSystem';
import {handleWrongQuizeData} from '../../section/SectionWrongQuize';
// let config = require('zx-const')[process.env.NODE_ENV];

class StudentReportContainer extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        let wxOpenid = getCookie('wx_openid');
        let userName = getCookie('user_name');
        let reportUrl = getCookie('report_url');

        // 根据报告的url判定报告的类型
        let reportType = handleReportType(reportUrl);

        // 报告内容的api数据
        let promiseReport = handlePromiseReport(userName, wxOpenid, reportType, reportUrl);

        // 报告optional的api数据
        // let promiseOptional = handlePromiseOptional(userName, wxOpenid, reportUrl);

        // 报告nav的数据
        // let promiseNav = handlePromiseNav(userName, wxOpenid, reportUrl);

        // 处理返回的数据
        $.when(promiseReport).done(function (responseReport) {
            // @TODO: 添加返回报告的数据为空的异处理
            let paperInfoData = responseReport.paper_info;
            let mainReportData = responseReport[reportType];
            let otherReportData = [];
            for (let property in responseReport) {
                if (responseReport.hasOwnProperty(property) && property !== 'paper_info' && property !== reportType) {
                    let reportItem = {
                        type: property,
                        data: responseReport[property]
                    };
                    if (property === 'project') {
                        reportItem.order = 1;
                    }
                    else if (property === 'grade') {
                        reportItem.order = 2;
                    }
                    else if (property === 'klass') {
                        reportItem.order = 3;
                    }
                    else if (property === 'pupil') {
                        reportItem.order = 4;
                    }
                    otherReportData.push(reportItem);
                }
            }
            // 处理报告的标题信息
            let titleData = this.handleReportTitle(reportType, paperInfoData, mainReportData);

            // 获取满分
            let fullScore = paperInfoData.score ? parseInt(paperInfoData.score,10) : -1;

            // 处理报告的基本信息
            let basicData = this.handleReportBasicData(paperInfoData, mainReportData);

            // 处理报告的分数
            let scoreData = handleBlockReportScore(reportType, 'score', fullScore, mainReportData, otherReportData);

            //处理知识维度数据
            let knowledgeData = this.handleDimension(reportType, mainReportData, 'knowledge');

            //处理技能维度数据
            let skillData = this.handleDimension(reportType, mainReportData, 'skill');

            //处理能力维度数据
            let abilityData = this.handleDimension(reportType, mainReportData, 'ability');

            //处理错题
            let wrongQuize = this.handleWrongQuize(reportType, mainReportData);

            this.setState({
                reportData: {
                    titleData: titleData,
                    basicData: basicData,
                    scoreData: scoreData,
                    knowledgeData: knowledgeData,
                    skillData: skillData,
                    abilityData: abilityData,
                    wrongQuize: wrongQuize
                }
            });

        }.bind(this));
    }

    //处理报告名称
    handleReportTitle(reportType, paperInfoData,mainReportData){
        let modifiedData={
            reportTitle:null,
            subTitle:null
        }
        let reportTitle = paperInfoData.heading;
        let subTitle = handleReportTitle(reportType,mainReportData);

        modifiedData.reportTitle = reportTitle;
        modifiedData.subTitle = subTitle;

        return modifiedData;
    }

    // 处理报告的基本信息
    handleReportBasicData(paperInfoData, reportData) {
        let reportDataBasic = reportData.basic;
        // let studentNumber = reportData.data.knowledge.base.pupil_number;
        let modifiedData = [
            {
                type: 'testDistrict',
                order: 1,
                value: (paperInfoData.province && paperInfoData.city && paperInfoData.district) ? (paperInfoData.province + paperInfoData.city + paperInfoData.district) : '无'
            },
            {
                type: 'testDuration',
                order: 2,
                value: paperInfoData.quiz_duration ? paperInfoData.quiz_duration : '无'
            },
            {
                type: 'testFullScore',
                order: 3,
                value: paperInfoData.score ? paperInfoData.score : '无'
            },
            {
                type: 'schoolName',
                order: 4,
                value: reportDataBasic.school ? reportDataBasic.school : '无'
            },
            {
                type: 'klassName',
                order: 5,
                value: reportDataBasic.classroom ? reportDataBasic.classroom : '无'
            },
            {
                type: 'testSubject',
                order: 6,
                value: reportDataBasic.subject ? reportDataBasic.subject : '无'
            },
            {
                type: 'coursTeacher',
                order: 7,
                value: '暂无数据'
            },
            {
                type: 'testType',
                order: 8,
                value: reportDataBasic.quiz_type ? reportDataBasic.quiz_type : '无'
            },
            {
                type: 'testDate',
                order: 9,
                value: reportDataBasic.quiz_date ? reportDataBasic.quiz_date : '无'
            }
        ];

        modifiedData = handleBlockReportBasicInfo(modifiedData);

        return modifiedData;

    }

    // 处理报告的分数
    handleReportScore(reportType, fullScore, mainReportData, otherReportData) {
        let modifiedData = {
            main: [
                {
                    type: reportType,
                    fullScore: fullScore,
                    data: mainReportData
                }
            ],
            other: otherReportData
        };

        return modifiedData;
    }

    //处理指标体系的基本信息
    handleDimension(reportType, minData, dimension) {
        let modifiedDimensionData = {
            chartRadarInclicatorsLvOneData: null,
            chartBarInclicatorsLvOneData: null,
            tableInclicatorsLvOneData: null,
            chartScatterInclicatorsLvTwoData: null,
            tableInclicatorsLvTwoData: null,
            dimensionTitle:null
        }
        let data = minData.data[dimension];
        let dataArr = [data];
        let legend = ['学生'];
        let chartRadarInclicatorsLvOneData = handleChartRadarInclicatorsLv1Data(reportType, legend, dataArr);
        let title = '一级指标平均分、中位数、分化度';
        let chartBarInclicatorsLvOneData = handleChartBarInclicatorsLv1Data(reportType, title, data);
        let header = ['指标','平均得分率', '中位数得分率'];
        let tableInclicatorsLvOneData = handleTableInclicatorsLv1Data(reportType, header, data);
        let titleScatter = '二级指标分型图';
        let chartScatterInclicatorsLvTwoData = handleScatterInclicatorsLvTwoData(reportType, titleScatter,data);
        // let headerTwo = ['指标','平均得分率','分化度'];
        let tableInclicatorsLvTwoData = handletableInclicatorsLvTwoData(reportType, header, data);

        if(dimension === 'knowledge'){
            modifiedDimensionData.dimensionTitle = '知识';
        }else if(dimension === 'skill'){
            modifiedDimensionData.dimensionTitle = '技能';
        }else if(dimension === 'ability'){
            modifiedDimensionData.dimensionTitle = '能力';
        }

        modifiedDimensionData.chartRadarInclicatorsLvOneData = chartRadarInclicatorsLvOneData;
        modifiedDimensionData.chartBarInclicatorsLvOneData = chartBarInclicatorsLvOneData;
        modifiedDimensionData.tableInclicatorsLvOneData = tableInclicatorsLvOneData;
        modifiedDimensionData.chartScatterInclicatorsLvTwoData = chartScatterInclicatorsLvTwoData;
        modifiedDimensionData.tableInclicatorsLvTwoData = tableInclicatorsLvTwoData;

        return modifiedDimensionData;
    }



    //处理错题的方法
    handleWrongQuize(reportType, datas) {
        let data = datas.paper_qzps;
        let wrongQuize = handleWrongQuizeData(reportType, data);

        return wrongQuize;
    }

    render() {
        return (
            <div className="zx-report-holder">
                <StudentReportDetails reportData={this.state.reportData} />
            </div>
        )
    }
}
export default StudentReportContainer;
