import React, {Component} from 'react';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';


import {BlockReportBasicInfo} from '../../component/BlockReportBasicInfo';
import {BlockReportScore} from '../../component/BlockReportScore';

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

        return (
            <div className="zx-report-container">
                <h1>项目报告</h1>
                {contentBasicData}
                {contentScoreData}
            </div>
        )
    }
}

export default ProjectReportDetails;
