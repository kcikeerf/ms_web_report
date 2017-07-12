import React, {Component} from 'react';
import ChartRadarDefault from '../component/ChartRadarDefault';
import TableDefault from '../component/TableDefault';
let config = require('zx-const')[process.env.NODE_ENV];

class BlockInclicatorsLvOneSystem extends Component {

    render() {
        let data = this.props.data;
        let chartRadarLvOneData = data.chartRadarInclicatorsLvOneData;
        let tableInclicatorsLvOneData = data.tableInclicatorsLvOneData;
        return (
            <div className="zx-inclicators-System-one">
                <h3>一级指标的表现情况</h3>
                <ChartRadarDefault data={chartRadarLvOneData}/>
                <h3>一级指标的数据表</h3>
                <TableDefault data={tableInclicatorsLvOneData}/>
            </div>
        )
    }
}
class BlockInclicatorsLvTwoSystem extends Component {

    render() {
        let data = this.props.data;
        let tableInclicatorsLvTwoData = data.tableInclicatorsLvTwoData;
        return (
            <div className="zx-inclicators-System-two">
                <h3>二级指标的数据表</h3>
                <TableDefault data={tableInclicatorsLvTwoData}/>
            </div>
        )
    }
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
                tmpData.push((lvnObj.weights_score_average_percent * 100).toFixed(2));
            }
        }
        data.push({
            name: legends[i],
            values: tmpData
        })
    }

    chartRadarData.keys = keys.reverse();
    chartRadarData.legend = legends;
    chartRadarData.data = data;

    return chartRadarData;
}
//一级指标表格数据
export function handleTableInclicatorsLv1Data(reportType, header,minData, dimension, otherReportData){
    let inclicatorsLv1TableData = {
        reportType: reportType,
        tHeader: [],
        tData: []
    };
    //主要数据
    let rawData = minData.data[dimension];
    let otherData=[];
    //其他数据
    if (otherReportData.length > 0) {
        //先排序
        otherReportData.sort(function (x, y) {
            let val1 = Number(x.order);
            let val2 = Number(y.order);
            return val1 < val2;
        })

        for (let i = 0; i < otherReportData.length; i++) {
            otherData.push(otherReportData[i].data.data[dimension]);
        }
    }
    let tmpData = [];
    for(let i=0;i<rawData.lv_n.length;i++){
        let labelData = [];
        let checkpoint,min_score_average_percent;
        for (let index in rawData.lv_n[i]) {
            checkpoint = rawData.lv_n[i][index].checkpoint;
            min_score_average_percent = (rawData.lv_n[i][index].weights_score_average_percent * 100).toFixed(2);
        }
        labelData.push(checkpoint);
        labelData.push(min_score_average_percent);

        for(let j=0;j<otherData.length;j++){
            let score_percent;
            for (let index in otherData[j].lv_n[i]) {
                let lvnObj = otherData[j].lv_n[i][index];
                score_percent = (lvnObj.weights_score_average_percent * 100).toFixed(2);
            }
            labelData.push(score_percent);
        }
        tmpData.push(labelData);
    }

    inclicatorsLv1TableData.tHeader = header;
    inclicatorsLv1TableData.tData = tmpData;

    return inclicatorsLv1TableData;
}

//二级指标表格数据
export function handleTableInclicatorsLv2Data(reportType, header, minData, dimension, otherReportData){
    let inclicatorsLv1TableData = {
        reportType: reportType,
        tHeader: [],
        tData: []
    };
    //主要数据
    let rawData = minData.data[dimension];
    let rawDataArr = getNextLevel(rawData.lv_n);
    let otherDataArr=[];
    //其他数据
    if (otherReportData.length > 0) {
        //先排序
        otherReportData.sort(function (x, y) {
            let val1 = Number(x.order);
            let val2 = Number(y.order);
            return val1 < val2;
        })

        for (let i = 0; i < otherReportData.length; i++) {
            let otherData = otherReportData[i].data.data[dimension].lv_n;
            let otherDatas = getNextLevel(otherData);
            otherDataArr.push(otherDatas);
        }
    }

    console.log(otherDataArr);
    function getNextLevel(preLevelData) {
        let nextLevelData = [];
        for (let index in preLevelData) {
            let preLevelItem = preLevelData[index];
            let nextLevelItems = preLevelItem[Object.keys(preLevelItem)[0]].items;
            nextLevelData = nextLevelData.concat(nextLevelItems);
        }
        return nextLevelData;
    }

    let tmpData = [];
    for(let i=0;i<rawDataArr.length;i++){
        let labelData = [];
        let checkpoint,min_score_average_percent;
        for (let index in rawDataArr[i]) {
            checkpoint = rawDataArr[i][index].checkpoint;
            min_score_average_percent = (rawDataArr[i][index].weights_score_average_percent * 100).toFixed(2);
        }
        labelData.push(checkpoint);
        labelData.push(min_score_average_percent);

        for(let j=0;j<otherDataArr.length;j++){
            let score_percent;
            for (let index in otherDataArr[j][i]) {
                let lvnObj = otherDataArr[j][i][index];
                score_percent = (lvnObj.weights_score_average_percent * 100).toFixed(2);
            }
            labelData.push(score_percent);
        }
        tmpData.push(labelData);
    }

    inclicatorsLv1TableData.tHeader = header;
    inclicatorsLv1TableData.tData = tmpData;

    return inclicatorsLv1TableData;
}


export class SectionStudentInclicatorsSystem extends Component {

    render() {
        let inclicatorsSystemData = this.props.inclicatorsSystemData;
        console.log(this.props);
        let dimention = inclicatorsSystemData.dimention;
        let containerID = `zx-report-indicator-${dimention}-lv1`;
        return (
            <div id={containerID} className="zx-section-container">
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