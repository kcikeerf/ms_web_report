import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import '../../style/style-report.css';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
import {handleAssembleReportUrl} from 'zx-misc/handleReportUrl';
import handleFloatNumber from 'zx-misc/handleFloatNumber';

import handleReportType from '../misc/handleReportType';
import handleReportLabel from '../misc/handleReportLabel';
import handlePromiseReport from '../misc/handlePromiseReport';
import handlePromiseOptional from '../misc/handlePromiseOptional';
import handlePromiseNav from '../misc/handlePromiseNav';
import handleGetIndicators from './../misc/handleGetIndicators';
import handleGetGrade from './../misc/handleGetGrade';

import Preloader from '../component/Preloader';
import ScrollSpy from '../component/ScrollSpy';

import {SectionReportTitle} from '../section/SectionReportTitle';
import {SectionReportBasicInfo} from '../section/SectionReportBasicInfo';
import {SectionReportScore} from '../section/SectionReportScore';
import {SectionReportDiff} from '../section/SectionReportDiff';
import {SectionReportStandardLevel} from '../section/SectionReportStandardLevel';
import SectionReportIndicatorsSystem from '../section/SectionReportIndicatorsSystem';
import {SectionChildBasic} from '../section/SectionChildBasic';
import {SectionStudentsBasic} from '../section/SectionStudentsBasic';
import {SectionStudentRank} from '../section/SectionStudentRank';
import {SectionChildIndicatorsLvOne} from '../section/SectionChildIndicatorsLvOne';
import {SectionReportQuiz} from '../section/SectionReportQuiz';

import ReportDetails from './ReportDetails';

let config = require('zx-const')[process.env.NODE_ENV];

class ReportContainer extends Component {
    constructor() {
        super();
        let accessToken = getCookie(config.COOKIE.SELECTED_ACCESS_TOKEN);
        this.state = {
            accessToken: (accessToken !== '') ? accessToken : null,
            testId: null,
            loaded: null,
            reportData: null
        };
    }

    componentDidMount() {
        // 获取选定账号的access token
        let accessToken = this.state.accessToken;

        // 获取报告的地址
        let reportUrl = handleAssembleReportUrl(this.context.router.location.query);

        // 获取test id
        let testId = this.context.router.location.query.tests;

        //let reportUrl = getCookie('report_url');

        // 根据报告地址判定报告的类型
        let reportType = handleReportType(reportUrl);

        // 根据报告的类型判断报告的中文名
        let reportLabel = handleReportLabel(reportType);

        // 报告内容的数据
        let reportDataPromise = handlePromiseReport(accessToken, reportType, reportUrl);

        let reportOptionalPromise, reportNavPromise;
        if (reportType !== config.REPORT_TYPE_PUPIL) {
            // 报告optional的数据
            reportOptionalPromise = handlePromiseOptional(accessToken, reportUrl);
            // 报告nav的数据
            reportNavPromise = handlePromiseNav(accessToken, reportUrl);
        }

        // 处理返回的数据
        $.when(reportDataPromise, reportNavPromise).done(function (responseReport, responseNav) {
            // @TODO: 添加报告获取异常的处理
            responseReport = responseReport[0];

            let selfChildNav, childNumber;
            if (responseNav) {
                responseNav = JSON.parse(responseNav[0]);
                // 获取本报告的子级导航列表
                selfChildNav = responseNav[reportType];
                // 获取子级报告数目
                childNumber = selfChildNav.length ? selfChildNav.length : null;
            }

            // 获取试卷的基本信息
            let paperInfo = responseReport.paper_info;
            // 获取满分
            let fullScore = paperInfo.score ? parseInt(paperInfo.score, 10) : -1;
            // 获取分化度最大值
            let fullDiff = 200;

            let reports = this.handleReportData(reportType, responseReport);
            // 获取本报告数据
            let selfReportData = reports.selfReport;
            // 获取父级报告数据（如果是区域报告为空）
            let parentReports = reports.parentReports;

            // 组装报告的信息
            let selfReportInfo = {
                reportType,
                reportLabel,
                childNumber,
                fullScore,
                fullDiff
            };

            // 获取区块配置信息 - main
            let sectionMainConfig = this.handleSectionConfigMain(paperInfo, selfReportInfo, selfReportData, parentReports);

            // 处理报告区块数据
            let reportData = this.handleSectionDataMap(sectionMainConfig);
            this.setState({
                loaded: true,
                testId: testId,
                reportData: reportData
            });

            //请求optional的数据（每个报告下一级的数据）
            if (reportOptionalPromise) {
                reportOptionalPromise.done(function (responseOptional) {
                    let selfReportOptional;
                    if (responseOptional) {
                        responseOptional = JSON.parse(responseOptional);
                        selfReportOptional = responseOptional.children ? responseOptional.children : null;
                    }
                    else {
                        selfReportOptional = null;
                    }

                    // 获取区块配置信息 - optional
                    let sectionOptionalConfig = this.handleSectionConfigOptional(paperInfo, selfReportInfo, selfReportData, parentReports, selfReportOptional);

                    // 处理报告额外区块数据
                    let reportOptional = this.handleSectionDataMap(sectionOptionalConfig);

                    if (reportOptional) {
                        this.setState({
                            loaded: true,
                            reportData: [
                                ...this.state.reportData,
                                ...reportOptional
                            ]
                        });
                    }
                }.bind(this));
            }
        }.bind(this));

    }

