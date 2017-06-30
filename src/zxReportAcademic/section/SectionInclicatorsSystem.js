import React, {Component} from 'react';
import ChartRadarDefault from '../component/ChartRadarDefault';
import ChartBarDefault from '../component/ChartBarDefault';

class KnowledgeInclicatorsSystem extends Component{

    render() {
        let data = this.props.data;
        let ChartRadarLv1Data = data.chartRadarInclicatorsLv1Data;
        let ChartBarLv1Data = data.chartBarInclicatorsLv1Data;

        return (
            <div>
                <ChartRadarDefault data = {ChartRadarLv1Data}/>
                <ChartBarDefault data = {ChartBarLv1Data}/>
            </div>
        )
    }

}

export function handleChartBarInclicatorsLv1Data(reportType , titles  ,knowledgeData) {
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
    console.log(rawData);

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
    console.log(chartRadarData);
    return chartRadarData;
}

export class SectionInclicatorsSystem extends Component {

    render() {
        let inclicatorsSystemData = this.props.inclicatorsSystemData;
        let inclicatorsSystemKonwledgeData = inclicatorsSystemData.knowledgeInclicatorsData;

        return (
            <div>
                <KnowledgeInclicatorsSystem data = {inclicatorsSystemKonwledgeData}/>
            </div>
        )
    }
}

