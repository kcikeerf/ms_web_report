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
import {handleChildrenBasicTableData} from '../../component/BlockChildrenBaseTable';

let config = require('zx-const')[process.env.NODE_ENV];

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
        $.when(promiseReport, promiseNav).done(function(responseReport, responseNav) {
            responseReport = responseReport[0];
            responseNav = JSON.parse(responseNav[0]);
            console.log(responseNav);
            console.log(responseReport[reportType]);
            let projectNavData = responseNav[reportType];
            let projectReportData = responseReport[reportType];

            // 获取学校数目
            let schoolNumber = projectNavData.length ? projectNavData.length : null;

            // 处理报告的基本信息
            let basicData = this.handleReportBasicData(projectReportData, schoolNumber);

            this.setState({
                reportData: {
                    basicData: basicData
                }
            });

            let header = ['学校','班级数','参考人数','平均分','分化度'];
            promiseOptional.done(function(responseOptional) {
                responseOptional = JSON.parse(responseOptional);
                let responseOptionalData = responseOptional.children;
                this.setState({
                    reportData: {
                        ...this.state.reportData,
                        schoolBasicData:handleChildrenBasicTableData(reportType, header,responseOptionalData)
                    }
                });
            }.bind(this));
        }.bind(this));

    }

    handleReportBasicData(rawData, schoolNumber) {
        let rawDataBasic = rawData.basic;
        let studentNumber = rawData.data.knowledge.base.pupil_number;
        let modifiedData = [
            {
                type: 'testSubject',
                order: 1,
                value: rawDataBasic.subject ? rawDataBasic.subject : '无'
            },
            {
                type: 'testGrade',
                order: 2,
                value: rawDataBasic.grade ? rawDataBasic.grade : '无'
            },
            {
                type: 'testType',
                order: 3,
                value: rawDataBasic.quiz_type ? rawDataBasic.quiz_type : '无'
            },
            {
                type: 'schoolNumber',
                order: 4,
                value: schoolNumber ? schoolNumber : '无'
            },
            {
                type: 'studentNumber',
                order: 5,
                value: studentNumber ? studentNumber : '无'
            },
            {
                type: 'testDate',
                order: 6,
                value: rawDataBasic.quiz_date ? rawDataBasic.quiz_date : '无'
            }
        ];

        modifiedData = handleBlockReportBasicInfo(modifiedData);

        return modifiedData;

    }

    render() {
        console.log(this.state.reportData);
        return (
            <div>
                <ProjectReportDetails reportData={this.state.reportData} />
            </div>
        )
    }
}

export default ProjectReportContainer;
