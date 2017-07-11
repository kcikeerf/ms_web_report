import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import handleAllEchartsResize from 'zx-chart/handleAllEchartsResize';

import {handleBlockReportSubjectStats, BlockReportSubjectStats} from './BlockReportSubjectStats';
import {handleBlockChartPie, BlockReportChartPieStats} from './BlockReportChartPieStats';
import {handleBlockReportNumTotal, BlockReportTotalStats} from './BlockReportTotalStats';


//let config = require('zx-const')[process.env.NODE_ENV];

class DashBoardProject extends React.Component {
    constructor() {
        super();
        this.state = {
            reportList: null
        }
    }
    componentDidMount() {
        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
        });

        handleAllEchartsResize();

    }

    render() {
        let dataReportSubjectStats,
            contentReportSubjectStats,
            dataReportTotalStats,
            contentReportTotalStats,
            dataReportChartPieStats,
            contentReportChartPieStats;
        let dataUser = {
            userName: this.props.userName,
            userRole: this.props.userRole
        };
        if (this.props.testSubjectData) {
            dataReportSubjectStats = handleBlockReportSubjectStats(this.props.testSubjectData);
            contentReportSubjectStats = <BlockReportSubjectStats
                user={dataUser}
                data={dataReportSubjectStats}
                handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
            />
        }

        if (this.props.dataReportTotalStats) {
            dataReportTotalStats = handleBlockReportNumTotal(this.props.dataReportTotalStats);
            contentReportTotalStats = <BlockReportTotalStats data={dataReportTotalStats}/>;
        }

        if (this.props.pieData) {
            dataReportChartPieStats = handleBlockChartPie(this.props.pieData);
            contentReportChartPieStats = <BlockReportChartPieStats data={dataReportChartPieStats}/>;
        }


        return (
            <div id={'zx-'+ this.props.userName} className="zx-dashboard-content" ref={(div) => {this.div = div}}>

                <div className="zx-dashboard-header">
                    <h2>{this.props.userDisplayName}</h2>
                    <div className="divider"></div>
                </div>
                <div className="zx-dashboard-body">
                    <div className="row">
                        {contentReportTotalStats}
                        <div className="col s12 m12 l6 xl6">
                            <div className="z-depth-1">
                                {contentReportChartPieStats}
                            </div>
                        </div>
                    </div>
                    {contentReportSubjectStats}
                </div>
            </div>

        )
    }
}

DashBoardProject.contextTypes = {
    handleReportIframeShow: PropTypes.func
};

export default DashBoardProject;