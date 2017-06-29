import React, {Component} from 'react';
import ChartRadarDefault from '../component/ChartRadarDefault';

class KnowledgeInclicatorsSystem extends Component{
    render() {
        let data = this.props.data;
        return (
            <div>
                <ChartRadarDefault data = {data}/>
            </div>
        )
    }

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