    // 处理父级报告数据列表
    handleReportData(reportType, reports) {
        let reportData = {
            selfReport: null,
            parentReports: []
        };

        let selfReport, parentReports = [];
        for (let property in reports) {
            if (reports.hasOwnProperty(property) && property !== 'paper_info') {
                let reportItem = {
                    type: property,
                    data: reports[property]
                };
                // 区域报告
                if (property === config.REPORT_TYPE_PROJECT) {
                    reportItem.order = 1;
                    reportItem.label = config.REPORT_TYPE_PROJECT_LABEL;
                    reportItem.icon = config.REPORT_TYPE_PROJECT_ICON;
                }
                // 年级报告
                else if (property === config.REPORT_TYPE_GRADE) {
                    reportItem.order = 2;
                    reportItem.label = config.REPORT_TYPE_GRADE_LABEL;
                    reportItem.icon = config.REPORT_TYPE_GRADE_ICON;
                }
                // 班级报告
                else if (property === config.REPORT_TYPE_KLASS) {
                    reportItem.order = 3;
                    reportItem.label = config.REPORT_TYPE_KLASS_LABEL;
                    reportItem.icon = config.REPORT_TYPE_KLASS_ICON;
                }
                // 学生报告
                else if (property === config.REPORT_TYPE_PUPIL) {
                    reportItem.order = 4;
                    reportItem.label = config.REPORT_TYPE_PUPIL_LABEL;
                    reportItem.icon = config.REPORT_TYPE_PUPIL_ICON;
                }

                if (property === reportType) {
                    selfReport = reportItem;
                }
                else {
                    parentReports.push(reportItem);
                }
            }
        }

        reportData.selfReport = selfReport;
        reportData.parentReports = parentReports;

        return reportData;
    }

    // 处理区块配置 - main
    handleSectionConfigMain(paperInfo, selfReportInfo, selfReportData, parentReports, settings = null) {
        let reportType = selfReportInfo.reportType;
        let generalSettings = [
            {
                id: 'zx-report-section-title',
                name: 'SectionReportTitle',
                handler: 'handleReportTitleSectionData',
                args: [paperInfo, selfReportInfo, selfReportData],
                component: SectionReportTitle,
                active: true,
                order: 1,
                spy: true,
            },
            {
                id: 'zx-report-section-basic',
                name: 'SectionReportBasicInfo',
                handler: 'handleReportBasicData',
                args: [paperInfo, selfReportInfo, selfReportData],
                component: SectionReportBasicInfo,
                active: true,
                order: 2,
                spy: false,
            },
            {
                id: 'zx-report-section-score',
                name: 'SectionReportScore',
                handler: 'handleReportScore',
                args: [selfReportInfo, selfReportData, parentReports],
                component: SectionReportScore,
                active: true,
                order: 3,
                spy: true,
            },
            {
                id: 'zx-report-section-indicator-knowledge-lv1',
                name: 'SectionReportIndicatorsSystem',
                handler: 'handleReportIndicatorsSystem',
                args: ['knowledge', selfReportInfo, selfReportData, parentReports],
                component: SectionReportIndicatorsSystem,
                active: true,
                order: 7,
                spy: true,
            },
            {
                id: 'zx-report-section-indicator-skill-lv1',
                name: 'SectionReportIndicatorsSystem',
                handler: 'handleReportIndicatorsSystem',
                args: ['skill', selfReportInfo, selfReportData, parentReports],
                component: SectionReportIndicatorsSystem,
                active: true,
                order: 8,
                spy: true,
            },
            {
                id: 'zx-report-section-indicator-ability-lv1',
                name: 'SectionReportIndicatorsSystem',
                handler: 'handleReportIndicatorsSystem',
                args: ['ability', selfReportInfo, selfReportData, parentReports],
                component: SectionReportIndicatorsSystem,
                active: true,
                order: 9,
                spy: true,
            },
            {
                id: 'zx-report-section-quiz',
                name: 'SectionReportQuiz',
                handler: 'handleReportQuiz',
                args: [selfReportInfo, selfReportData, parentReports],
                component: SectionReportQuiz,
                active: true,
                order: 11,
                spy: true,
            }
        ];

        let reportSpecificSettings;
        if (reportType === config.REPORT_TYPE_PUPIL) {
            // 学生报告
            reportSpecificSettings = [
                ...generalSettings,
                {
                    id: 'zx-report-section-student-rank',
                    name: 'SectionStudentRank',
                    handler: 'handleReportStudentRank',
                    args: [selfReportData, parentReports],
                    component: SectionStudentRank,
                    active: true,
                    order: 4,
                    spy: true,
                }
            ];
        }
        else {
            if (reportType === config.REPORT_TYPE_PROJECT) {
                // 区域报告
                reportSpecificSettings = [];
            }
            else if (reportType === config.REPORT_TYPE_GRADE) {
                // 年级报告
                reportSpecificSettings = [];
            }
            else if (reportType === config.REPORT_TYPE_KLASS) {
                // 班级报告
                reportSpecificSettings = [];
            }
            // 区域，年级，班级报告共有
            reportSpecificSettings = [
                ...generalSettings,
                ...reportSpecificSettings,
                {
                    id: 'zx-report-section-diff',
                    name: 'SectionReportDiff',
                    handler: 'handleReportDiff',
                    args: [selfReportInfo, selfReportData, parentReports],
                    component: SectionReportDiff,
                    active: true,
                    order: 4,
                    spy: true,
                },
                {
                    id: 'zx-report-section-standard-level',
                    name: 'SectionReportStandardLevel',
                    handler: 'handleReportStandardLevelData',
                    args: [selfReportInfo, selfReportData],
                    component: SectionReportStandardLevel,
                    active: true,
                    order: 5,
                    spy: true,
                }
            ];

        }

        return reportSpecificSettings;
    }

