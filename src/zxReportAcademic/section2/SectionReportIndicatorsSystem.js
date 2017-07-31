import React, {Component} from 'react';

import ChartRadarDefault from '../component/ChartRadarDefault';
import ChartBarDefault from '../component/ChartBarDefault';
import TableIndicator from '../component/TableIndicator';
import ChartScatterDefault from '../component/ChartScatterDefault';
let config = require('zx-const')[process.env.NODE_ENV];

function chartRadarLvOne(data) {
    let chartRadarData = {
        keys: [],
        legend: [],
        data: []
    };
    let rawData = data.parentLv;
    rawData.unshift(data.selfLv);
    let keys = [],legend = [], datas = [];

    for (let i = 0; i < rawData.length; i++) {
        legend.push(rawData[i].label);
        let tmpData = [];
        let lvnData = rawData[i].data.lvOne;
        for(let j =0;j<lvnData.length;j++){
            if (i === 0) {
                keys.push(lvnData[j].checkpoint);
            }
            tmpData.push((lvnData[j].score_average_percent * 100).toFixed(2));
        }
        tmpData.reverse();
        datas.push({
            name: rawData[i].label,
            values: tmpData
        })
    }

    chartRadarData.keys = keys.reverse();
    chartRadarData.legend = legend;
    chartRadarData.data = datas;

    return chartRadarData;
}
function chartBarLvOne(data){
    let chartBarData = {
        title: null,
        legends: ['平均得分率', '中位数得分率', '分化度'],
        yData: [],
        inclicatorData: null,
        seriesData: []
    };
    let type = data.selfLv.type;
    let lvOneData = data.selfLv.data.lvOne;
    let inclicatorData = [], tmpDataAverage = [], tmDataMedian = [], tmDataDiffer = [];
    for(let i=0;i<lvOneData.length;i++){
        inclicatorData.push(lvOneData[i].checkpoint);
        tmpDataAverage.push((lvOneData[i].score_average_percent * 100).toFixed(2));
        tmDataMedian.push((lvOneData[i][`${type}_median_percent`] * 100).toFixed(2));
        if (type !== config.REPORT_TYPE_PUPIL) {
            tmDataDiffer.push((lvOneData[i].diff_degree).toFixed(2));
        }
    }
    let seriesAverage = {
        name: '平均得分率',
        type: 'bar',
        yIndex: 0,
        data: tmpDataAverage
    };
    let seriesMedian = {
        name: '中位数得分率',
        type: 'bar',
        yIndex: 0,
        data: tmDataMedian
    };
    let seriesDiffer = {
        name: '分化度',
        type: 'line',
        yIndex: 1,
        data: tmDataDiffer
    };

    let yDataObj = [
        {
            name: '平均得分率/\n中位数得分率',
            min: 0,
            max: 100,
            position: 'left',
            inverse: false
        },
        {
            name: '分化度',
            min: 0,
            max: 200,
            position: 'right',
            inverse: true,
            nameLocation: 'start'
        }
    ];

    chartBarData.yData = yDataObj;
    chartBarData.inclicatorData = inclicatorData;
    chartBarData.seriesData.push(seriesAverage);
    chartBarData.seriesData.push(seriesMedian);
    chartBarData.seriesData.push(seriesDiffer);

    return chartBarData;
}
function tableInclicatorsLvOne(data) {
    let inclicatorsLv1TableData = {
        reportType: null,
        tHeader: ['指标','平均得分率','中位数得分率','分化度'],
        tData: [],
        tAction: []
    };
    let type = data.selfLv.type;
    let lvOneData = data.selfLv.data.lvOne;

    let tmpTableData = [], tmpTableAction = [];
    let label, averageScorePercent, medianPerent, diffDegree;
    for (let i = 0; i < lvOneData.length; i++) {
        let arr = [];
        tmpTableAction.push(i);
        label = lvOneData[i].checkpoint;
        averageScorePercent = parseFloat(lvOneData[i].score_average_percent * 100).toFixed(2) + '%';
        medianPerent = parseFloat(lvOneData[i][`${type}_median_percent`] * 100).toFixed(2) + '%';
        arr.push(label);
        arr.push(averageScorePercent);
        arr.push(medianPerent);
        if (type !== config.REPORT_TYPE_PUPIL) {
            diffDegree = parseFloat(lvOneData[i].diff_degree).toFixed(2);
            arr.push(diffDegree);
        }
        tmpTableData.push(arr);
    }
    inclicatorsLv1TableData.reportType = type;
    inclicatorsLv1TableData.tData = tmpTableData;
    inclicatorsLv1TableData.tAction = tmpTableAction;

    return inclicatorsLv1TableData;
}

