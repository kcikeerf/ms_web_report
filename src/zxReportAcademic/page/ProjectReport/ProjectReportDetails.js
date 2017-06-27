import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import getCookie from 'zx-misc/getCookie';

import {BlockReportBasicInfo} from '../../component/BlockReportBasicInfo';
import {BlockChildrenBaseTable} from '../../component/BlockChildrenBaseTable';

 
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

        //学校基本信息
        let  contentSchoolBaseTableDefault;
        if(reportData){
            if(reportData.schoolBasicData){
                contentSchoolBaseTableDefault  = <BlockChildrenBaseTable tHeader={reportData.schoolBasicData.header} tData={reportData.schoolBasicData.data}/>;
            }
        }


        return (
            <div className="zx-report-container">
                <h1>项目报告</h1>
                {contentBasicData}
                {contentSchoolBaseTableDefault}
            </div>
        )
    }
}

export default ProjectReportDetails;
