import React, {Component} from 'react';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import {SectionReportBasicInfo} from '../../section/SectionReportBasicInfo';
import {SectionReportScore} from '../../section/SectionReportScore';
import {SectionChildrenBasic} from '../../section/SectionChildrenBasic';
import {SectionInclicatorsSystem} from '../../section/SectionInclicatorsSystem';
import {SectionReportStandardLevel} from '../../section/SectionReportStandardLevel';
import {SectionWrongQuize} from '../../section/SectionWrongQuize';

let config = require('zx-const')[process.env.NODE_ENV];

class ProjectReportDetails extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let reportData = this.props.reportData;
        let contentBasicData;
        let contentScoreData;
        let contentDiffData;
        let contentChlidrenBasic;
        let contentInclicatorsSystem;
        let contentStandardLevel;
        let contentWrongQuize;
        if (reportData) {
            if (reportData.basicData) {
                contentBasicData = <SectionReportBasicInfo data={reportData.basicData} />
            }
            if (reportData.scoreData) {
                contentScoreData = <SectionReportScore data={reportData.scoreData} />
            }
            if (reportData.diffData) {
                contentDiffData = <SectionReportScore data={reportData.diffData} />
            }
            if(reportData.chlidrenBasicData) {
                contentChlidrenBasic  = <SectionChildrenBasic data = {reportData.chlidrenBasicData}/>;
            }
            if(reportData.standardLevelData) {
                contentStandardLevel  = <SectionReportStandardLevel data = {reportData.standardLevelData}/>;
            }
            if(reportData.inclicatorsSystemData){
                contentInclicatorsSystem = <SectionInclicatorsSystem inclicatorsSystemData = {reportData.inclicatorsSystemData}/>
            }
            if(reportData.wrongQuize){
                contentWrongQuize = <SectionWrongQuize data = {reportData.wrongQuize}/>
            }
        }

        return (
            <div className="zx-report-container">
                <h1>项目报告</h1>
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
                    <div className="col s12">{contentInclicatorsSystem}</div>
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

export default ProjectReportDetails;