    // 处理区块配置 - optional
    handleSectionConfigOptional(paperInfo, selfReportInfo, selfReportData, parentReports, selfReportOptional, settings = null) {
        if (!selfReportOptional) {
            return false;
        }
        let reportType = selfReportInfo.reportType;
        let generalSettings = [];

        let modifiedSelfReportOptional = this.handleOptional(selfReportInfo, selfReportOptional);

        let reportSpecificSettings;
        if (reportType === config.REPORT_TYPE_PUPIL) {
            // 学生报告
            reportSpecificSettings = [
                ...generalSettings,
            ];
        }
        else {
            let settingsSectionChildBasic = {
                id: 'zx-report-section-child-basic',
                name: 'SectionChildBasic',
                handler: 'handleReportChlidBasicData',
                args: [selfReportInfo, selfReportData, parentReports, modifiedSelfReportOptional],
                component: SectionChildBasic,
                active: true,
                order: 6,
                spy: true,
            };
            if (reportType === config.REPORT_TYPE_PROJECT) {
                // 区域报告
                reportSpecificSettings = [
                    settingsSectionChildBasic
                ];
            }
            else if (reportType === config.REPORT_TYPE_GRADE) {
                // 年级报告
                reportSpecificSettings = [
                    settingsSectionChildBasic
                ];
            }
            else if (reportType === config.REPORT_TYPE_KLASS) {
                // 班级报告
                reportSpecificSettings = [
                    {
                        id: 'zx-report-section-child-basic',
                        name: 'SectionStudentsBasic',
                        handler: 'handleReportStudentsBasicData',
                        args: [selfReportInfo, selfReportData, parentReports, modifiedSelfReportOptional],
                        component: SectionStudentsBasic,
                        active: true,
                        order: 6,
                        spy: true,
                    }
                ];
            }
            // 区域，年级，班级报告共有
            reportSpecificSettings = [
                ...generalSettings,
                ...reportSpecificSettings,
                {
                    id: 'zx-report-section-child-indicator-lv1',
                    name: 'SectionChildIndicatorsLvOne',
                    handler: 'handleReportChildIndicatorsLvOne',
                    args: [selfReportInfo, modifiedSelfReportOptional],
                    component: SectionChildIndicatorsLvOne,
                    active: true,
                    order: 10,
                    spy: true,
                }
            ];
        }

        return reportSpecificSettings;
    }

    // 处理optional
    handleOptional(selfReportInfo, selfReportOptional) {
        let reportType = selfReportInfo.reportType;
        let Arr = [];
        for (let i = 0; i < selfReportOptional.length; i++) {
            let obj = {};

            let name = selfReportOptional[i][1].label;
            let selfData = selfReportOptional[i][1].report_data;

            if (selfData) {
                let selfTransitData = selfData.data.knowledge.base;
                let fullScore = selfTransitData.total_full_score / selfTransitData.pupil_number;
                let diffDegree = selfTransitData.diff_degree;
                let scoreAverage = selfTransitData.score_average;
                let pupilNumber = selfTransitData.pupil_number;
                let excellentPupilNumber = selfTransitData.excellent_pupil_number;
                let excellentPercent = selfTransitData.excellent_percent;
                let goodPupilNumber = selfTransitData.good_pupil_number;
                let goodPercent = selfTransitData.good_percent;
                let failedPupilNumber = selfTransitData.failed_pupil_number;
                let failedPercent = selfTransitData.failed_percent;
                let totalRealScore = selfTransitData.total_real_score;

                if (reportType === config.REPORT_TYPE_PROJECT || reportType === config.REPORT_TYPE_GRADE) {
                    let knowledge = handleGetIndicators('knowledge', selfData);
                    let skill = handleGetIndicators('skill', selfData);
                    let ability = handleGetIndicators('ability', selfData);
                    obj.knowledge = knowledge;
                    obj.skill = skill;
                    obj.ability = ability;
                    obj.name = name;
                    obj.fullScore = fullScore;
                    obj.diffDegree = parseFloat(diffDegree).toFixed(2);
                    obj.scoreAverage = parseFloat(scoreAverage).toFixed(2);
                    obj.pupilNumber = pupilNumber;
                    obj.excellentPupilNumber = excellentPupilNumber;
                    obj.excellentPercent = parseFloat((excellentPercent * 100).toFixed(2));
                    obj.goodPupilNumber = goodPupilNumber;
                    obj.goodPercent = parseFloat((goodPercent * 100).toFixed(2));
                    obj.failedPupilNumber = failedPupilNumber;
                    obj.failedPercent = parseFloat((failedPercent * 100).toFixed(2));
                    Arr.push(obj)
                }
                else if (reportType === config.REPORT_TYPE_KLASS) {
                    let knowledge = handleGetIndicators('knowledge', selfData);
                    let skill = handleGetIndicators('skill', selfData);
                    let ability = handleGetIndicators('ability', selfData);
                    obj.knowledge = knowledge;
                    obj.skill = skill;
                    obj.ability = ability;
                    obj.name = name;
                    obj.totalRealScore = totalRealScore;
                    obj.projectRank = selfTransitData.project_rank;
                    obj.gradeRank = selfTransitData.grade_rank;
                    obj.klassRank = selfTransitData.klass_rank;
                    Arr.push(obj)
                }
            }
        }
        return Arr;
    }

