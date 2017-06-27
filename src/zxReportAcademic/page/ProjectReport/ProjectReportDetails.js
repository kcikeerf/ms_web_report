import React, {Component} from 'react';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import {BlockReportBasicInfo} from '../../component/BlockReportBasicInfo';
import {BlockReportScore} from '../../component/BlockReportScore';
import BlockChildrenBasic from '../../component/BlockChildrenBasic';

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
        if (reportData) {
            if (reportData.basicData) {
                contentBasicData = <BlockReportBasicInfo data={reportData.basicData} />
            }
            if (reportData.scoreData) {
                contentScoreData = <BlockReportScore data={reportData.scoreData} />
            }
            if (reportData.diffData) {
                contentDiffData = <BlockReportScore data={reportData.diffData} />
            }
            if(reportData.chlidrenBasicData) {
                contentChlidrenBasic  = <BlockChildrenBasic chlidrenBasicData = {reportData.chlidrenBasicData}/>;
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
            </div>
        )
    }
}

export default ProjectReportDetails;
