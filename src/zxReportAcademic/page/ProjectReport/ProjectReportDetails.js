import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import getCookie from 'zx-misc/getCookie';

import {BlockReportBasicInfo} from '../../component/BlockReportBasicInfo';

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
        if (reportData) {
            if (reportData.basicData) {
                contentBasicData = <BlockReportBasicInfo data={reportData.basicData} />
            }
        }

        return (
            <div className="zx-report-container">
                <h1>项目报告</h1>
                {contentBasicData}
            </div>
        )
    }
}

export default ProjectReportDetails;
