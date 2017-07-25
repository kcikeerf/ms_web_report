import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import '../../../style/style-report.css';

import getCookie from 'zx-misc/getCookie';

import ProjectReportDetails from './ProjectReportDetails';

import handleReportType from '../../misc/handleReportType';
import handleReportLabel from '../../misc/handleReportLabel';
import handlePromiseReport from '../../misc/handlePromiseReport';
import handlePromiseOptional from '../../misc/handlePromiseOptional';
import handlePromiseNav from '../../misc/handlePromiseNav';

import Preloader from '../../component/Preloader';

import {handleBlockReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {handleBlockReportScore} from '../../section/SectionReportScore';
import {handleChildBasicTableData, handleChildBasicScatterData} from '../../section/SectionChildBasic';
import {
    handleChartRadarInclicatorsLv1Data,
    handleChartBarInclicatorsLv1Data,
    handleTableInclicatorsLv1Data,
    handleScatterInclicatorsLvTwoData,
    handletableInclicatorsLvTwoData
} from '../../section/SectionInclicatorsSystem';
import {handleReportStandardLevelBarData,handleReportStandardLevelTableData} from '../../section/SectionReportStandardLevel';
import {handleChildIndicatorsLvOneData} from '../../section/SectionChildIndicatorsLvOne';
import {handleWrongQuizeData,handleOtherWrongQuizeData} from '../../section/SectionWrongQuize';

let config = require('zx-const')[process.env.NODE_ENV];

class ReportContainer extends Component {
    constructor() {
        super();
        this.state = {
            loaded: null,
            reportData: null
        };
    }

    componentDidMount() {
        // 获取选定账号的access token
        let accessToken = getCookie('selected_access_token');

        // 获取报告的地址
        let reportUrl = getCookie('report_url');

        // 根据报告地址判定报告的类型
        let reportType = handleReportType(reportUrl);

        // 根据报告的类型判断报告的中文名
        let reportLabel = handleReportLabel(reportType);

        // 报告内容的数据
        let reportDataPromise = handlePromiseReport(accessToken, reportType, reportUrl);

        // 报告optional的数据
        let reportOptionalPromise = handlePromiseOptional(accessToken, reportUrl);

        // 报告nav的数据
        let reportNavPromise = handlePromiseNav(accessToken, reportUrl);

        // 处理返回的数据
        $.when(reportDataPromise, reportNavPromise).done(function (responseReport, responseNav) {
            responseReport = responseReport[0];
            responseNav = JSON.parse(responseNav[0]);

            // 获取试卷的基本信息
            let paperInfo = responseReport.paper_info;
            // 获取满分
            let fullScore = paperInfo.score ? parseInt(paperInfo.score, 10) : -1;

            // 获取本报告的子级导航列表
            let selfChildNav = responseNav[reportType];
            // 获取子级报告数目
            let childNumber = selfChildNav.length ? selfChildNav.length : null;

            // 获取本报告数据
            let selfReport = responseReport[reportType];

            // 获取父级报告数据（如果是区域报告为空）
            let parentReports = this.handleParentReportData(reportType, responseReport);

            // 组装报告的信息
            let selfReportInfo = {
                reportType,
                reportLabel,
                childNumber,
                fullScore
            };

            // 处理报告的标题信息
            let titleData = this.handleReportTitleSectionData(selfReportInfo, paperInfo, selfReport);

            // 处理报告的基本信息
            let basicData = this.handleReportBasicData(selfReportInfo, paperInfo, selfReport);

            // 处理报告的分数
            let scoreData = handleBlockReportScore(reportType, 'score', fullScore, selfReport, parentReports);

            // 处理报告的分化度
            let diffData = handleBlockReportScore(reportType, 'diff', 200, selfReport, parentReports);

            // 处理各分数段表现情况
            let standardLevelData = this.handleReportStandardLevelData(reportType, reportLabel, selfReport);

            //处理知识维度数据
            let knowledgeData = this.handleDimension(reportType, selfReport, 'knowledge', parentReports);

            //处理技能维度数据
            let skillData = this.handleDimension(reportType, selfReport, 'skill', parentReports);

            //处理能力维度数据
            let abilityData = this.handleDimension(reportType, selfReport, 'ability', parentReports);

            //处理错题
            let wrongQuize = this.handleWrongQuize(reportType, selfReport);

            this.setState({
                loaded: true,
                reportData: {
                    titleData: titleData,
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

            //请求optional的数据（每个报告下一级的数据）
            reportOptionalPromise.done(function (responseOptional) {
                responseOptional = JSON.parse(responseOptional);
                let responseOptionalData = responseOptional.children;
                //处理各学校基本信息
                let childrenBasicData = this.handleChlidBasicData(reportType, responseOptionalData);

                // 处理各分数段表现情况
                let standardLevelData = this.handleReportStandardLevelData(reportType, reportLabel, selfReport, responseOptionalData);

                //处理各学校一级指标
                let schoolIndicatorsData = this.handleChildIndicatorsInfo(reportType, responseOptionalData);

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

    // 处理父级报告数据列表
    handleParentReportData(reportType, reports) {
        let parentReports = [];
        for (let property in reports) {
            if (reports.hasOwnProperty(property) && property !== 'paper_info' && property !== reportType) {
                let reportItem = {
                    type: property,
                    data: reports[property]
                };
                // 区域报告
                if (property === config.REPORT_TYPE_PROJECT) {
                    reportItem.order = 1;
                }
                // 年级报告
                else if (property === config.REPORT_TYPE_GRADE) {
                    reportItem.order = 2;
                }
                // 班级报告
                else if (property === config.REPORT_TYPE_KLASS) {
                    reportItem.order = 3;
                }
                parentReports.push(reportItem);
            }
        }
        return parentReports;
    }

    //处理标题的方法
    handleReportTitleSectionData(selfReportInfo, paperInfo, selfReport) {
        let modifiedData = {
            data: null,
            options: null,
        };

        let reportType = selfReportInfo.reportType;
        let reportLabel = selfReportInfo.reportLabel;
        let reportBasicData = selfReport.basic;
        let reportTitle = paperInfo.heading;

        let reportHeading;
        if (reportType === config.REPORT_TYPE_PROJECT) {
            let areaArray = reportBasicData.area.split('/');
            reportHeading = `${areaArray[0]}${areaArray[1]}${areaArray[2]}`;
        }
        else if (reportType === config.REPORT_TYPE_GRADE) {
            reportHeading = `${reportBasicData.school}`;
        }
        else if (reportType === config.REPORT_TYPE_KLASS) {
            reportHeading = `${reportBasicData.school}·${reportBasicData.classroom}`;
        }
        else if (reportType === config.REPORT_TYPE_PUPIL) {
            reportHeading = `${reportBasicData.school}·${reportBasicData.classroom}·${reportBasicData.name}`;
        }

        modifiedData.data = {
            reportHeading,
            reportTitle,
            reportLabel
        };

        return {reportHeading, reportTitle, reportLabel};
    }

    // 处理报告的基本信息
    handleReportBasicData(selfReportInfo, paperInfo, reportData, childNumber) {
        let childNumber = selfReportInfo.childNumber;
        let reportBasicData = reportData.basic;
        let studentNumber = reportData.data.knowledge.base.pupil_number;
        let modifiedData = [
            {
                type: 'testDistrict',
                order: 1,
                value: (paperInfo.province && paperInfo.city && paperInfo.district) ? (paperInfo.province + paperInfo.city + paperInfo.district) : '无'
            },
            {
                type: 'testDuration',
                order: 2,
                value: paperInfo.quiz_duration ? paperInfo.quiz_duration : '无'
            },
            {
                type: 'testFullScore',
                order: 3,
                value: paperInfo.score ? paperInfo.score : '无'
            },
            {
                type: 'testSubject',
                order: 4,
                value: reportBasicData.subject ? reportBasicData.subject : '无'
            },
            {
                type: 'testGrade',
                order: 5,
                value: reportBasicData.grade ? reportBasicData.grade : '无'
            },
            {
                type: 'testType',
                order: 6,
                value: reportBasicData.quiz_type ? reportBasicData.quiz_type : '无'
            },
            {
                type: 'childNumber',
                order: 7,
                value: childNumber ? childNumber : '无'
            },
            {
                type: 'studentNumber',
                order: 8,
                value: studentNumber ? studentNumber : '无'
            },
            {
                type: 'testDate',
                order: 9,
                value: reportBasicData.quiz_date ? reportBasicData.quiz_date : '无'
            }
        ];

        modifiedData = handleBlockReportBasicInfo(modifiedData);
        //modifiedData.heading = reportLabel;

        return modifiedData;

    }

    // 处理报告的分数
    handleReportScore(reportType, fullScore, selfReport, parentReports) {
        let modifiedData;
        modifiedData = {
            main: [
                {
                    type: reportType,
                    fullScore: fullScore,
                    data: selfReport
                }
            ],
            other: parentReports
        };

        return modifiedData;
    }

    //处理指标体系的基本信息
    handleDimension(reportType, minData, dimension, parentReports) {
        let modifiedDimensionData = {
            dimension: dimension,
            chartRadarInclicatorsLvOneData: null,
            chartBarInclicatorsLvOneData: null,
            tableInclicatorsLvOneData: null,
            chartScatterInclicatorsLvTwoData: null,
            tableInclicatorsLvTwoData: null,
            dimensionTitle: null
        };
        let data = minData.data[dimension];

        let legend = ['区域'];
        let chartRadarInclicatorsLvOneData = handleChartRadarInclicatorsLv1Data(reportType, legend, minData, dimension, parentReports);
        let title = '一级指标平均分、中位数、分化度';
        let chartBarInclicatorsLvOneData = handleChartBarInclicatorsLv1Data(reportType, title, data);
        let header = ['指标', '平均得分率', '中位数得分率', '分化度'];
        let tableInclicatorsLvOneData = handleTableInclicatorsLv1Data(reportType, header, data);
        let titleScatter = '二级指标分型图';
        let chartScatterInclicatorsLvTwoData = handleScatterInclicatorsLvTwoData(reportType, titleScatter, data);
        // let headerTwo = ['指标','平均得分率','分化度'];
        let tableInclicatorsLvTwoData = handletableInclicatorsLvTwoData(reportType, header, data);

        if (dimension === 'knowledge') {
            modifiedDimensionData.dimensionTitle = '知识';
        } else if (dimension === 'skill') {
            modifiedDimensionData.dimensionTitle = '技能';
        } else if (dimension === 'ability') {
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
    handleChlidBasicData(reportType, data) {
        let modifiedData = {
            childrenBasicTableData: null,
            chlidrenBasicScatterData: null,
            reportType:reportType
        };

        //处理各学校基本信息散点图的数据
        let title = '各学校平均分与分化度';
        let childrenBasicScatterData = handleChildBasicScatterData(reportType, title, data);

        //处理各学校基本信息表格数据
        let tHeader = ['学校', '班级数', '参考人数', '平均分', '分化度'];
        let childrenBasicTableData = handleChildBasicTableData(reportType, tHeader, data);

        modifiedData.chlidrenBasicScatterData = childrenBasicScatterData;
        modifiedData.childrenBasicTableData = childrenBasicTableData;

        return modifiedData;
    }

    // 处理各分数段表现情况
    handleReportStandardLevelData(reportType, reportLabel, mainData, optionalData = null) {
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
    handleWrongQuize(reportType, datas, parentReports) {
        let wrongQuizeData = {
            wrongQuize:null,
            otherWrongQuize:null,
        };
        let data = datas.paper_qzps;
        let wrongQuize,otherWrongQuize;
        wrongQuize = handleWrongQuizeData(reportType, data, parentReports);
        otherWrongQuize = handleOtherWrongQuizeData(reportType, data, parentReports);
        wrongQuizeData.wrongQuize=wrongQuize;
        wrongQuizeData.otherWrongQuize=otherWrongQuize;

        return wrongQuizeData;
    }

    //处理各学校一级指标的原始数据
    handleChildIndicatorsInfo(reportType, data) {
        let modifiedData = {
            title: null,
            data: null
        };

        let tableSkill = {};
        let tableAbility = {};
        let tableKnowledge = {};
        let tHeadSkill = [];
        let tDataSkill = [];
        let tHeadAbility = [];
        let tDataAbility = [];
        let tHeadKnowledge = [];
        let tDataKnowledge = [];
        let schoolIndicatorsData = [],
            responseSkill,
            responseAbility,
            responseKnowledge,
            label;
        let name = '学校';
        let inclicatorsArr = ['知识','技能','能力'];
        if (data.length < 0) {
            return false;
        }
        for (let i = 0; i < data.length; i++) {

            if (data[i][1].report_data !== undefined) {
                label = data[i][1].label;
                let skill = data[i][1].report_data.data.skill;
                let ability = data[i][1].report_data.data.ability;
                let knowledge = data[i][1].report_data.data.knowledge;
                responseSkill = handleChildIndicatorsLvOneData(name, label, skill);
                responseAbility = handleChildIndicatorsLvOneData(name, label, ability);
                responseKnowledge = handleChildIndicatorsLvOneData(name, label, knowledge);
                tHeadSkill.push(responseSkill.tHead);
                tDataSkill.push(...responseSkill.tData);
                tHeadAbility.push(responseAbility.tHead);
                tDataAbility.push(...responseAbility.tData);
                tHeadKnowledge.push(responseKnowledge.tHead);
                tDataKnowledge.push(...responseKnowledge.tData);
            }

        }
        tableSkill.tHead = tHeadSkill[0];
        tableSkill.tData = tDataSkill;
        tableAbility.tHead = tHeadAbility[0];
        tableAbility.tData = tDataAbility;
        tableKnowledge.tHead = tHeadKnowledge[0];
        tableKnowledge.tData = tDataKnowledge;

        let knowledgeObj={
            type:inclicatorsArr[0],
            data:tableKnowledge,
        };
        let abilityObj = {
            type:inclicatorsArr[1],
            data:tableSkill
        };
        let skillObj = {
            type:inclicatorsArr[2],
            data:tableAbility
        };

        schoolIndicatorsData.push(knowledgeObj);
        schoolIndicatorsData.push(abilityObj);
        schoolIndicatorsData.push(skillObj);

        modifiedData.title = name;
        modifiedData.data = schoolIndicatorsData;

        return modifiedData;
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

export default ReportContainer;
