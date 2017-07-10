import React, {Component} from 'react';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import {SectionReportTitle} from '../../section/SectionReportTitle';
import {SectionReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {SectionReportScore} from '../../section/SectionReportScore';
import {SectionInclicatorsSystem} from '../../section/SectionInclicatorsSystem';
import {SectionWrongQuize} from '../../section/SectionWrongQuize';

let config = require('zx-const')[process.env.NODE_ENV];

class StudentReportDetails extends Component {
    constructor() {
        super();
        this.state = {};
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
                contentKnowlege = <SectionInclicatorsSystem inclicatorsSystemData={reportData.knowledgeData} />;
            }
            if(reportData.skillData){
                contentSkill = <SectionInclicatorsSystem inclicatorsSystemData={reportData.skillData} />;
            }
            if(reportData.abilityData){
                contentAbility = <SectionInclicatorsSystem inclicatorsSystemData={reportData.abilityData} />;
            }
            if (reportData.wrongQuize) {
                contentWrongQuize = <SectionWrongQuize data={reportData.wrongQuize}/>
            }
        }

        return (
            <div className="zx-report-container slideUp">
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
        )

    }
}

export default StudentReportDetails;