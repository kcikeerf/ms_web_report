import React from 'react';
import $ from 'jquery';

import handleAllEchartsResize from 'zx-chart/handleAllEchartsResize';

import {handleBlockReportSubjectStats, BlockReportSubjectStats} from './BlockReportSubjectStats';

import ChartPieDefault from '../ChartPieDefault';

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
        let dataReportSubjectStats, contentReportSubjectStats;
        if (this.props.activeReportData) {
            dataReportSubjectStats = handleBlockReportSubjectStats(this.props.activeReportData);
            contentReportSubjectStats = <BlockReportSubjectStats data={dataReportSubjectStats} />
        }


        let contentChartPie = <ChartPieDefault />;

        return (
            <div id={'zx-'+ this.props.userName} className="zx-dashboard-content" ref={(div) => {this.div = div}}>

                <div className="zx-dashboard-header">
                    <h4>{this.props.userDisplayName}</h4>
                    <div className="divider"></div>
                </div>
                <div className="zx-dashboard-body">
                    <div className="row">
                        <div className="col s12 m12 l6 xl6">
                            <div className="zx-summary-numb-box z-depth-1">
                                <div className="zx-summary-numb-box-header">
                                    <i className="material-icons zx-summary-numb-box-icon zx-summary-numb-box-color">group_work</i>
                                    <div className="zx-summary-numb-box-subject zx-summary-numb-box-color">总数</div>
                                </div>
                                <div className="zx-summary-numb-box-body zx-summary-numb-box-color">
                                    <div className="zx-summary-numb-box-subcontent">
                                        <i className="material-icons">trending_up</i>
                                        <span>最近新增</span>
                                    </div>
                                    <div className="zx-summary-numb-box-content">300,000</div>
                                    <div className="zx-summary-numb-box-subcontent">份报告</div>
                                    <div className="divider"></div>
                                    <div className="zx-summary-numb-box-content" style={{'fontSize':'28px'}}>300,000</div>
                                    <div className="zx-summary-numb-box-subcontent">份报告</div>
                                </div>
                                <div className="zx-summary-numb-box-footer zx-summary-numb-box-color">查看详细信息</div>
                            </div>
                        </div>
                        <div className="col s12 m12 l6 xl6">
                            <div className="z-depth-1">{contentChartPie}</div>
                        </div>
                    </div>
                    {contentReportSubjectStats}

                </div>
            </div>

        )
    }
}

export default DashBoardProject;