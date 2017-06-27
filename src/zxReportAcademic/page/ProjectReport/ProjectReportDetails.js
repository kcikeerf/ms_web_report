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
        if (reportData) {
            if (reportData.basicData) {
                contentBasicData = <BlockReportBasicInfo data={reportData.basicData} />
            }
            if (reportData.scoreData) {
                contentScoreData = <BlockReportScore data={reportData.scoreData} />
            }
        }

        let chlidrenBasicContent;
        if(reportData){
            let chlidrenBasicData = reportData.chlidrenBasicData;
            if(chlidrenBasicData){
                chlidrenBasicContent  = <BlockChildrenBasic chlidrenBasicData = {chlidrenBasicData}/>;
            }
        }




        return (
            <div className="zx-report-container">
                <h1>项目报告</h1>
                {contentBasicData}
                {contentScoreData}
                {chlidrenBasicContent}
            </div>
        )
    }
}

export default ProjectReportDetails;
