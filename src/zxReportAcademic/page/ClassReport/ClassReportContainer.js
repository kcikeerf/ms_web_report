import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import '../../../style/style-report.css';

import getCookie from 'zx-misc/getCookie';

import ClassReportDetails from './ClassReportDetails';

import handleReportType from '../../misc/handleReportType';
import handlePromiseReport from '../../misc/handlePromiseReport';
import handlePromiseOptional from '../../misc/handlePromiseOptional';


import {handleBlockReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {handleBlockReportScore} from '../../section/SectionReportScore';
import {handleChildrenBasicTableData, handleChildrenBasicScatterData} from '../../section/SectionChildrenBasic';
import {handleChartRadarInclicatorsLv1Data, handleChartBarInclicatorsLv1Data ,handleTableInclicatorsLv1Data} from '../../section/SectionInclicatorsSystem';
import {handleReportStandardLevelBarData, handleReportStandardLevelTableData} from '../../section/SectionReportStandardLevel';
import {handleScatterInclicatorsLvTwoData,handletableInclicatorsLvTwoData} from '../../section/SectionScatterInclicatorsLvTwo';
import {handleSchoolIndicatorsLvOneData} from '../../section/SectionSchoolIndicatorsLvOne';
import {handleWrongQuizeData} from '../../section/SectionWrongQuize';




//let config = require('zx-const')[process.env.NODE_ENV];
import handlePromiseNav from '../../misc/handlePromiseNav';
class ClassReportContainer extends Component {
    constructor() {
        super();
        this.state = {
            reportData: null
        };
    }

    componentDidMount() {
        let wxOpenid = getCookie('wx_openid');
        let userName = getCookie('user_name');
        let reportUrl = getCookie('report_url');

        // 根据报告的url判定报告的类型
        let reportType = handleReportType(reportUrl);/*=>klass*/

        // 报告内容的api数据
        let promiseReport = handlePromiseReport(userName, wxOpenid, reportType, reportUrl);

        // 报告optional的api数据
        let promiseOptional = handlePromiseOptional(userName, wxOpenid, reportUrl);
        console.log('promiseOptional-class', promiseOptional);

        // 报告nav的数据
        let promiseNav = handlePromiseNav(userName, wxOpenid, reportUrl);
        // 处理返回的数据
        $.when(promiseReport, promiseNav).done(function (responseReport, responseNav) {
            console.log('responseReport-class1', responseReport);
            console.log('responseNav-class', responseNav);


            responseReport = responseReport[0];
            console.log('responseReport-class2', responseReport);

            responseNav = JSON.parse(responseNav[0]);
            // @TODO: 添加返回报告的数据为空的异处理
            let paperInfoData = responseReport.paper_info;
            console.log('paperInfoData-c', paperInfoData);
            let mainNavData = responseNav[reportType];
            console.log('mainNavData-class', mainNavData);
            let mainReportData = responseReport[reportType];
            console.log('mainReportData-c', mainReportData);
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
                    /*=>grade+project*/
                }
            }

            // 获取满分
            let fullScore = paperInfoData.score ? parseInt(paperInfoData.score) : -1;

            // 获取学生人数
            let StudentNumber = mainNavData.length ? mainNavData.length : null;

            // 处理报告的基本信息
            let basicData = this.handleReportBasicData(paperInfoData, mainReportData, StudentNumber);

            // 处理报告的分数
            let scoreData = handleBlockReportScore(reportType, 'score', fullScore, mainReportData, otherReportData);

            // 处理报告的分化度
            let diffData = handleBlockReportScore(reportType, 'diff', 200, mainReportData, otherReportData);

            console.log('scoreData-c', scoreData);
            this.setState({
                reportData: {
                    basicData: basicData,
                    scoreData: scoreData,
                    diffData: diffData,
                }
            });


            promiseOptional.done(function (responseOptional) {


                responseOptional = JSON.parse(responseOptional);
                console.log('responseOptional-class', responseOptional);
                let responseOptionalData = responseOptional.children;
                //处理各学校基本信息
                let childrenBasicData = this.handleChlidrenBasicData(reportType, responseOptionalData);
                    console.log('childrenBasicData-c',childrenBasicData);
                // 处理各分数段表现情况
                let standardLevelData = this.handleReportStandardLevelData(reportType, mainReportData, responseOptionalData);
                //
                //     //处理各学校一级指标
                //     let schoolIndicatorsData = this.handleSchoolIndicatorsInfo(reportType, responseOptionalData);
                //
                console.log('standardLevelData-c',standardLevelData);
                this.setState({
                    reportData: {
                        ...this.state.reportData,
                        chlidrenBasicData: childrenBasicData,
                        standardLevelData: standardLevelData,
                        // schoolIndicatorsData: schoolIndicatorsData
                    }
                });
            }.bind(this));





        }.bind(this));


    }

    // 处理报告的基本信息
    handleReportBasicData(paperInfoData, reportData, StudentNumber) {
        let reportDataBasic = reportData.basic;
        let schoolNumber = '无';
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
                type: 'testSubject',
                order: 4,
                value: reportDataBasic.subject ? reportDataBasic.subject : '无'
            },
            {
                type: 'testGrade',
                order: 5,
                value: reportDataBasic.grade ? reportDataBasic.grade : '无'
            },
            {
                type: 'testType',
                order: 6,
                value: reportDataBasic.quiz_type ? reportDataBasic.quiz_type : '无'
            },
            {
                type: 'schoolNumber',
                order: 7,
                value: schoolNumber ? schoolNumber : '无'
            },
            {
                type: 'studentNumber',
                order: 8,
                value: StudentNumber ? StudentNumber : '无'
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

    //处理子群体基本信息
    handleChlidrenBasicData(reportType, data) {
        let modifiedData = {
            childrenBasicTableData: null,
            chlidrenBasicScatterData: null
        };

        //处理各班级基本信息表格数据
        let tHeader = ['学校', '班级', '参考人数', '平均分', '分化度'];
        let childrenBasicTableData = handleChildrenBasicTableData(reportType, tHeader, data);
        modifiedData.childrenBasicTableData = childrenBasicTableData;

        //处理各班级基本信息散点图的数据
        let title = '各学校平均分与分化度';
        let childrenBasicScatterData = handleChildrenBasicScatterData(reportType, title, data);
        modifiedData.chlidrenBasicScatterData = childrenBasicScatterData;

        return modifiedData;
    }

    // 处理各分数段表现情况
    handleReportStandardLevelData(reportType, mainData, optionalData) {
        let modifiedData = {
            standardLevelBarData: null,
            standardLevelTableData: null
        };

        // 处理各分数段柱状图
        modifiedData.standardLevelBarData = handleReportStandardLevelBarData(mainData);

        // 处理子群体各分数段数据表
        let tHeader = ['学校', '优秀人数', '优生占比', '良好人数', '良好占比', '不及格人数', '不及格占比'];
        modifiedData.standardLevelTableData = handleReportStandardLevelTableData(tHeader, optionalData);

        return modifiedData;
    }



    render() {
        return (
            <div>
                <ClassReportDetails reportData={this.state.reportData}/>
            </div>
        )
    }
}

export default ClassReportContainer;