function chartScatterLvTwo(data) {
    let handleScatterData = {
        title: null,
        label: {
            x: '分化度',
            y: '平均得分率'
        },
        isInverse: {
            x: true,
            y: false
        },
        data: []
    };
    let type = data.selfLv.type;
    let lvTwoData = data.selfLv.data.lvTwo;
    let name,diff_degree,score_average_percent,valueArr=[];
    for(let i=0;i<lvTwoData.length;i++){
        let obj = {
            name: lvTwoData[i].checkpoint,
            value: []
        };
        diff_degree = lvTwoData[i].diff_degree;
        score_average_percent = lvTwoData[i].score_average_percent;
        obj.value.push(parseFloat(diff_degree).toFixed(2));
        obj.value.push((parseFloat(score_average_percent * 100).toFixed(2)));
        valueArr.push(obj);
    }

    handleScatterData.data.push(valueArr);

    return handleScatterData;
}

function tableInclicatorsLvTwo(data){
    let inclicatorsLv1TableData = {
        reportType: null,
        tHeader: ['指标','平均得分率','中位数得分率','分化度'],
        tData: [],
        tAction: []
    };
    let type = data.selfLv.type;
    let lvTwoData = data.selfLv.data.lvTwo;
    let tmpTableData = [], tmpTableAction = [];
    let name,diff_degree,score_average_percent,medianPerent;
    for(let i=0;i<lvTwoData.length;i++){
        let value = [];
        tmpTableAction.push(i);
        name = lvTwoData[i].checkpoint;
        diff_degree = lvTwoData[i].diff_degree;
        score_average_percent = lvTwoData[i].score_average_percent;
        medianPerent = lvTwoData[i][`${type}_median_percent`];
        value.push(name);
        value.push((parseFloat((`${score_average_percent}`) * 100).toFixed(2)) + '%');
        value.push(parseFloat(medianPerent * 100).toFixed(2) + '%');
        value.push(parseFloat(diff_degree).toFixed(2));
        tmpTableData.push(value);
    }

    inclicatorsLv1TableData.reportType = type;
    inclicatorsLv1TableData.tData = tmpTableData;
    inclicatorsLv1TableData.tAction = tmpTableAction;

    return inclicatorsLv1TableData;
}

class SectionReportIndicatorsSystem extends Component {

    render() {
        let id = this.props.id;
        let title = this.props.title;
        let data = this.props.data;

        let chartRadarLvOneData = chartRadarLvOne(data);
        let chartBarLvOneData = chartBarLvOne(data);
        let tableInclicatorsLvOneData = tableInclicatorsLvOne(data);
        let chartScatterLvTwoData = chartScatterLvTwo(data);
        let tableInclicatorsLvTwoData = tableInclicatorsLvTwo(data);
        return (
            <div id={id} className="zx-section-container">
                <div className="section">
                    <h2>{title}</h2>
                    <div className="row">
                        <div className="col s12">
                            <div className="zx-inclicators-System">
                                <h3>一级指标的表现情况</h3>
                                <ChartRadarDefault data={chartRadarLvOneData}/>
                                <h3>一级指标的平均得分率、中位数得分率和分化度</h3>
                                <ChartBarDefault data={chartBarLvOneData}/>
                                <h3>一级指标的数据表</h3>
                                <TableIndicator modalId={`zx-modal-${data.dimension}-lv1`} data={tableInclicatorsLvOneData}/>
                                <h3>二级指标的分型图</h3>
                                <ChartScatterDefault scatterData={chartScatterLvTwoData}/>
                                <h3>二级指标的数据表</h3>
                                <TableIndicator modalId={`zx-modal-${data.dimension}-lv2`} data={tableInclicatorsLvTwoData}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        )
    }
}

export default SectionReportIndicatorsSystem;