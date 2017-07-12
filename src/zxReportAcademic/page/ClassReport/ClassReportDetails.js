import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import {SectionReportTitle} from '../../section/SectionReportTitle';
import {SectionReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {SectionReportScore} from '../../section/SectionReportScore';
import {SectionChildrenBasic} from '../../section/SectionChildrenBasic';
import {SectionInclicatorsSystem} from '../../section/SectionInclicatorsSystem';
import {SectionReportStandardLevel} from '../../section/SectionReportStandardLevel';
// import {SectionScatterInclicatorsLvTwo} from '../../section/SectionScatterInclicatorsLvTwo';
import {SectionSchoolIndicatorsLvOne} from '../../section/SectionSchoolIndicatorsLvOne';
import {SectionWrongQuize} from '../../section/SectionWrongQuize';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

// let config = require('zx-const')[process.env.NODE_ENV];

class ProjectReportDetails extends Component {
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
        let contentSubTile;
        let contentBasicData;
        let contentScoreData;
        let contentDiffData;
        let contentChlidrenBasic;
        let contentStandardLevel;
        let contentSchoolIndicatorsLvOne;
        let contentWrongQuize;
        let contentKnowlege;
        let contentSkill;
        let contentAbility;
        if (reportData) {
            if(reportData.titleData){
                contentSubTile = <SectionReportTitle data = {reportData.titleData} />
            }
            if (reportData.basicData) {
                contentBasicData = <SectionReportBasicInfo data={reportData.basicData}/>
            }
            if (reportData.scoreData) {
                contentScoreData = <SectionReportScore data={reportData.scoreData}/>
            }
            if (reportData.diffData) {
                contentDiffData = <SectionReportScore data={reportData.diffData}/>
            }
            if (reportData.chlidrenBasicData) {

                contentChlidrenBasic = <SectionChildrenBasic data={reportData.chlidrenBasicData}/>;
            }
            if (reportData.standardLevelData) {
                contentStandardLevel = <SectionReportStandardLevel data={reportData.standardLevelData}/>;
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
            if (reportData.studentIndicatorsData) {
                contentSchoolIndicatorsLvOne = <SectionSchoolIndicatorsLvOne data={reportData.studentIndicatorsData}/>;
            }
            if (reportData.wrongQuize) {
                contentWrongQuize = <SectionWrongQuize data={reportData.wrongQuize}/>
            }
        }

        return (
            <div className="zx-report-container-wrapper slideUp">
                <div className="zx-report-container">
                    <div className="header">
                        {contentSubTile}
                    </div>
                    {contentBasicData}
                    {contentScoreData}
                    {contentDiffData}
                    {contentChlidrenBasic}
                    {contentStandardLevel}
                    {contentKnowlege}
                    {contentSkill}
                    {contentAbility}
                    {contentSchoolIndicatorsLvOne}
                    {contentWrongQuize}
                </div>
            </div>
        )

    }
}

export default ProjectReportDetails;
