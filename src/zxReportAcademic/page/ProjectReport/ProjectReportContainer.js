import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import '../../../style/style-report.css';

import getCookie from 'zx-misc/getCookie';

import ProjectReportDetails from './ProjectReportDetails';

import handleReportType from '../../misc/handleReportType';
import handleReportLabel from '../../misc/handleReportLabel';
import handlePromiseReport from '../../misc/handlePromiseReport';
import handlePromiseOptional from '../../misc/handlePromiseOptional';
import handlePromiseNav from '../../misc/handlePromiseNav';

import Preloader from '../../component/Preloader';

import {handleReportTitle} from '../../section/SectionReportTitle';
import {handleBlockReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {handleBlockReportScore} from '../../section/SectionReportScore';
import {handleChildrenBasicTableData, handleChildrenBasicScatterData} from '../../section/SectionChildrenBasic';
import {handleChartRadarInclicatorsLv1Data, handleChartBarInclicatorsLv1Data, handleTableInclicatorsLv1Data, handleScatterInclicatorsLvTwoData, handletableInclicatorsLvTwoData} from '../../section/SectionInclicatorsSystem';
import {handleReportStandardLevelBarData, handleReportStandardLevelTableData} from '../../section/SectionReportStandardLevel';
import {handleSchoolIndicatorsLvOneData} from '../../section/SectionSchoolIndicatorsLvOne';
import {handleWrongQuizeData} from '../../section/SectionWrongQuize';

// let config = require('zx-const')[process.env.NODE_ENV];

class ProjectReportContainer extends Component {
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
        let reportLabel = handleReportLabel(reportType);

        // 报告内容的数据
        let promiseReport = handlePromiseReport(accessToken, reportType, reportUrl);

        // 报告optional的数据
        let promiseOptional = handlePromiseOptional(accessToken, reportUrl);

        // 报告nav的数据
        let promiseNav = handlePromiseNav(accessToken, reportUrl);

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
            let titleData = this.handleReportTitle(reportType, paperInfoData ,mainReportData);

            // 获取满分
            let fullScore = paperInfoData.score ? parseInt(paperInfoData.score, 10) : -1;

            // 获取学校数目
            let schoolNumber = mainNavData.length ? mainNavData.length : null;

            // 处理报告的基本信息
            let basicData = this.handleReportBasicData(reportLabel, paperInfoData, mainReportData, schoolNumber);

            // 处理报告的分数
            let scoreData = handleBlockReportScore(reportType, 'score', fullScore, mainReportData, otherReportData);

            // 处理报告的分化度
            let diffData = handleBlockReportScore(reportType, 'diff', 200, mainReportData, otherReportData);

            // 处理各分数段表现情况
            let standardLevelData = this.handleReportStandardLevelData(reportType, reportLabel, mainReportData);

            //处理知识维度数据
            let knowledgeData = this.handleDimension(reportType, mainReportData, 'knowledge', otherReportData);

            //处理技能维度数据
            let skillData = this.handleDimension(reportType, mainReportData, 'skill', otherReportData);

            //处理能力维度数据
            let abilityData = this.handleDimension(reportType, mainReportData, 'ability', otherReportData);

            //处理错题
            let wrongQuize = this.handleWrongQuize(reportType, mainReportData);
            console.log('wrongQuize', wrongQuize);

            this.setState({
                loaded: true,
                reportData: {
                    titleData:titleData,
                    basicData: basicData,
                    scoreData: scoreData,
                    diffData: diffData,
                    standardLevelData: standardLevelData,
                    knowledgeData: knowledgeData,
                    skillData: skillData,
                    abilityData: abilityData,
                    wrongQuize: wrongQuize
                }
            });


            promiseOptional.done(function (responseOptional) {
                responseOptional = JSON.parse(responseOptional);
                let responseOptionalData = responseOptional.children;
                console.log('responseOptionalData', responseOptionalData);
                //处理各学校基本信息
                let childrenBasicData = this.handleChlidrenBasicData(reportType, responseOptionalData);
                // 处理各分数段表现情况
                let standardLevelData = this.handleReportStandardLevelData(reportType, reportLabel, mainReportData, responseOptionalData);

                //处理各学校一级指标
                let schoolIndicatorsData = this.handleSchoolIndicatorsInfo(reportType, responseOptionalData);

                this.setState({
                    reportData: {
                        ...this.state.reportData,
                        chlidrenBasicData: childrenBasicData,
                        standardLevelData: standardLevelData,
                        schoolIndicatorsData: schoolIndicatorsData
                    }
                });
            }.bind(this));
        }.bind(this));

    }

    //处理报告名称
    handleReportTitle(reportType, paperInfoData,mainReportData){
        let modifiedData={
            reportTitle:null,
            subTitle:null
        };
        let reportTitle = paperInfoData.heading;
        let subTitle = handleReportTitle(reportType,mainReportData);

        modifiedData.reportTitle = reportTitle;
        modifiedData.subTitle = subTitle;

        return modifiedData;
    }

    // 处理报告的基本信息
    handleReportBasicData(reportLabel, paperInfoData, reportData, schoolNumber) {
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
        //modifiedData.heading = reportLabel;

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
    handleDimension(reportType, minData, dimension , otherReportData) {
        let modifiedDimensionData = {
            dimension: dimension,
            chartRadarInclicatorsLvOneData: null,
            chartBarInclicatorsLvOneData: null,
            tableInclicatorsLvOneData: null,
            chartScatterInclicatorsLvTwoData: null,
            tableInclicatorsLvTwoData: null,
            dimensionTitle:null
        };
        let data = minData.data[dimension];

        let legend = ['区域'];
        let chartRadarInclicatorsLvOneData = handleChartRadarInclicatorsLv1Data(reportType, legend, minData ,dimension ,otherReportData);
        let title = '一级指标平均分、中位数、分化度';
        let chartBarInclicatorsLvOneData = handleChartBarInclicatorsLv1Data(reportType, title, data);
        let header = ['指标','平均得分率', '中位数得分率', '分化度'];
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

    //处理子群体基本信息
    handleChlidrenBasicData(reportType, data) {
        let modifiedData = {
            childrenBasicTableData: null,
            chlidrenBasicScatterData: null
        };

        //处理各学校基本信息散点图的数据
        let title = '各学校平均分与分化度';
        let childrenBasicScatterData = handleChildrenBasicScatterData(reportType, title, data);
        //处理各学校基本信息表格数据
        let tHeader = ['学校', '班级数', '参考人数', '平均分', '分化度'];
        let childrenBasicTableData = handleChildrenBasicTableData(reportType, tHeader, data);

        modifiedData.chlidrenBasicScatterData = childrenBasicScatterData;
        modifiedData.childrenBasicTableData = childrenBasicTableData;

        return modifiedData;
    }

    // 处理各分数段表现情况
    handleReportStandardLevelData(reportType, reportLabel, mainData, optionalData=null) {
        let modifiedData = {
            heading: '',
            standardLevelBarData: null,
            standardLevelTableData: null
        };

        // 处理各分数段柱状图
        modifiedData.standardLevelBarData = handleReportStandardLevelBarData(mainData);

        // 处理子群体各分数段数据表
        if (optionalData) {
            let tHeader = ['学校', '优秀人数', '优生占比', '良好人数', '良好占比', '不及格人数', '不及格占比'];
            modifiedData.standardLevelTableData = handleReportStandardLevelTableData(reportType, tHeader, optionalData);
        }

        return modifiedData;
    }

    //处理错题的方法
    handleWrongQuize(reportType, datas) {
        let data = datas.paper_qzps;
        let wrongQuize = handleWrongQuizeData(reportType, data);

        return wrongQuize;
    }

    //处理各学校一级指标的原始数据
    handleSchoolIndicatorsInfo(reportType, data) {
        let tableSkill={};
        let tableAbility={};
        let tableKnowledge={};
        let tHeadSkill=[];
        let tDataSkill=[];
        let tHeadAbility=[];
        let tDataAbility=[];
        let tHeadKnowledge=[];
        let tDataKnowledge=[];
        let schoolIndicatorsData = [],
            responseSkill,
            responseAbility,
            responseKnowledge,
            label;
        let name = '学校名称';
        if (data.length < 0) {
            return false;
        }
            for (let i = 0; i < data.length; i++) {
                if (data[i][1].report_data !== undefined) {
                    label = data[i][1].label;
                    let skill = data[i][1].report_data.data.skill;
                    let ability = data[i][1].report_data.data.ability;
                    let knowledge = data[i][1].report_data.data.knowledge;
                    responseSkill = handleSchoolIndicatorsLvOneData(name, label, skill);
                    responseAbility = handleSchoolIndicatorsLvOneData(name, label, ability);
                    responseKnowledge = handleSchoolIndicatorsLvOneData(name, label, knowledge);
                    tHeadSkill.push(responseSkill.tHead);
                    tDataSkill.push(...responseSkill.tData);
                    tHeadAbility.push(responseAbility.tHead);
                    tDataAbility.push(...responseAbility.tData);
                    tHeadKnowledge.push(responseKnowledge.tHead);
                    tDataKnowledge.push(...responseKnowledge.tData);
                }
                tableSkill.tHead=tHeadSkill[0];
                tableSkill.tData=tDataSkill;
                tableAbility.tHead=tHeadAbility[0];
                tableAbility.tData=tDataAbility;
                tableKnowledge.tHead=tHeadKnowledge[0];
                tableKnowledge.tData=tDataKnowledge;
            }
        schoolIndicatorsData.push(tableSkill);
        schoolIndicatorsData.push(tableAbility);
        schoolIndicatorsData.push(tableKnowledge);

        return schoolIndicatorsData;

    }


    render() {
        // let scrollSpy =
        //     <ul className="section table-of-contents">
        //         <li><a href="#zx-report-basic-info">基本信息</a></li>
        //         <li><a href="#zx-report-score">成绩的情况</a></li>
        //         <li><a href="#zx-report-diff">分化度的情况</a></li>
        //         <li><a href="#zx-report-standard-level">各分数段的表现情况</a></li>
        //         <li><a href="#zx-report-indicator-knowledge-lv1">知识维度的表现情况</a></li>
        //         <li><a href="#zx-report-indicator-skill-lv1">技能维度的表现情况</a></li>
        //         <li><a href="#zx-report-indicator-ability-lv1">能力维度的表现情况</a></li>
        //         <li><a href="#zx-report-quiz">答题情况</a></li>
        //     </ul>
        // ;

        // let scrollSpy =
        //         <Scrollspy
        //             items={ [
        //                 'zx-report-basic-info',
        //                 'zx-report-score',
        //                 'zx-report-diff',
        //                 'zx-report-standard-level',
        //                 'zx-report-indicator-knowledge-lv1',
        //                 'zx-report-indicator-skill-lv1',
        //                 'zx-report-indicator-ability-lv1',
        //                 'zx-report-quiz'
        //             ] }
        //             currentClassName="table-of-contents"
        //         >
        //             <li><a href="#zx-report-basic-info">基本信息</a></li>
        //             <li><a href="#zx-report-score">成绩的情况</a></li>
        //             <li><a href="#zx-report-diff">分化度的情况</a></li>
        //             <li><a href="#zx-report-standard-level">各分数段的表现情况</a></li>
        //             <li><a href="#zx-report-indicator-knowledge-lv1">知识维度的表现情况</a></li>
        //             <li><a href="#zx-report-indicator-skill-lv1">技能维度的表现情况</a></li>
        //             <li><a href="#zx-report-indicator-ability-lv1">能力维度的表现情况</a></li>
        //             <li><a href="#zx-report-quiz">答题情况</a></li>
        //         </Scrollspy>
        // ;

        return (
            <div className="zx-report-holder">
                {
                    this.state.loaded ||
                    <Preloader />
                }
                {
                    this.state.loaded &&
                    <ProjectReportDetails reportData={this.state.reportData}/>
                }
                {
                    //this.state.loaded &&
                    //scrollSpy
                }

            </div>
        )
    }
}

export default ProjectReportContainer;
