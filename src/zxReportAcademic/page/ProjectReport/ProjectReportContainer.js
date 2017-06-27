import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import '../../App.css';

import getCookie from 'zx-misc/getCookie';

import ProjectReportDetails from './ProjectReportDetails';

import handleReportType from '../../misc/handleReportType';
import handlePromiseReport from '../../misc/handlePromiseReport';
import handlePromiseOptional from '../../misc/handlePromiseOptional';
import handlePromiseNav from '../../misc/handlePromiseNav';

import {handleBlockReportBasicInfo} from '../../component/BlockReportBasicInfo';
import {handleBlockReportScore} from '../../component/BlockReportScore';
import {handleChildrenBasicTableData} from '../../component/BlockChildrenBasicTable';
import {handleChildrenBasicScatterData} from '../../component/BlockChildrenBasicScatter';
//let config = require('zx-const')[process.env.NODE_ENV];

class ProjectReportContainer extends Component {
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
        let reportType = handleReportType(reportUrl);

        // 报告内容的数据
        let promiseReport = handlePromiseReport(userName, wxOpenid, reportType, reportUrl);

        // 报告optional的数据
        let promiseOptional = handlePromiseOptional(userName, wxOpenid, reportUrl);


        // 报告nav的数据
        let promiseNav = handlePromiseNav(userName, wxOpenid, reportUrl);

        // 处理返回的数据
        $.when(promiseReport, promiseNav).done(function (responseReport, responseNav) {
            responseReport = responseReport[0];
            responseNav = JSON.parse(responseNav[0]);

            // @TODO: 添加返回报告的数据为空的异处理

            let paperInfoData = responseReport.paper_info;
            let mainNavData = responseNav[reportType];
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
            //let titleData = this.handleReportTitle(reportType, paperInfoData);

            // 获取满分
            let fullScore = paperInfoData.score ? parseInt(paperInfoData.score) : -1;

            // 获取学校数目
            let schoolNumber = mainNavData.length ? mainNavData.length : null;

            // 处理报告的基本信息
            let basicData = this.handleReportBasicData(paperInfoData, mainReportData, schoolNumber);

            // 处理报告的分数
            let scoreData = handleBlockReportScore(reportType, 'score', fullScore, mainReportData, otherReportData);

            // 处理报告的分化度
            let diffData = handleBlockReportScore(reportType, 'diff', 200, mainReportData, otherReportData);

            this.setState({
                reportData: {
                    basicData: basicData,
                    scoreData: scoreData,
                    diffData: diffData
                }
            });


            promiseOptional.done(function (responseOptional) {
                responseOptional = JSON.parse(responseOptional);
                let responseOptionalData = responseOptional.children;
                console.log(responseOptionalData);
                //处理各学校基本信息表格数据
                let chlidrenBasicTitleData = this.handleChlidrenBasicTitleData(reportType, responseOptionalData);
                //处理各学校基本信息散点图的数据
                let chlidrenBasicScatterData = this.handleChlidrenBasicScatterData(reportType,responseOptionalData);
                this.setState({
                    reportData: {
                        ...this.state.reportData,
                        chlidrenBasicData:{
                            chlidrenBasicTitleData:chlidrenBasicTitleData,
                            chlidrenBasicScatterData:chlidrenBasicScatterData
                        }
                    }
                });
            }.bind(this));
        }.bind(this));

    }
    // 处理报告的基本信息
    handleReportBasicData(paperInfoData, reportData, schoolNumber) {
        let reportDataBasic = reportData.basic;
        let studentNumber = reportData.data.knowledge.base.pupil_number;
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
                value: studentNumber ? studentNumber : '无'
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

    //处理各学校基本信息数据
    handleChlidrenBasicTitleData(reportType, data) {
        let header = ['学校', '班级数', '参考人数', '平均分', '分化度'];

        let ChlidrenBasicData = handleChildrenBasicTableData(reportType, header, data);

        return ChlidrenBasicData;
    }
    handleChlidrenBasicScatterData(reportType, data){
        let title = '各学校平均分与分化度';

        let ChlidrenBasicData = handleChildrenBasicScatterData(reportType, title ,data)

        return ChlidrenBasicData;
    }

    render() {
        console.log(this.state.reportData);
        return (
            <div>
                <ProjectReportDetails reportData={this.state.reportData}/>
            </div>
        )
    }
}

export default ProjectReportContainer;
