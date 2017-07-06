import React from 'react';
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
        let dataReportSubjectStats, contentReportSubjectStats, dataReportTotalStats, contentReportTotalStats,
            dataReportChartPieStats, contentReportChartPieStats;
        if (this.props.activeReportData) {
            dataReportSubjectStats = handleBlockReportSubjectStats(this.props.activeReportData);
            contentReportSubjectStats = <BlockReportSubjectStats data={dataReportSubjectStats} />
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
                    <h4>{this.props.userDisplayName}</h4>
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

export default DashBoardProject;