import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import handleAllEchartsResize from 'zx-chart/handleAllEchartsResize';

import {handleBlockReportSubjectStats, BlockReportSubjectStats} from './BlockReportSubjectStats';
import {handleBlockChartPie, BlockReportChartPieStats} from './BlockReportChartPieStats';
import {handleBlockReportNumTotal, BlockReportTotalStats} from './BlockReportTotalStats';


//let config = require('zx-const')[process.env.NODE_ENV];

export class DashBordAreaProject extends React.Component {
    constructor() {
        super();
        this.state = {
            reportList: null
        }
    }


    render() {
        let data = this.props.data
        let heading = this.props.userDisplayName ? `${this.props.userDisplayName}的测评数据中心` : '测评数据中心';
        let contentReportSubjectStats;
        if(data){
            let dataReportSubjectStats = handleBlockReportSubjectStats(data);
            contentReportSubjectStats = <BlockReportSubjectStats
                user={this.props.dataUser}
                data={dataReportSubjectStats}
                handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
            />
        }
        return (
            <div id={'zx-'+ this.props.userName} className="zx-dashboard-content" ref={(div) => {this.div = div}}>

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
                    </div>
                </div>
            </div>

        )
    }

    handle(){

    }
}

DashBordAreaProject.contextTypes = {
    handleReportIframeShow: PropTypes.func
};

export function handleDashBord(data) {

}