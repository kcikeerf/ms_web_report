import React from 'react';
import $ from 'jquery';

import handleTableRecentReport from './handleTableRecentReport';
import handleAllEchartsResize from 'zx-chart/handleAllEchartsResize';
import TableDefault from '../TableDefault';
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

        if (this.props.id === 0) {
            $(this.div).addClass('show');
            $(this.div).siblings().removeClass('show');
        }

        handleAllEchartsResize();

    }

    render() {
        let reportChinese = handleTableRecentReport(this.props.activeReportData.reportChinese);
        let contentTableReportChinese = <TableDefault tHeader={reportChinese.tHeader} tData={reportChinese.tData}/>;
        let reportMath = handleTableRecentReport(this.props.activeReportData.reportMath);
        let contentTableReportMath = <TableDefault tHeader={reportMath.tHeader} tData={reportMath.tData}/>;
        let reportEnglish = handleTableRecentReport(this.props.activeReportData.reportEnglish);
        let contentTableReportEnglish = <TableDefault tHeader={reportEnglish.tHeader} tData={reportEnglish.tData}/>;

        let contentChartPie = <ChartPieDefault />;

        return (
            <div id={'zx-'+ this.props.userName} className="zx-dashboard-content z-depth-1" ref={(div) => {this.div = div}}>

                <div className="zx-dashboard-header">
                    <h4>{this.props.userDisplayName}</h4>
                    <div className="divider"></div>
                </div>
                <div className="zx-dashboard-body">
                    <div className="row">
                        <div className="col s12 m12 l6 xl6">
                            <div className="zx-summary-numb-box red lighten-2">
                                <div className="zx-summary-numb-box-header">
                                    <i className="material-icons zx-summary-numb-box-icon">group_work</i>
                                    <div className="zx-summary-numb-box-subject">总数</div>
                                </div>
                                <div className="zx-summary-numb-box-body">
                                    <div className="zx-summary-numb-box-content">300,000</div>
                                    <div className="zx-summary-numb-box-subcontent">份报告</div>
                                    <div className="divider"></div>
                                    <div className="zx-summary-numb-box-subcontent">
                                        <i className="material-icons">trending_up</i>
                                        <span>最近新增</span>
                                    </div>
                                    <div className="zx-summary-numb-box-content">300,000</div>
                                    <div className="zx-summary-numb-box-subcontent">份报告</div>

                                </div>
                                <div className="zx-summary-numb-box-footer">查看详细信息</div>
                            </div>
                        </div>
                        <div className="col s12 m12 l6 xl6">
                            {contentChartPie}
                        </div>

                    </div>
                    <div className="row">
                        <div className="col s12 m12 l12 xl4">
                            <div className="card">
                                <div className="card-header">
                                    <div className="zx-summary-numb-box cyan darken-2">
                                        <div className="zx-summary-numb-box-header">
                                            <i className="material-icons zx-summary-numb-box-icon">group_work</i>
                                            <div className="zx-summary-numb-box-subject">语文</div>
                                        </div>
                                        <div className="zx-summary-numb-box-body">
                                            <div className="zx-summary-numb-box-content">100,000</div>
                                            <div className="zx-summary-numb-box-subcontent">份报告</div>
                                            <div className="divider"></div>
                                            <div className="zx-summary-numb-box-subcontent">
                                                <i className="material-icons">trending_up</i>
                                                <span>最近新增</span>
                                            </div>
                                            <div className="zx-summary-numb-box-content">100,000</div>
                                            <div className="zx-summary-numb-box-subcontent">份报告</div>
                                        </div>
                                        <div className="zx-summary-numb-box-footer">查看详细信息</div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="zx-recent-report-container">
                                        {contentTableReportChinese}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m12 l12 xl4">
                            <div className="card">
                                <div className="card-header">
                                    <div className="zx-summary-numb-box blue-grey">
                                        <div className="zx-summary-numb-box-header">
                                            <i className="material-icons zx-summary-numb-box-icon">group_work</i>
                                            <div className="zx-summary-numb-box-subject">数学</div>
                                        </div>
                                        <div className="zx-summary-numb-box-body">
                                            <div className="zx-summary-numb-box-content">100,000</div>
                                            <div className="zx-summary-numb-box-subcontent">份报告</div>
                                            <div className="divider"></div>
                                            <div className="zx-summary-numb-box-subcontent">
                                                <i className="material-icons">trending_up</i>
                                                <span>最近新增</span>
                                            </div>
                                            <div className="zx-summary-numb-box-content">100,000</div>
                                            <div className="zx-summary-numb-box-subcontent">份报告</div>
                                        </div>
                                        <div className="zx-summary-numb-box-footer">查看详细信息</div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="zx-recent-report-container">
                                        {contentTableReportMath}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m12 l12 xl4">
                            {/*<h5 className="zx-header-highlight zx-header-highlight-cyan">英语</h5>*/}
                            <div className="card">
                                <div className="card-header">
                                    <div className="zx-summary-numb-box brown lighten-2">
                                        <div className="zx-summary-numb-box-header">
                                            <i className="material-icons zx-summary-numb-box-icon">group_work</i>
                                            <div className="zx-summary-numb-box-subject">英语</div>
                                        </div>
                                        <div className="zx-summary-numb-box-body">
                                            <div className="zx-summary-numb-box-content">100,000</div>
                                            <div className="zx-summary-numb-box-subcontent">份报告</div>
                                            <div className="divider"></div>
                                            <div className="zx-summary-numb-box-subcontent">
                                                <i className="material-icons">trending_up</i>
                                                <span>最近新增</span>
                                            </div>
                                            <div className="zx-summary-numb-box-content">100,000</div>
                                            <div className="zx-summary-numb-box-subcontent">份报告</div>
                                        </div>
                                        <div className="zx-summary-numb-box-footer">查看详细信息</div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="zx-recent-report-container">
                                        {contentTableReportEnglish}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default DashBoardProject;