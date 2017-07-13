import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import {SectionReportTitle} from '../../section/SectionReportTitle';
import {SectionReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {SectionReportScore} from '../../section/SectionReportScore';
import {SectionStudentRank} from '../../section/SectionStudentRank';
import {SectionStudentInclicatorsSystem} from '../../section/SectionStudentInclicatorsSystem';
import {SectionStudentWrongQuize} from '../../section/SectionStudentWrongQuize';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

//let config = require('zx-const')[process.env.NODE_ENV];

class StudentReportDetails extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        $('.zx-report-container-wrapper').mCustomScrollbar({
            theme: 'light-thick',
            scrollInertia: 400,
            mouseWheel:{ scrollAmount: 200 }
        });
    }

    render() {
        let reportData = this.props.reportData;
        let contentTitle;
        let contentBasicData;
        let contentScoreData;
        let contentRank;
        let contentWrongQuize;
        let contentKnowlege;
        let contentSkill;
        let contentAbility;
        if (reportData) {
            if (reportData.titleData) {
                contentTitle = <SectionReportTitle data={reportData.titleData}/>
            }
            if (reportData.basicData) {
                contentBasicData = <SectionReportBasicInfo data={reportData.basicData}/>
            }
            if (reportData.scoreData) {
                contentScoreData = <SectionReportScore data={reportData.scoreData}/>
            }
            if(reportData.rankData){
                contentRank = <SectionStudentRank data = {reportData.rankData}/>
            }
            if(reportData.knowledgeData){
                contentKnowlege = <SectionStudentInclicatorsSystem inclicatorsSystemData={reportData.knowledgeData} />;
            }
            if(reportData.skillData){
                contentSkill = <SectionStudentInclicatorsSystem inclicatorsSystemData={reportData.skillData} />;
            }
            if(reportData.abilityData){
                contentAbility = <SectionStudentInclicatorsSystem inclicatorsSystemData={reportData.abilityData} />;
            }
            if (reportData.wrongQuize) {
                contentWrongQuize = <SectionStudentWrongQuize data={reportData.wrongQuize}/>
            }
        }

        return (
            <div className="zx-report-container-wrapper slideUp">
                <div className="zx-report-container">
                    <div className="header">
                        {contentTitle}
                    </div>
                    {contentBasicData}
                    {contentScoreData}
                    {contentRank}
                    {contentKnowlege}
                    {contentSkill}
                    {contentAbility}
                    {contentWrongQuize}
                </div>
            </div>
        )

    }
}

export default StudentReportDetails;