    // 处理报告额外区块数据
    handleSectionDataMap(config) {
        if (!config) {
            return false;
        }
        let reportData = [];
        for (let i in config) {
            let sectionConfigItem = config[i];
            if (sectionConfigItem.active) {
                let modifiedData = this[sectionConfigItem.handler](...sectionConfigItem.args);
                modifiedData = {
                    ...sectionConfigItem,
                    ...modifiedData
                };
                reportData.push(modifiedData);
            }
        }
        return reportData;
    }

    // 处理标题的方法
    handleReportTitleSectionData(paperInfo, selfReportInfo, selfReportData) {
        let modifiedData = {
            title: '基本信息',
            data: null,
            options: null,
        };

        let reportType = selfReportInfo.reportType;
        let reportLabel = selfReportInfo.reportLabel;
        let reportBasicData = selfReportData.data.basic;
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

        return modifiedData;
    }

    // 处理报告的基本信息
    handleReportBasicData(paperInfo, selfReportInfo, selfReportData) {
        let modifiedData = {
            title: '基本信息',
            data: null,
            options: null,
        };

        let childNumber = selfReportInfo.childNumber;
        let reportBasicData = selfReportData.data.basic;
        let studentNumber = selfReportData.data.data.knowledge.base.pupil_number;
        // 报告类型
        let reportType = selfReportInfo.reportType;
        let basicData;

        let general = [
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
                type: 'testDate',
                order: 9,
                value: reportBasicData.quiz_date ? reportBasicData.quiz_date : '无'
            },
        ];

        let itemStudentNumber = {
            type: 'studentNumber',
            order: 8,
            value: studentNumber ? studentNumber + '人' : '无'
        };
        let itemSchoolName = {
            type: 'schoolName',
            order: 7,
            value: reportBasicData.school ? reportBasicData.school : '无'
        };

        if (reportType === config.REPORT_TYPE_PROJECT) {
            basicData = [
                ...general,
                {
                    type: 'schoolNumber',
                    order: 7,
                    value: childNumber ? childNumber + '所' : '无'
                },
                itemStudentNumber
            ]
        }
        else if (reportType === config.REPORT_TYPE_GRADE) {
            basicData = [
                ...general,

                {
                    type: 'klassNumber',
                    order: 7,
                    value: childNumber ? childNumber + '个' : '无'
                },
                itemStudentNumber
            ]
        }
        else if (reportType === config.REPORT_TYPE_KLASS) {
            basicData = [
                ...general,
                itemSchoolName,
                itemStudentNumber
            ]
        }
        else {
            basicData = [
                ...general,
                itemSchoolName,
                {
                    type: 'klassName',
                    order: 8,
                    value: reportBasicData.classroom ? reportBasicData.classroom : '无'
                },
                // 暂无数据
                // {
                //     type: 'coursTeacher',
                //     order: 9,
                //     value: '暂无数据'
                // }
            ]
        }

        modifiedData.data = basicData;

