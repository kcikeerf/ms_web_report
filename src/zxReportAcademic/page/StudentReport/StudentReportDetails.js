import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import {SectionReportTitle} from '../../section/SectionReportTitle';
import {SectionReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {SectionReportScore} from '../../section/SectionReportScore';
import {SectionStudentInclicatorsSystem} from '../../section/SectionStudentInclicatorsSystem';
import {SectionWrongQuize} from '../../section/SectionWrongQuize';

import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

let config = require('zx-const')[process.env.NODE_ENV];

class StudentReportDetails extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        $('.zx-report-container-wrapper').mCustomScrollbar({
            theme: 'light-thick',
            scrollInertia: 400
        });
    }

    render() {
        let reportData = this.props.reportData;
        let contentTitle;
        let contentBasicData;
        let contentScoreData;
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
                contentWrongQuize = <SectionWrongQuize data={reportData.wrongQuize}/>
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