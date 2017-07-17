import React, {Component} from 'react';
// import $ from 'jquery';

import ChartRadarDefault from '../component/ChartRadarDefault';
import ChartBarDefault from '../component/ChartBarDefault';
import TableDefault from '../component/TableDefault';
import ChartScatterDefault from '../component/ChartScatterDefault';
let config = require('zx-const')[process.env.NODE_ENV];

//一直指标的block
class BlockInclicatorsLvOneSystem extends Component {

    render() {
        let data = this.props.data;
        let chartRadarLvOneData = data.chartRadarInclicatorsLvOneData;
        let chartBarLvOneData = data.chartBarInclicatorsLvOneData;
        let tableInclicatorsLvOneData = data.tableInclicatorsLvOneData;

        return (
            <div className="zx-inclicators-System-one">
                <h3>一级指标的表现情况</h3>
                <ChartRadarDefault data={chartRadarLvOneData}/>
                <h3>一级指标的平均得分率、中位数得分率和分化度</h3>
                <ChartBarDefault data={chartBarLvOneData}/>
                <h3>一级指标的数据表</h3>
                <TableDefault data={tableInclicatorsLvOneData}/>
            </div>
        )
    }
}

//二级指标的block
class BlockInclicatorsLvTwoSystem extends Component {

    render() {
        let data = this.props.data;
        let chartScatterLvTwoData = data.chartScatterInclicatorsLvTwoData;
        let tableInclicatorsLvTwoData = data.tableInclicatorsLvTwoData;
        return (
            <div className="zx-inclicators-System-two">
                <h3>二级指标的分形图</h3>
                <ChartScatterDefault scatterData={chartScatterLvTwoData}/>
                <h3>二级指标的数据表</h3>
                <TableDefault data={tableInclicatorsLvTwoData}/>
            </div>
        )
    }
}

//处理一级指标表格的方法
export function handleTableInclicatorsLv1Data(reportType, header, minData, otherData) {
    //TODO@ otherData 暂时没有做处理

    let inclicatorsLv1TableData = {
        reportType: reportType,
        tHeader: [],
        tData: []
    };
    let lvnData = minData.lv_n;
    let tmpTableData = [];
    for (let i = 0; i < lvnData.length; i++) {
        let label, averageScorePercent, medianPerent, diffDegree;
        let arr = [];
        for (let index in lvnData[i]) {
            let lvnObj = lvnData[i][index];
            label = lvnObj.checkpoint;
            averageScorePercent = parseFloat(lvnObj.score_average_percent * 100).toFixed(2) + '%';
            medianPerent = parseFloat(lvnObj[`${reportType}_median_percent`] * 100).toFixed(2);
            arr.push(label);
            arr.push(averageScorePercent);
            arr.push(medianPerent);
            if (reportType !== config.REPORT_TYPE_PUPIL) {
                diffDegree = parseFloat(lvnObj.diff_degree).toFixed(2);
                arr.push(diffDegree);
            }
        }
        tmpTableData.push(arr);
    }
    inclicatorsLv1TableData.tHeader = header;
    inclicatorsLv1TableData.tData = tmpTableData;

    return inclicatorsLv1TableData;
}