        return modifiedData;

    }

    // 处理报告的分数
    handleReportScore(selfReportInfo, selfReportData, parentReports) {
        let modifiedData = {
            title: '成绩',
            data: null,
            options: null,
        };

        // 报告类型
        let reportType = selfReportInfo.reportType;
        // 满分
        let fullValue = selfReportInfo.fullScore;

        // 处理本报告的分数
        let selfValue = selfReportData.data.data.knowledge.base;
        if (reportType !== config.REPORT_TYPE_PUPIL) {
            selfValue = selfValue.score_average;
        }
        else {
            selfValue = selfValue.total_real_score;
        }
        selfValue = parseFloat(selfValue).toFixed(2);

        let valueData = {
            fullValue: fullValue,
            selfValue: {
                label: selfReportData.label,
                icon: selfReportData.icon,
                type: reportType,
                value: selfValue
            },
            parentValues: []
        };

        valueData.parentValues = parentReports.map((parentReport, index) => {
            let score = parentReport.data.data.knowledge.base.score_average;
            return {
                label: parentReport.label,
                icon: parentReport.icon,
                type: parentReport.type,
                order: parentReport.order,
                value: handleFloatNumber(score, 2)
            };
        });

        modifiedData.data = valueData;

        return modifiedData;
    }

    // 处理报告的分化度
    handleReportDiff(selfReportInfo, selfReportData, parentReports) {
        let modifiedData = {
            title: '分化度',
            data: null,
            options: null,
        };

        // 报告类型
        let reportType = selfReportInfo.reportType;
        // 满分
        let fullValue = 200;

        // 处理本报告的分化度
        let selfValue = selfReportData.data.data.knowledge.base;
        if (reportType !== config.REPORT_TYPE_PUPIL) {
            selfValue = selfValue.diff_degree ? selfValue.diff_degree : -1;
        }
        selfValue = parseFloat(selfValue).toFixed(2);

        let valueData = {
            fullValue: fullValue,
            selfValue: {
                label: selfReportData.label,
                icon: selfReportData.icon,
                type: reportType,
                value: selfValue
            },
            parentValues: []
        };

        valueData.parentValues = parentReports.map((parentReport, index) => {
            let value = parentReport.data.data.knowledge.base.diff_degree;
            return {
                label: parentReport.label,
                icon: parentReport.icon,
                type: parentReport.type,
                order: parentReport.order,
                value: value ? parseFloat(value).toFixed(2) : -1
            };
        });

        modifiedData.data = valueData;

        return modifiedData;
    }

    // 处理学生排名
    handleReportStudentRank(selfReportData, parentReports) {
        let modifiedData = {
            title: null,
            data: null,
            options: {
                grade: null
            },
        };
        let grade = selfReportData.data.basic.grade;
        let gradeFlag = handleGetGrade(grade);

        if (gradeFlag) {
            modifiedData.title = '学生百分比等级';
        } else {
            modifiedData.title = '学生排名';
        }

        let rankData = parentReports.map((parentReport, index) => {
            let type = parentReport.type;
            return ({
                ...parentReport,
                value: selfReportData.data.data.knowledge.base[type + '_rank'],
                fullValue: parentReport.data.data.knowledge.base.pupil_number,
                percentile: selfReportData.data.data.knowledge.base[type + '_percentile']
            });
        });

        modifiedData.data = rankData;
        modifiedData.options.grade = gradeFlag;

        return modifiedData;
    }

    // 处理指标的方法
    handleReportIndicatorsSystem(dimension, selfReportInfo, selfReportData, parentReports) {
        if (selfReportData && parentReports) {
            let reportType = selfReportInfo.reportType;
            let fullScore = selfReportInfo.fullScore;
            let fullDiff = selfReportInfo.fullDiff;

            let modifiedData = {
                title: null,
                data: null,
                options: null,
            };
            switch (dimension) {
                case 'knowledge':
                    modifiedData.title = '知识维度';
                    break;
                case 'skill':
                    modifiedData.title = '技能维度';
                    break;
                case 'ability':
                    modifiedData.title = '能力维度';
                    break;
            }
            ;
            let general = [
                {
                    name: 'chartRadarLvOneData',
                    order: 1,
                    title: '一级指标的表现情况',
                    func: 'chartRadarLvOne',
                    component: 'ChartRadarDefault'
                }
            ];

            let reportSpecificSettings;
            if (reportType === config.REPORT_TYPE_PUPIL) {
                // 学生报告
                reportSpecificSettings = [
                    ...general,
                    {
                        name: 'tableInclicatorsLvOneData',
                        order: 3,
                        title: '一级指标的数据表',
                        func: 'pupilTableInclicatorsLvOne',
                        component: 'TableIndicator'
                    },
                    {
                        name: 'tableInclicatorsLvTwoData',
                        order: 5,
                        title: '二级指标的数据表',
                        func: 'pupilTableInclicatorsLvTwo',
                        component: 'TableIndicator'
                    }
                ];
            }
            else {
                reportSpecificSettings = [
                    ...general,
                    {
                        name: 'chartBarLvOneData',
                        order: 2,
                        title: '一级指标的平均得分率、中位数得分率和分化度',
                        func: 'chartBarLvOne',
                        component: 'ChartBarDefault'
                    },
                    {
                        name: 'tableInclicatorsLvOneData',
                        order: 3,
                        title: '一级指标的数据表',
                        func: 'tableInclicatorsLvOne',
                        component: 'TableIndicator'
                    },
                    {
                        name: 'chartScatterLvTwoData',
                        order: 4,
                        title: '二级指标的分型图',
                        func: 'chartScatterLvTwo',
                        component: 'ChartScatterDefault'
                    },
                    {
                        name: 'tableInclicatorsLvTwoData',
                        order: 5,
                        title: '二级指标的数据表',
                        func: 'tableInclicatorsLvTwo',
                        component: 'TableIndicator'
                    }
                ];
            }

            let lvData = {
                fullScore,
                fullDiff,
                selfLv: null,
                parentLv: []
            };

            let selfObj = {
                ...selfReportData,
                data: null
            };
            //处理自己的指标方法
            let selfLv = handleGetIndicators(dimension, selfReportData.data);
            selfObj.data = selfLv;
            lvData.selfLv = selfObj;

            //处理父级指标的方法 如果是区域报告没有
            if (parentReports.length !== 0) {
                for (let i = 0; i < parentReports.length; i++) {
                    let parentObj = {
                        ...parentReports[i],
                        data: null
                    };
                    let indicators = parentReports[i].data;
                    let parentLv = handleGetIndicators(dimension, indicators);
                    parentObj.data = parentLv;
                    lvData.parentLv.push(parentObj);
                }
            }

            modifiedData.data = lvData;
            modifiedData.options = reportSpecificSettings;
            return modifiedData;
        }

    }

    // 处理子群体基本信息(子集表现情况)
    handleReportChlidBasicData(selfReportInfo, selfReportData, parentReports, modifiedSelfReportOptional) {
        let parentData, selfAndParentData = [];
        if (!parentReports) {
            let parentScoreAverage = parentReports[0].data.data.knowledge.base.score_average;
            parentScoreAverage = handleFloatNumber(parentScoreAverage, 2);
            let parentDiffDegree = parentReports[0].data.data.knowledge.base.diff_degree;
            parentDiffDegree = handleFloatNumber(parentDiffDegree, 2);
            let parentLable = `${parentReports[0].label}平均水平`;
            let parentItem = [parentDiffDegree, parentScoreAverage];
            parentData = {
                parentLable,
                parentItem
            };
            selfAndParentData.push(parentData)
        }

        let selfScoreAverage = selfReportData.data.data.knowledge.base.score_average;
        selfScoreAverage = handleFloatNumber(selfScoreAverage, 2);
        let selfDiffDegree = selfReportData.data.data.knowledge.base.diff_degree;
        selfDiffDegree = handleFloatNumber(selfDiffDegree, 2);
        let selfLable = `${selfReportData.label}平均水平`;
        let selfItem = [selfDiffDegree, selfScoreAverage];

        let selfData = {
            name: selfLable,
            value: selfItem
        };
        selfAndParentData.push(selfData);
        let reportType = selfReportInfo.reportType;
        let fullScore = selfReportInfo.fullScore;
        let fullDiff = selfReportInfo.fullDiff;

        let modifiedData = {
            title: '',
            data: null,
            options: null,
        };

        let tableData = [], scatterData = [];
        let tableHeader;
        for (let i = 0; i < modifiedSelfReportOptional.length; i++) {
            let scoreAverage = modifiedSelfReportOptional[i].scoreAverage;
            let diffDegree = modifiedSelfReportOptional[i].diffDegree;
            let pupilNumber = modifiedSelfReportOptional[i].pupilNumber;
            let label = modifiedSelfReportOptional[i].name;

            let scatterDataItem = {
                name: modifiedSelfReportOptional[i].name,
                value: [diffDegree, scoreAverage]
            };
            scatterData.push(scatterDataItem);

            let tableDataItem = [
                label,
                pupilNumber,
                scoreAverage,
                diffDegree
            ];

            if (reportType === config.REPORT_TYPE_PROJECT) {
                tableHeader = ['学校', '参考人数', '平均分', '分化度'];
                modifiedData.title = '各学校表现情况';
            } else if (reportType === config.REPORT_TYPE_GRADE) {
                tableHeader = ['班级', '参考人数', '平均分', '分化度'];
                modifiedData.title = '各班表现情况';
            }
            tableData.push(tableDataItem);
        }

        //处理各子集基本信息散点图的数据
        let chlidBasicScatterData = {
            fullScore,
            fullDiff,
            data: scatterData,
            selfAndParentData
        };

        //处理各子集基本信息表格的数据
        let childBasicTableData = {
            tHeader: tableHeader,
            tData: tableData
        };

        let baseData = {
            reportType,
            chlidBasicScatterData,
            childBasicTableData,
        };

        modifiedData.data = baseData;

        return modifiedData;
    }

    // 处理学生基本信息
    handleReportStudentsBasicData(selfReportInfo, selfReportData, parentReports, modifiedSelfReportOptional) {
        let modifiedData = {
            title: '学生成绩分布',
            data: null,
            options: null,
        };

        let tableHeader = ['学生', '得分情况', '班级排名', '学校排名', '区域排名'];
        let fullScore = selfReportInfo.fullScore;
        let tableData = [], studentTotalRealScore = [];
        let schoolScoreAverage, projectScoreAverage;
        for (let i = 0; i < parentReports.length; i++) {
            if (parentReports[i].type === config.REPORT_TYPE_GRADE) {
                schoolScoreAverage = parentReports[i].data.data.knowledge.base.score_average;
            } else if (parentReports[i].type === config.REPORT_TYPE_PROJECT) {
                projectScoreAverage = parentReports[i].data.data.knowledge.base.score_average;
            }
        }

        let name = [];
        // modifiedSelfReportOptional.sort((a, b) => {return a.klassRank - b.klassRank;});
        console.log(modifiedSelfReportOptional);
        for (let i = 0; i < modifiedSelfReportOptional.length; i++) {

            let totalRealScore = modifiedSelfReportOptional[i].totalRealScore;
            let projectRank = modifiedSelfReportOptional[i].projectRank;
            let gradeRank = modifiedSelfReportOptional[i].gradeRank;
            let klassRank = modifiedSelfReportOptional[i].klassRank;
            let pupilName = modifiedSelfReportOptional[i].name.split(/[()]/)[0];
            name.push(pupilName);
            studentTotalRealScore.push(totalRealScore);

            let tableDataItem = [
                pupilName,
                totalRealScore,
                klassRank,
                gradeRank,
                projectRank
            ];
            tableData.push(tableDataItem)
        }

        //处理各学生基本信息散点图的数据
        let chlidBasicScatterData = {
            // scoreCritical:schoolScoreAverage,
            scoreCritical: projectScoreAverage,
            maxScore: fullScore,
            name,
            data: studentTotalRealScore
        };

        //处理各子集基本信息表格的数据
        let childBasicTableData = {
            tHeader: tableHeader,
            tData: tableData
        };

        let baseData = {
            chlidBasicScatterData,
            childBasicTableData,
        };

        modifiedData.data = baseData;

        return modifiedData;
    }

    // 处理各分数段表现情况
    handleReportStandardLevelData(selfReportInfo, selfReportData) {
        let reportType = selfReportInfo.reportType;
        let modifiedData = {
            title: '各分数段人数比例',
            data: null,
            options: null,
        };

        let dataBase = selfReportData.data.data.knowledge.base;
        let fullValue = dataBase.pupil_number || -1;
        let values = [
            {
                type: 'excellent',
                label: '优秀',
                value: [dataBase.excellent_pupil_number]
            },
            {
                type: 'good',
                label: '良好',
                value: [dataBase.good_pupil_number]
            },
            {
                type: 'failed',
                label: '不及格',
                value: [dataBase.failed_pupil_number]
            }
        ];

        //情况说明
        let note;
        let noteFailed = {
            label: '高',
            color: '红',
            level: 'failed'
        };
        let noteGood = {
            label: '中',
            color: '黄',
            level: 'good'
        };
        let noteExcellent = {
            label: '低',
            color: '蓝',
            level: 'excellent'
        };
        if (reportType !== config.REPORT_TYPE_PUPIL) {
            note = [
                {
                    ...noteExcellent,
                    note: '优秀：得分率≥85%的学生人数（比例）'
                },
                {
                    ...noteGood,
                    // note:'良好：得分率小于85%且大于等于60%的学生人数（比例）'
                    note: '良好：60%≤得分率＜85%的学生人数（比例）'
                },
                {
                    ...noteFailed,
                    note: '不及格：得分率＜60%的学生人数（比例）'
                }
            ]
        }

        modifiedData.options = note;
        modifiedData.data = {fullValue, values};

        return modifiedData;
    }

    // 处理错题的方法
    handleReportQuiz(selfReportInfo, selfReportData, parentReports) {
        let modifiedData = {
            title: '答题情况',
            data: null,
            options: null,
        };

        let reportType = selfReportInfo.reportType;
        let quizItems = [];
        let selfReportQuizData = selfReportData.data.paper_qzps;

        if (selfReportQuizData) {
            for (let i in selfReportQuizData) {
                let selfReportQuizItem = selfReportQuizData[i];
                let selfReportQuizItemValue = selfReportQuizItem.value;
                if (!selfReportQuizItemValue) {
                    delete selfReportQuizData[i]
                }
                else {
                    let scorePercent = handleFloatNumber(selfReportQuizItemValue.score_average_percent, 2);
                    let score, correctPercent, level;
                    if (reportType === config.REPORT_TYPE_PUPIL) {
                        score = handleFloatNumber(selfReportQuizItemValue.total_real_score, 2);
                        if (scorePercent === 1) {
                            level = 'excellent';
                        }
                        else if (scorePercent > 0) {
                            level = 'good';
                        }
                        else {
                            level = 'failed';
                        }
                    }
                    else {
                        score = handleFloatNumber(selfReportQuizItemValue.score_average, 2);
                        correctPercent = handleFloatNumber(selfReportQuizItemValue.total_qzp_correct_percent, 2);
                        if (scorePercent >= 0.85) {
                            level = 'excellent';
                        }
                        else if (scorePercent >= 0.6) {
                            level = 'good';
                        }
                        else {
                            level = 'failed';
                        }
                    }

                    let quizItem = {
                        selfValue: {
                            ...selfReportData,
                            data: {
                                type: selfReportQuizItem.qzp_type,
                                id: selfReportQuizItem.qzp_id,
                                order: selfReportQuizItem.qzp_order,
                                systemOrder: selfReportQuizItem.qzp_system_order,
                                customOrder: selfReportQuizItem.qzp_custom_order,
                                knowledge: selfReportQuizItem.ckps.knowledge,
                                skill: selfReportQuizItem.ckps.skill,
                                ability: selfReportQuizItem.ckps.ability,
                                scorePercent: scorePercent,
                                score: score,
                                correctPercent: correctPercent,
                                level: level
                            }
                        },
                        parentValues: []
                    };

                    for (let j in parentReports) {
                        let parentReportQuizItem = parentReports[j].data.paper_qzps[i];
                        let parentReportQuizItemValue = parentReportQuizItem.value;
                        let parentQuizItem = {
                            ...parentReports[j],
                            data: {
                                score: handleFloatNumber(parentReportQuizItemValue.score_average, 2),
                                correctPercent: handleFloatNumber(parentReportQuizItemValue.total_qzp_correct_percent, 2)
                            }
                        };
                        quizItem.parentValues.push(parentQuizItem);
                    }

                    quizItems.push(quizItem);

                }
            }
        }

        // 答题情况的说明
        let note;
        let noteFailed = {
            label: '高',
            color: '红',
            level: 'failed'
        };
        let noteGood = {
            label: '中',
            color: '黄',
            level: 'good'
        };
        let noteExcellent = {
            label: '低',
            color: '蓝',
            level: 'excellent'
        };
        if (reportType === config.REPORT_TYPE_PUPIL) {
            note = [
                {
                    ...noteFailed,
                    note: '表示该题得分为0分'
                },
                {
                    ...noteGood,
                    note: '表示该题未获得满分'
                },
                {
                    ...noteExcellent,
                    note: '表示该题获得满分'
                }
            ]
        } else {
            note = [
                {
                    ...noteFailed,
                    note: '表示平均得分率<60%'
                },
                {
                    ...noteGood,
                    note: '表示60%≤平均得分率<85%'
                },
                {
                    ...noteExcellent,
                    note: '表示平均得分率≥85%'
                }
            ]
        }

        modifiedData.options = note;
        modifiedData.data = quizItems;

        return modifiedData;
    }

    // handleReportChildIndicatorsLvOne中的公共方法
    handlePublicIndicator(data, nameTitle, indicator) {
        let indicatorItem = [], indicatorsData = {};
        for (let i = 0; i < data.length; i++) {
            let tHead = [nameTitle], tableData = [];
            let name = data[i].name.split(/[()]/)[0];
            tableData.push(name);
            let indicatorNameLvOne = data[i][indicator].lvOne;
            for (let j in indicatorNameLvOne) {
                let checkpoint = indicatorNameLvOne[j].checkpoint;
                let score_average_percent = indicatorNameLvOne[j].score_average_percent;
                let scoreAveragePercent = (parseFloat((`${score_average_percent}`) * 100).toFixed(2));
                tableData.push(scoreAveragePercent);
                tHead.push(checkpoint);
            }
            indicatorItem.push(tableData);
            indicatorsData = {
                tData: indicatorItem,
                tHead: tHead
            };
        }
        return indicatorsData
    }

    // 处理各一级指标数据
    handleReportChildIndicatorsLvOne(selfReportInfo, data) {
        let inclicatorsArr = ['知识', '技能', '能力'];
        let reportType = selfReportInfo.reportType;
        let modifiedData = {
            title: null,
            data: [],
            options: inclicatorsArr,
        };
        let nameTitle;
        if (reportType === config.REPORT_TYPE_PROJECT) {
            nameTitle = '学校';
            modifiedData.title = '各学校各指标表现情况';
        }
        else if (reportType === config.REPORT_TYPE_GRADE) {
            nameTitle = '班级';
            modifiedData.title = '各班各指标表现情况';
        }
        else if (reportType === config.REPORT_TYPE_KLASS) {
            nameTitle = '学生';
            modifiedData.title = '各学生各指标表现情况';
        }

        let knowledgeObj = {
            type: inclicatorsArr[0],
            data: this.handlePublicIndicator(data, nameTitle, "knowledge"),
        };
        let skillObj = {
            type: inclicatorsArr[1],
            data: this.handlePublicIndicator(data, nameTitle, "skill"),
        };
        let abilityObj = {
            type: inclicatorsArr[2],
            data: this.handlePublicIndicator(data, nameTitle, "ability"),
        };
        modifiedData.data.push(knowledgeObj);
        modifiedData.data.push(skillObj);
        modifiedData.data.push(abilityObj);

        return modifiedData;
    }

    render() {
        let accessToken = this.state.accessToken;
        let testId = this.state.testId;
        let reportData = this.state.reportData;
        let contentScrollSpy;
        if (reportData) {
            // 区块排序
            reportData = this.state.reportData.sort(function (a, b) {
                return a.order - b.order
            });

            let scrollSpyData = [];
            for (let i in reportData) {
                let section = reportData[i];
                let sectionID = section.id;
                let sectionTitle = section.title;
                if (section.spy) {
                    scrollSpyData.push({
                        target: sectionID,
                        title: sectionTitle
                    });
                }
            }

            contentScrollSpy = <ScrollSpy data={scrollSpyData}/>;
        }

        return (
            <div className="zx-report-holder">
                {
                    this.state.loaded ||
                    <Preloader/>
                }
                {
                    this.state.loaded &&
                    <ReportDetails accessToken={accessToken} testId={testId} reportData={reportData}/>
                }
                {
                    this.state.loaded &&
                    contentScrollSpy
                }
            </div>
        )
    }
}

ReportContainer.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default ReportContainer;
