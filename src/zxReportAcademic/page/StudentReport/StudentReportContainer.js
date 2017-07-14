import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import '../../../style/style-report.css';

import getCookie from 'zx-misc/getCookie';

import StudentReportDetails from './StudentReportDetails';

import Preloader from '../../component/Preloader';

import handleReportType from '../../misc/handleReportType';
import handlePromiseReport from '../../misc/handlePromiseReport';
import {handleReportTitle} from '../../section/SectionReportTitle';
import {handleBlockReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {handleBlockReportScore} from '../../section/SectionReportScore';
import {handleChartRadarInclicatorsLv1Data,handleTableInclicatorsLv1Data,handleTableInclicatorsLv2Data} from '../../section/SectionStudentInclicatorsSystem';
import {handleWrongQuizeData,handleOtherWrongQuizeData} from '../../section/SectionStudentWrongQuize';
import {handleStudentRankData} from '../../section/SectionStudentRank';
// let config = require('zx-const')[process.env.NODE_ENV];

class StudentReportContainer extends Component {
    constructor() {
        super();
        this.state = {
            loaded: null,
            reportData: null
        };
    }

    componentDidMount() {
        let accessToken = getCookie('access_token');
        let selectedUserName = getCookie('selected_user_name');
        let reportUrl = getCookie('report_url');

        // 根据报告的url判定报告的类型
        let reportType = handleReportType(reportUrl);

        // 报告内容的api数据
        let promiseReport = handlePromiseReport(accessToken, reportType, reportUrl);

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
            console.log('otherReportData',otherReportData);
            // 处理报告的标题信息
            let titleData = this.handleReportTitle(reportType, paperInfoData, mainReportData);

            // 获取满分
            let fullScore = paperInfoData.score ? parseInt(paperInfoData.score,10) : -1;

            // 处理报告的基本信息
            let basicData = this.handleReportBasicData(paperInfoData, mainReportData);

            // 处理报告的分数
            let scoreData = handleBlockReportScore(reportType, 'score', fullScore, mainReportData, otherReportData);

            // 处理学生排名
            let rankData = this.handleRank(reportType, mainReportData , otherReportData);

            //处理知识维度数据
            let knowledgeData = this.handleDimension(reportType, mainReportData, 'knowledge', otherReportData);

            //处理技能维度数据
            let skillData = this.handleDimension(reportType, mainReportData, 'skill', otherReportData);

            //处理能力维度数据
            let abilityData = this.handleDimension(reportType, mainReportData, 'ability', otherReportData);

            //处理错题
            let wrongQuize = this.handleWrongQuize(reportType, mainReportData, otherReportData);

            this.setState({
                loaded: true,
                reportData: {
                    titleData: titleData,
                    basicData: basicData,
                    rankData:rankData,
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

    //处理学生排名
    handleRank(reportType, mainReportData ,otherReportData){

        let studentRankData = handleStudentRankData(reportType, mainReportData ,otherReportData);

        return studentRankData;
    }

    //处理指标体系的基本信息
    handleDimension(reportType, minData, dimension, otherReportData) {
        let modifiedDimensionData = {
            chartRadarInclicatorsLvOneData: null,
            tableInclicatorsLvOneData: null,
            tableInclicatorsLvTwoData: null,

            chartBarInclicatorsLvOneData: null,
            chartScatterInclicatorsLvTwoData: null,
            dimensionTitle:null
        }
        let data = minData.data[dimension];
        let legend = ['学生','区域','年级','班级'];
        let chartRadarInclicatorsLvOneData = handleChartRadarInclicatorsLv1Data(reportType, legend, minData , dimension, otherReportData);

        let header = ['指标','学生得分率', '班级平均得分率','年级平均得分率','区域平均得分率'];
        let tableInclicatorsLvOneData = handleTableInclicatorsLv1Data(reportType, header, minData , dimension ,otherReportData);

        // let title = '一级指标平均分、中位数、分化度';
        // let chartBarInclicatorsLvOneData = handleChartBarInclicatorsLv1Data(reportType, title, data);

        let tableInclicatorsLvTwoData = handleTableInclicatorsLv2Data(reportType, header, minData , dimension ,otherReportData);

        if(dimension === 'knowledge'){
            modifiedDimensionData.dimensionTitle = '知识';
        }else if(dimension === 'skill'){
            modifiedDimensionData.dimensionTitle = '技能';
        }else if(dimension === 'ability'){
            modifiedDimensionData.dimensionTitle = '能力';
        }

        modifiedDimensionData.chartRadarInclicatorsLvOneData = chartRadarInclicatorsLvOneData;
        modifiedDimensionData.tableInclicatorsLvOneData = tableInclicatorsLvOneData;
        modifiedDimensionData.tableInclicatorsLvTwoData = tableInclicatorsLvTwoData;

        return modifiedDimensionData;
    }


    //处理错题的方法
    handleWrongQuize(reportType, datas, otherReportData) {
        let data = datas.paper_qzps;
        let wrongQuize = handleWrongQuizeData(reportType, data, otherReportData);
        let otherWrongQuize = handleOtherWrongQuizeData(reportType, data, otherReportData);

        return wrongQuize;
    }

    render() {
        return (
            <div className="zx-report-holder">
                {
                    this.state.loaded ||
                    <Preloader />
                }
                {
                    this.state.loaded &&
                    <StudentReportDetails reportData={this.state.reportData} />
                }
            </div>
        )
    }
}
export default StudentReportContainer;
