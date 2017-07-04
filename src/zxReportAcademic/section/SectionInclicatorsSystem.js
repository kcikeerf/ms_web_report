import React, {Component} from 'react';
import ChartRadarDefault from '../component/ChartRadarDefault';
import ChartBarDefault from '../component/ChartBarDefault';
import TableDefault from '../component/TableDefault';

class BlockInclicatorsSystem extends Component{

    render() {
        let data = this.props.data;
        let chartRadarLv1Data = data.chartRadarInclicatorsLv1Data;
        let chartBarLv1Data = data.chartBarInclicatorsLv1Data;
        let tableInclicatorsLv1Data = data.tableInclicatorsLv1Data;
        return (
            <div>
                <ChartRadarDefault data = {chartRadarLv1Data}/>
                <ChartBarDefault data = {chartBarLv1Data}/>
                <TableDefault data = {tableInclicatorsLv1Data}/>
            </div>
        )
    }

}
export function handleTableInclicatorsLv1Data(reportType,header, minData, otherData) {
    //TODO@ otherData 暂时没有做处理
    console.log(minData);
    let inclicatorsLv1TableData={
        reportType: reportType,
        tHeader: [],
        tData: []
    };
    let lvnData = minData.lv_n;
    let tmpTableData = [];
    for (let i = 0; i < lvnData.length; i++) {
        let label,averageScore,averageScorePercent, diffDegree;
        let arr = [];
        for (let index in lvnData[i]) {
            let lvnObj = lvnData[i][index];
            label = lvnObj.checkpoint;
            averageScore = parseFloat(lvnObj.score_average).toFixed(2);
            averageScorePercent = parseFloat(lvnObj.score_average_percent*100).toFixed(2)+'%';
            diffDegree = parseFloat(lvnObj.diff_degree).toFixed(2);

            arr.push(label);
            arr.push(averageScore);
            arr.push(averageScorePercent);
            arr.push(diffDegree);
        }
        tmpTableData.push(arr);
    }
    inclicatorsLv1TableData.tHeader = header;
    inclicatorsLv1TableData.tData = tmpTableData;

    return inclicatorsLv1TableData;
}
export function handleChartBarInclicatorsLv1Data(reportType, titles  ,knowledgeData) {
    let chartBarData = {
        title:titles,
        legends:['平均分','中位数','分化度'],
        yData:[],
        inclicatorData:null,
        seriesData:[]
    }

    let inclicatorData = [] , tmpDataAverage = [] , tmDataMedian = [] , tmDataDiffer = []  ;
    let lvnData = knowledgeData.lv_n;
    for (let j = 0; j < lvnData.length; j++) {
        for (let index in lvnData[j]) {
            let lvnObj = lvnData[j][index];
            inclicatorData.push(lvnObj.checkpoint);
            tmpDataAverage.push((lvnObj.score_average_percent*100).toFixed(2));
            tmDataMedian.push((lvnObj.project_median_percent*100).toFixed(2));
            tmDataDiffer.push((lvnObj.diff_degree).toFixed(2));
        }
    }
    let seriesAverage={
        name:'平均分',
        type:'bar',
        yIndex:0,
        data:tmpDataAverage
    }
    let seriesMedian={
        name:'中位数',
        type:'bar',
        yIndex:0,
        data:tmDataMedian
    }
    let seriesDiffer={
        name:'分化度',
        type:'line',
        yIndex:1,
        data:tmDataDiffer
    }
    let yDataObj = [
        {
            name:'平均分/中位数',
            min:0,
            max:100,
            position:'left',
            inverse:false
        },
        {
            name:'分化度',
            min:0,
            max:200,
            position:'right',
            inverse:true,
            nameLocation:'start'
        }
    ]

    chartBarData.yData = yDataObj;
    chartBarData.inclicatorData = inclicatorData;
    chartBarData.seriesData.push(seriesAverage);
    chartBarData.seriesData.push(seriesMedian);
    chartBarData.seriesData.push(seriesDiffer);

    return chartBarData;
}

export function handleChartRadarInclicatorsLv1Data(reportType, legends, rawData) {
    let chartRadarData = {
        keys: [],
        legend:[],
        data: []
    };

    let keys = [], data = [];
    for (let i = 0; i < rawData.length; i++) {
        let tmpData = [];
        let lvnData = rawData[i].lv_n;

        for (let j = 0; j < lvnData.length; j++) {
            for (let index in lvnData[j]) {
                let lvnObj = lvnData[j][index];
                if(i == 0){
                    keys.push(lvnObj.checkpoint);
                }
                tmpData.push((lvnObj.weights_score_average_percent * 100).toFixed(2));
            }
        }
        data.push({
            name:legends[i],
            values:tmpData
        })
    }
    chartRadarData.keys = keys.reverse();
    chartRadarData.legend = legends;
    chartRadarData.data = data;

    return chartRadarData;
}

export class SectionInclicatorsSystem extends Component {

    render() {
        let inclicatorsSystemData = this.props.inclicatorsSystemData;
        // let inclicatorsSystemKonwledgeData = inclicatorsSystemData.knowledgeInclicatorsData;
        let inclicatorsSystemDataKey=Object.keys(inclicatorsSystemData);

        let contentInclicatorsSystem = inclicatorsSystemDataKey.map(function (obj,index) {
            let data = inclicatorsSystemData[obj];
            return <BlockInclicatorsSystem key={index} data = {data}/>
        });

        return (
            <div>
                {contentInclicatorsSystem}
            </div>
        )
    }
}

