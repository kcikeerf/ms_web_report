import React, {Component} from 'react';
import ReactEchartsScatter from './../../echarts/Scatter';

export default class ChartScatterDefault extends Component {
    constructor() {
        super();
    }

    getOption(titles, labels, scoreMaxs, isInverses, data) {
        let title = titles || '各学校分化度与平均分';
        //x,y轴名称
        let label = labels || {x: '分化度', y: '平均分'};

        //平均分最大值
        let scoreMax = scoreMaxs || 100;

        //x,y轴是否反向
        let isInverse = isInverses || {x:true, y:false};

        //组装数据
        let seriesArr = [];
        for (let i = 0; i < data.length; i++) {
            let obj = {
                type: 'scatter',
                data: data[i],
                symbolSize:15
            };
            seriesArr.push(obj);
        }

        let tooltipParamsNameX=labels.x;
        let tooltipParamsNameY=labels.y;

        let option = {
            title: {
                show: true,
                text: title,
                textStyle: {
                    fontSize: 16
                }
            },
            grid: {
                left:  '1%',
                right: '1%',
                bottom:'3%',
                containLabel: true
            },
            tooltip: {
                show: true,
                formatter: function (params) {
                    return params.name +
                        `</br>${tooltipParamsNameY}:` + params.value[1] +
                        `</br>${tooltipParamsNameX}:` + params.value[0];

                }
            },
            xAxis: [
                {
                    name: label.x,
                    type: 'value',
                    inverse: isInverse.x,
                    scale: true,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    nameLocation: 'middle',
                    nameGap:22,
                    min: 0,
                    max: 200
                }
            ],
            yAxis: [
                {
                    name: label.y,
                    type: 'value',
                    scale: true,     //是否必须从0刻线起
                    inverse: isInverse.y,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    nameLocation: 'end',
                    min: 0,
                    max: scoreMax,
                    axisLine: {
                        show: true,
                        onZero: false
                    }
                }
            ],
            series: seriesArr
        };

        return option;
    }

    render() {
        let scatterData = this.props.scatterData;
        let option = this.getOption(scatterData.title, scatterData.label, scatterData.scoreMax, scatterData.isInverse, scatterData.data);
        let style = {
            height: '500px',
            width: '100%'
        };
        return (
            <ReactEchartsScatter option={option} style={style} className='echarts-for-echarts'/>
        )
    }
}