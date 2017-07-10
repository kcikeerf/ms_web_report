import React, {Component} from 'react';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import {SectionReportTitle} from '../../section/SectionReportTitle';
import {SectionReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {SectionReportScore} from '../../section/SectionReportScore';
import {SectionChildrenBasic} from '../../section/SectionChildrenBasic';
import {SectionInclicatorsSystem} from '../../section/SectionInclicatorsSystem';
import {SectionReportStandardLevel} from '../../section/SectionReportStandardLevel';
import {SectionSchoolIndicatorsLvOne} from '../../section/SectionSchoolIndicatorsLvOne';
import {SectionWrongQuize} from '../../section/SectionWrongQuize';

// let config = require('zx-const')[process.env.NODE_ENV];

class SchoolReportDetails extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        let reportData = this.props.reportData;
        let contentTitle;
        let contentBasicData;
        let contentScoreData;
        let contentDiffData;
        let contentChlidrenBasic;
        let contentStandardLevel;
        let contentKnowlege;
        let contentSkill;
        let contentAbility;
        let contentSchoolIndicatorsLvOne;
        let contentWrongQuize;

        if (reportData) {
            if (reportData.titleData) {
                contentTitle= <SectionReportTitle data={reportData.titleData}/>
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
            if (reportData.schoolIndicatorsData) {
                contentSchoolIndicatorsLvOne = <SectionSchoolIndicatorsLvOne data={reportData.schoolIndicatorsData}/>;
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
                <div className="row">
                    <div className="col s12">{contentBasicData}</div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col s12">{contentScoreData}</div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col s12">{contentDiffData}</div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col s12">{contentChlidrenBasic}</div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col s12">{contentStandardLevel}</div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col s12">{contentKnowlege}</div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col s12">{contentSkill}</div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col s12">{contentAbility}</div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col s12">{contentSchoolIndicatorsLvOne}</div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col s12">{contentWrongQuize}</div>
                </div>
                <div className="divider"></div>
            </div>
        )

    }
}

export default SchoolReportDetails;
