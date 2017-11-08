import React, {Component} from 'react';

import ChartRadarDefault from '../component/ChartRadarDefault';
import ChartBarDefault from '../component/ChartBarDefault';
import TableIndicator from '../component/TableIndicator';
import ChartScatterDefault from '../component/ChartScatterDefault';
let config = require('zx-const')[process.env.NODE_ENV];
let module = this;
class SectionReportIndicatorsSystem extends Component {
    constructor() {
        super();

    }

    render() {
        let id = this.props.id;
        let data = this.props.data;
        let title = this.props.title;
        let settings = this.props.options;
        let contentSetting;
        if(data){
            //排序
            settings.sort(function (x, y) {
                let val1 = x.order;
                let val2 = y.order;
                return val1 - val2;
            });
            contentSetting = settings.map(function (section, index) {
                let title = section.title;
                let component = section.component;
                let func = section.func;
                let SectionComponent;
                let fn;
                switch (component) {
                    case 'ChartRadarDefault' :
                        SectionComponent = ChartRadarDefault;
                        break;
                    case 'TableIndicator' :
                        SectionComponent = TableIndicator;
                        break;
                    case 'ChartBarDefault' :
                        SectionComponent = ChartBarDefault;
                        break;
                    case 'ChartScatterDefault' :
                        SectionComponent = ChartScatterDefault;
                        break;
                }
                switch (func) {
                    case 'chartRadarLvOne' :
                        fn = chartRadarLvOne;
                        break;
                    case 'chartBarLvOne' :
                        fn = chartBarLvOne;
                        break;
                    case 'tableInclicatorsLvOne' :
                        fn = tableInclicatorsLvOne;
                        break;
                    case 'chartScatterLvTwo' :
                        fn = chartScatterLvTwo;
                        break;
                    case 'tableInclicatorsLvTwo' :
                        fn = tableInclicatorsLvTwo;
                        break;
                    case 'pupilTableInclicatorsLvOne' :
                        fn = pupilTableInclicatorsLvOne;
                        break;
                    case 'pupilTableInclicatorsLvTwo' :
                        fn = pupilTableInclicatorsLvTwo;
                        break;
                }
                let componentData = fn(data);
                return (
                    <div key={index}>
                        <h3>{title}</h3>
                        <SectionComponent data={componentData}/>
                    </div>
                )
            });
        }

        return (
            <div id={id} className="zx-section-container">
                <div className="section">
                    <h2>{title}</h2>
                    <div className="row">
                        <div className="col s12">
                            <div className="zx-inclicators-System">
                                {contentSetting}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        )
    }
}

function chartRadarLvOne(data) {
    let chartRadarData = {
        keys: [],
        legend: [],
        data: []
    };
    let parentArr = data.parentLv;
    let selfArr = data.selfLv;
    let rawData = [];
    rawData.push(selfArr);
    rawData.push(...parentArr);
    // rawData.push();
    // rawData.unshift(data.selfLv);  注意数组指针问题
    let keys = [], legend = [], datas = [];

    for (let i = 0; i < rawData.length; i++) {
        legend.push(rawData[i].label);
        let tmpData = [];
        let lvnData = rawData[i].data.lvOne;
        for (let j = 0; j < lvnData.length; j++) {
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

function chartBarLvOne(data) {
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
    for (let i = 0; i < lvOneData.length; i++) {
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
        tHeader: ['指标', '平均得分率', '中位数得分率', '分化度'],
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
        options: {
            xAxis: {
                name: '分化度',
                min: 0,
                max: data.fullDiff,
                inverse: true
            },
            yAxis: {
                name: '平均分',
                min: 0,
                max: data.fullScore,
            }
        },
        data: []
    };
    let type = data.selfLv.type;
    let lvTwoData = data.selfLv.data.lvTwo;
    let name, diff_degree, score_average_percent, valueArr = [];
    for (let i = 0; i < lvTwoData.length; i++) {
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

function tableInclicatorsLvTwo(data) {
    let inclicatorsLv1TableData = {
        reportType: null,
        tHeader: ['指标', '平均得分率', '中位数得分率', '分化度'],
        tData: [],
        tAction: []
    };
    let type = data.selfLv.type;
    let lvTwoData = data.selfLv.data.lvTwo;
    let tmpTableData = [], tmpTableAction = [];
    let name, diff_degree, score_average_percent, medianPerent;
    for (let i = 0; i < lvTwoData.length; i++) {
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

function pupilTableInclicatorsLvOne(data) {
    let inclicatorsLv1TableData = {
        reportType: null,
        tHeader:  ['指标','个人得分率', '群体得分率'],
        tData: [],
        tAction: []
    };
    let parentArr = data.parentLv;
    let selfLv = data.selfLv;
    let rawData = [];
    rawData.push(selfLv);
    rawData.push(...parentArr);
    let tmpTableData = [], tmpTableAction = [];
    let selfArr = selfLv.data.lvOne;
    for (let i = 0; i < selfArr.length; i++) {
        tmpTableAction.push(i);
        let arr = [];
        arr.push(selfArr[i].checkpoint);
        for (let j = 0; j < rawData.length; j++) {
            let lvnData = rawData[j].data.lvOne[i];
            arr.push((lvnData.score_average_percent * 100).toFixed(2));
        }
        tmpTableData.push(arr);
    }

    inclicatorsLv1TableData.tData = tmpTableData;
    inclicatorsLv1TableData.tAction = tmpTableAction;
    return inclicatorsLv1TableData;
}

function pupilTableInclicatorsLvTwo(data) {
    let inclicatorsLv1TableData = {
        reportType: null,
        tHeader: ['指标','个人得分率', '群体得分率'],
        tData: [],
        tAction: []
    };
    let parentArr = data.parentLv;
    let selfLv = data.selfLv;
    let rawData = [];
    rawData.push(selfLv);
    rawData.push(...parentArr);
    let tmpTableData = [], tmpTableAction = [];
    let selfArr = selfLv.data.lvTwo;

    for (let i = 0; i < selfArr.length; i++) {
        tmpTableAction.push(i);
        let arr = [];
        arr.push(selfArr[i].checkpoint);
        for (let j = 0; j < rawData.length; j++) {
            let lvnData = rawData[j].data.lvTwo[i];
            arr.push((lvnData.score_average_percent * 100).toFixed(2));
        }
        tmpTableData.push(arr);
    }

    inclicatorsLv1TableData.tData = tmpTableData;
    inclicatorsLv1TableData.tAction = tmpTableAction;
    return inclicatorsLv1TableData;
}


export default SectionReportIndicatorsSystem;