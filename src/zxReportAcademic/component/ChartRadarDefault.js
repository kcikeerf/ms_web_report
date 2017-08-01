import React, {Component} from 'react';
import constants from 'zx-chart/const';
import ReactEchartsRadar from 'zx-chart/Radar';

class ChartRadarDefault extends Component {
    getOption(keys, legend, data) {
        let colors = ['#4db6ac', '#e57373', '#ffb74d', '#15a892'];

        let modifiedKeys = [];
        // if (keys.length > 3 && keys.length !== 6) {
        //     keys = this.modifyKey(keys);
        // }
        for (let index in keys) {
            modifiedKeys.push({
                text: keys[index],
                max: 100
            });
        }

        let seriesData = [];
        for (let i = 0; i < data.length; i++) {
            let tmpData;
            if (i === 0) {
                tmpData = {
                    name: data[i].name,
                    value: data[i].values,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#212121'
                            },
                            formatter: function (params) {
                                return params.value;
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: colors[i]
                        }
                    },
                    z: (data.length - i)
                };
            }
            else {
                tmpData = {
                    name: data[i].name,
                    value: data[i].values,
                    lineStyle: {
                        normal: {
                            color: colors[i],
                            // type: 'dashed'
                        }
                    },
                    z: (data.length - i)
                };
            }
            seriesData.push(tmpData);
        }

        let option = {
            color: colors,
            textStyle: {
                fontSize: constants.CHART_CONTENT_SIZE_SM
            },
            title: {},
            tooltip: {
                show: true,
                position: ['50%', '50%']
            },
            legend: {
                right: 0,
                orient: 'horizontal',
                data: legend
            },
            grid: {
                top: '0',
                left: '0',
                right: '0',
                bottom: '0'
            },
            radar: [
                {
                    z: 1,
                    // shape: 'circle',
                    shape: 'polygon',
                    indicator: modifiedKeys,
                    center: ['50%', '50%'],
                    radius: '55%',
                    splitNumber: 1,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eceff1'
                        }
                    },
                    name: {
                        textStyle: {
                            color: '#212121'
                        },
                        formatter: function (value, indicator) {
                            return value;
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#cfd8dc',
                            type: 'dashed'
                        },
                    },
                    startAngle: 90
                }
            ],
            series: [
                {
                    name: '',
                    type: 'radar',
                    data: seriesData
                }
            ],
            animation: false
        };
        return option;
    }

    // 处理指标名字过长
    // modifyKey(arr) {
    //     for (let i = 0; i < arr.length; i++) {
    //         let c_arr;
    //         let labelInterval;
    //         arr[i] = arr[i].replace(/(\r\n|\n|\r)/gm, '');
    //         c_arr = arr[i].split('');
    //         labelInterval = (c_arr.length > 10) ? 2 : 1;
    //         for (let j = 0; j < c_arr.length; j++) {
    //             if (labelInterval === 1) {
    //                 if (c_arr[j] === '（' || c_arr[j] === '(') {
    //                     c_arr[j] = '︵';
    //                 } else if (c_arr[j] === '）' || c_arr[j] === ')') {
    //                     c_arr[j] = '︶';
    //                 }
    //             }
    //             if ((j + 1) % labelInterval === 0) {
    //                 c_arr[j] += '\n';
    //             }
    //         }
    //         arr[i] = c_arr.join('');
    //     }
    //     return arr;
    // }

    render() {
        let data = this.props.data;
        let option = this.getOption(data.keys, data.legend, data.data);
        let style = {
            height: '450px',
            width: '100%'
        };
        return (
            <ReactEchartsRadar
                option={option}
                style={style}
                className='echarts-for-echarts'
            />
        )
    }
}

export default ChartRadarDefault;