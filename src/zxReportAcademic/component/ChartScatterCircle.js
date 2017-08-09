import React, {Component} from 'react';
import chartConst from 'zx-chart/const';
import ReactEchartsScatter from './../../echarts/Scatter';

export default class ChartScatter extends Component {
    getOption(name, text, legends, maxScore, scoreCritical, data) {
        let seriesData = [], markAreaData = [];

        for (let i = 0; i < data.length; i++) {
            seriesData.push([maxScore - data[i], i, 4]);
        }

        for (let i = 0; i < data.length + 1; i++) {
            let dataLength = data.length + 1;
            let markAreaDataItemOneLevel = [
                {
                    // name: '0分到60分',
                    xAxis: maxScore - 0,
                    yAxis: i,
                    itemStyle: {
                        normal: {
                            color: '#fafafa',
                            borderColor: '#fafafa',
                            borderWidth: 2,
                            borderType: 'solid'
                        }
                    }
                },
                {
                    xAxis: maxScore - 0.6 * maxScore,
                    yAxis: (i + 1) === dataLength ? 0 : i + 1
                }
            ];

            let markAreaDataItemTwoLevel = [
                {
                    // name: '60分到80分',
                    xAxis: maxScore - 0.6 * maxScore,
                    yAxis: i,
                    itemStyle: {
                        normal: {
                            color: '#eeeeee',
                            borderColor: '#eeeeee',
                            borderWidth: 2,
                            borderType: 'solid'
                        }
                    }
                },
                {
                    xAxis: maxScore - 0.8 * maxScore,
                    yAxis: (i + 1) === dataLength ? 0 : i + 1
                }
            ];

            let markAreaDataItemThirdLevel = [
                {
                    // name: '80分到100分',
                    xAxis: maxScore - 0.8 * maxScore,
                    yAxis: i,
                    itemStyle: {
                        normal: {
                            color: '#e0e0e0',
                            borderColor: '#e0e0e0',
                            borderWidth: 2,
                            borderType: 'solid'
                        }
                    }
                },
                {
                    xAxis: maxScore - maxScore,
                    yAxis: (i + 1) === dataLength ? 0 : i + 1
                }
            ];

            let markAreaDataItemCritical = [
                {
                    // name: '临界分',
                    xAxis: maxScore - scoreCritical-5,
                    yAxis: i,
                    itemStyle: {
                        normal: {
                            color: '#ef9a9a',
                            borderColor: '#ef9a9a',
                            borderWidth: 1,
                            borderType: 'solid',
                            opacity: 0.5
                        }
                    }
                },
                {
                    xAxis: maxScore - scoreCritical,
                    yAxis: (i + 1) === dataLength ? 0 : i + 1
                }
            ];
            markAreaData.push(markAreaDataItemOneLevel);
            markAreaData.push(markAreaDataItemTwoLevel);
            markAreaData.push(markAreaDataItemThirdLevel);
            markAreaData.push(markAreaDataItemCritical);
        }

        let option = {
            title: {
                text: text || '',
            },
            legend: {
                data: [legends] || '',
                left: 'right'
            },
            polar: {},
            itemStyle: {
                normal: {
                    color: chartConst.COLORS[0]
                }
            },
            tooltip: {
                formatter: function (params) {
                    return name[params.value[1]] + '</br>得分:' + (maxScore - params.value[0]);
                }
            },
            angleAxis: {
                type: 'category',
                data: name,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    interval: 0,
                    lineStyle: {
                        color: '#999',
                        type: 'dashed',
                        opacity: 0.2
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        opacity: 0.5
                    },
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                // splitLine: {
                //     lineStyle: {
                //         type: 'dashed',
                //         opacity: 0.5,
                //     },
                // },
                z: 50
            },
            radiusAxis: {
                type: 'value',
                max: maxScore,
                axisLine: {
                    // show: false
                },
                axisLabel: {
                    rotate: 0,
                    formatter: function (value) {
                        return maxScore - value
                    }
                },
                axisTick: {
                    show: false
                },
                zlevel: 100
            },
            series: [{
                name: legends,
                type: 'scatter',
                coordinateSystem: 'polar',
                symbolSize: function (val) {
                    return val[2] * 2;
                },
                data: seriesData,
                animationDelay: function (idx) {
                    return idx * 15;
                },
                itemStyle: {
                    normal: {
                        opacity: 0.7
                    },
                },
                markArea: {
                    silent: true,
                    label: {
                        normal: {
                            position: 'inside',
                            textStyle: {
                                color: '#212121',
                                fontSize: 16
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ffcdd2',
                        }
                    },
                    data: markAreaData,
                    z: 0
                },
                zlevel: 1000
            }]
        };

        return option;
    }

    render() {
        let data = this.props.data;
        let option = this.getOption(data.name, data.text, data.legend, data.maxScore, data.scoreCritical, data.data);
        let style = {
            height: '400px',
            // height: '800px',
            width: '100%'
        };
        return (
            <ReactEchartsScatter option={option} style={style} className='echarts-for-echarts'/>
        )
    }
}