import React, {Component} from 'react';
import $ from 'jquery';


export function handleBlockReportNumTotal(data, options) {
    let totalStats = {
        totalNmu: [],
        increaseNum: []
    };
    totalStats.totalNmu = data.total;
    totalStats.increaseNum = data.increase;
    return totalStats
}

export class BlockReportTotalStats extends Component {
    render() {
        let data = this.props.data;
        let contentNumTotal;
        contentNumTotal = <div className="zx-summary-numb-box z-depth-1">
            <div className="zx-summary-numb-box-header">
                <i className="material-icons zx-summary-numb-box-icon zx-summary-numb-box-color">group_work</i>
                <div className="zx-summary-numb-box-subject zx-summary-numb-box-color">总数</div>
            </div>
            <div className="zx-summary-numb-box-body zx-summary-numb-box-color">
                <div className="zx-summary-numb-box-subcontent">
                    <i className="material-icons">trending_up</i>
                    <span>最近新增</span>
                </div>
                <div className="zx-summary-numb-box-content-increase">{data.increaseNum}</div>
                <div className="zx-summary-numb-box-subcontent">份报告</div>
                <div className="divider"></div>
                <div className="zx-summary-numb-box-content-total">{data.totalNmu}</div>
                <div className="zx-summary-numb-box-subcontent">份报告</div>
            </div>
            {/*
             <div className="zx-summary-numb-box-footer zx-summary-numb-box-color">查看详细信息</div>
            */}
        </div>;


        return (
            <div className="col s12 m12 l6 xl6">
                {contentNumTotal}
            </div>
        )
    }
}