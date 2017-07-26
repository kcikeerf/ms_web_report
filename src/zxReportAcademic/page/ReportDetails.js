import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import {SectionReportTitle} from '../section2/SectionReportTitle';
import {SectionReportBasicInfo} from '../section2/SectionReportBasicInfo';
import {SectionReportScore} from '../section2/SectionReportScore';
import {SectionChildBasic} from '../section2/SectionChildBasic';
import {SectionInclicatorsSystem} from '../section2/SectionInclicatorsSystem';
import {SectionReportStandardLevel} from '../section2/SectionReportStandardLevel';
import {SectionChildIndicatorsLvOne} from '../section2/SectionChildIndicatorsLvOne';
import {SectionWrongQuize} from '../section2/SectionWrongQuize';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

// let config = require('zx-const')[process.env.NODE_ENV];

class ReportDetails extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        $('.zx-report-container-wrapper ').mCustomScrollbar({
            theme: 'minimal-dark',
            scrollInertia: 400,
            mouseWheel:{ scrollAmount: 200 }
        });
    }

    render() {
        let reportData = this.props.reportData;
        let contentSection;
        if (reportData) {
            contentSection = reportData.map((section, index) => {
                console.log(section);
                let SectionComponent = section.component;
                let sectionData = section.data;
                let sectionOptions = section.options;
                return <SectionComponent key={index} data={sectionData} options={sectionOptions} />
            });
        }

        // let contentTitle;
        // let contentBasicData;
        // let contentScoreData;
        // let contentDiffData;
        // let contentChlidrenBasic;
        // let contentStandardLevel;
        // let contentSchoolIndicatorsLvOne;
        // let contentWrongQuize;
        // let contentKnowlege;
        // let contentSkill;
        // let contentAbility;
        // if (reportData) {
        //     if (reportData.titleData) {
        //         contentTitle = <SectionReportTitle data={reportData.titleData}/>
        //     }
        //     if (reportData.basicData) {
        //         contentBasicData = <SectionReportBasicInfo data={reportData.basicData}/>
        //     }
        //     if (reportData.scoreData) {
        //         contentScoreData = <SectionReportScore data={reportData.scoreData}/>
        //     }
        //     if (reportData.diffData) {
        //         contentDiffData = <SectionReportScore data={reportData.diffData}/>
        //     }
        //     if (reportData.chlidrenBasicData) {
        //         contentChlidrenBasic = <SectionChildBasic data={reportData.chlidrenBasicData}/>;
        //     }
        //     if (reportData.standardLevelData) {
        //         contentStandardLevel = <SectionReportStandardLevel data={reportData.standardLevelData}/>;
        //     }
        //     if(reportData.knowledgeData){
        //         contentKnowlege = <SectionInclicatorsSystem inclicatorsSystemData={reportData.knowledgeData} />;
        //     }
        //     if(reportData.skillData){
        //         contentSkill = <SectionInclicatorsSystem inclicatorsSystemData={reportData.skillData} />;
        //     }
        //     if(reportData.abilityData){
        //         contentAbility = <SectionInclicatorsSystem inclicatorsSystemData={reportData.abilityData} />;
        //     }
        //     if (reportData.schoolIndicatorsData) {
        //         contentSchoolIndicatorsLvOne = <SectionChildIndicatorsLvOne data={reportData.schoolIndicatorsData}/>;
        //     }
        //     if (reportData.wrongQuize) {
        //         contentWrongQuize = <SectionWrongQuize data={reportData.wrongQuize}/>
        //     }
        // }
        return (
            <div className="zx-report-container-wrapper slideUp">
                <div className="zx-report-container-box">
                    <div className="zx-report-container">
                        {contentSection}
                    </div>
                </div>
            </div>
        )

    }
}

export default ReportDetails;