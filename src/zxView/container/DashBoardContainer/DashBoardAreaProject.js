import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import handleAllEchartsResize from 'zx-chart/handleAllEchartsResize';

import {handleBlockReportSubjectStats, BlockReportSchoolStats} from './BlockReportSchoolStats';
import {handleBlockReportSchoolBase, BlockReportSchoolBase} from './BlockReportSchoolBase';
import DashbordChildTable from './DashbordChildTable';

//let config = require('zx-const')[process.env.NODE_ENV];

export class DashBordAreaProject extends React.Component {
    constructor() {
        super();
        this.state = {
            reportList: null
        }
    }

    render() {
        let data = this.props.data;
        let heading = this.props.userDisplayName ? `${this.props.userDisplayName}的测评数据中心` : '测评数据中心';
        let contentReportSubjectStats;
        let contentReportSchoolBase;
        if(data){
            let dataReportSubjectStats = handleBlockReportSubjectStats(data);
            contentReportSubjectStats = <BlockReportSchoolStats
                user={this.props.dataUser}
                data={dataReportSubjectStats}
                handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
            />;

            let dataReportSchoolBase = handleBlockReportSchoolBase(data);
            contentReportSchoolBase = <BlockReportSchoolBase data={dataReportSchoolBase} />
        }
        return (
            <div id={'zx-'+ this.props.dataUser.userName} className="zx-dashboard-content" ref={(div) => {this.div = div}}>

                <div className="zx-dashboard-header-container">
                    <h2 className="zx-dashboard-header">
                        <i className="material-icons">assessment</i>
                        <span>{heading}</span>
                    </h2>
                    <div className="divider"></div>
                </div>
                <div className="zx-dashboard-body">
                    <div className="row">
                        {contentReportSubjectStats}
                        <div className="col s12 m12">
                            {contentReportSchoolBase}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

DashBordAreaProject.contextTypes = {
    handleReportIframeShow: PropTypes.func
};