//处理一级指标柱状图的方法
export function handleChartBarInclicatorsLv1Data(reportType, titles, knowledgeData) {

    let chartBarData = {
        title: titles,
        legends: ['平均得分率', '中位数得分率', '分化度'],
        yData: [],
        inclicatorData: null,
        seriesData: []
    };

    let inclicatorData = [], tmpDataAverage = [], tmDataMedian = [], tmDataDiffer = [];
    let lvnData = knowledgeData.lv_n;
    for (let j = 0; j < lvnData.length; j++) {
        for (let index in lvnData[j]) {
            let lvnObj = lvnData[j][index];
            inclicatorData.push(lvnObj.checkpoint);
            tmpDataAverage.push((lvnObj.score_average_percent * 100).toFixed(2));
            tmDataMedian.push((lvnObj[`${reportType}_median_percent`] * 100).toFixed(2));
            if (reportType !== config.REPORT_TYPE_PUPIL) {
                tmDataDiffer.push((lvnObj.diff_degree).toFixed(2));
            }
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
    ]

    chartBarData.yData = yDataObj;
    chartBarData.inclicatorData = inclicatorData;
    chartBarData.seriesData.push(seriesAverage);
    chartBarData.seriesData.push(seriesMedian);
    chartBarData.seriesData.push(seriesDiffer);

    return chartBarData;
}

//处理一级指标雷达图的方法
export function handleChartRadarInclicatorsLv1Data(reportType, legends, minData, dimension, otherReportData) {
    let chartRadarData = {
        keys: [],
        legend: [],
        data: []
    };
    let rawData = [];
    //主要数据
    rawData.push(minData.data[dimension]);

    //其他数据
    if (otherReportData.length > 0) {
        //先排序
        otherReportData.sort(function (x, y) {
            let val1 = Number(x.order);
            let val2 = Number(y.order);
            return val1 > val2;
        })

        for (let i = 0; i < otherReportData.length; i++) {
            rawData.push(otherReportData[i].data.data[dimension]);
        }
    }

    let keys = [], data = [];
    for (let i = 0; i < rawData.length; i++) {
        let tmpData = [];
        let lvnData = rawData[i].lv_n;

        for (let j = 0; j < lvnData.length; j++) {
            for (let index in lvnData[j]) {
                let lvnObj = lvnData[j][index];
                if (i === 0) {
                    keys.push(lvnObj.checkpoint);
                }
                tmpData.push((lvnObj.score_average_percent * 100).toFixed(2));
            }
        }
        data.push({
            name: legends[i],
            values: tmpData
        })
    }

    chartRadarData.keys = keys;
    chartRadarData.legend = legends;
    chartRadarData.data = data;

    return chartRadarData;
}

//处理各维度二级指标表格
export function handletableInclicatorsLvTwoData(reportType, header, minData, otherData) {
    //TODO@ otherData 暂时没有做处理

    let inclicatorsLv1TableData = {
        reportType: reportType,
        tHeader: [],
        tData: []
    };
    let lvnData = minData.lv_n;
    let tmpTableData = [];

    // @TODO: map要返回值，而不是只是循环
    lvnData.map((item, index) => {
        for (let i in item) {
            item[i].items.map((item, index) => {
                let value = [];
                for (let i in item) {
                    let name = item[i].checkpoint;
                    let diff_degree = item[i].diff_degree;
                    let score_average_percent = item[i].score_average_percent;
                    let medianPerent = item[i][`${reportType}_median_percent`];
                    value.push(name);
                    value.push((parseFloat((`${score_average_percent}`) * 100).toFixed(2)));
                    value.push(parseFloat(medianPerent * 100).toFixed(2));
                    value.push(parseFloat(diff_degree).toFixed(2));
                }
                tmpTableData.push(value)
            });
        }
    });
    inclicatorsLv1TableData.tHeader = header;
    inclicatorsLv1TableData.tData = tmpTableData;

    return inclicatorsLv1TableData;
}

//处理各维度二级指标散点图
export function handleScatterInclicatorsLvTwoData(reportType, title, data) {
    let dataArr = [];
    let valueArr = [];
    let handleScatterData = {
        title: title,
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
    data.lv_n.map((item, index) => {
        for (let i in item) {
            item[i].items.map((item, index) => {
                for (let i in item) {
                    let name = item[i].checkpoint;
                    let diff_degree = item[i].diff_degree;
                    let score_average_percent = item[i].score_average_percent;
                    let value = [];
                    value.push(parseFloat(diff_degree).toFixed(2));
                    value.push((parseFloat((`${score_average_percent}`) * 100).toFixed(2)));
                    valueArr.push({name, value});
                }
            })
        }
    });
    dataArr.push(valueArr);

    handleScatterData.data = dataArr;
    return handleScatterData;
}

//各维度的block
export class SectionInclicatorsSystem extends Component {

    render() {
        let inclicatorsSystemData = this.props.inclicatorsSystemData;
        let dimension = inclicatorsSystemData.dimension;
        let containerID = `zx-report-indicator-${dimension}-lv1`;
        return (
            <div id={containerID} className="zx-section-container scrollspy">
                <div className="section">
                    <h2>{inclicatorsSystemData.dimensionTitle}维度的表现情况</h2>
                    <div className="row">
                        <div className="col s12">
                            <div className="zx-inclicators-System">
                                <BlockInclicatorsLvOneSystem data={inclicatorsSystemData}/>
                                <BlockInclicatorsLvTwoSystem data={inclicatorsSystemData}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>

        )
    }
}