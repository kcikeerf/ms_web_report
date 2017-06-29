import React, {Component} from 'react';

class ChartBarDefault extends Component {
    getOption() {

        let colors = ['#5ab1ef', '#d87a80', '#ffb980', '#15a892'];

        let option = {
            color: colors,
            title: {
                text: '大幅度但是路宽话费'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                top: '15%',
                left: '10%',
                bottom: '10%'
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['平均分', '中位数', '分化度']
            },
            xAxis: [
                {
                    type: 'category',
                    name: '指标',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        rotate: -60
                    },
                    data: ['属于等等等等', '蝶恋', '地方', '多方', '的李', '枫蓝', '多弗', '馈了', '开复', '机费', '路了', '歼击机']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '平均分',
                    min: 0,
                    max: 100,
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: colors[0]
                        }
                    }
                },
                {
                    type: 'value',
                    name: '中位数',
                    min: 0,
                    max: 100,
                    position: 'left',
                    offset: 50,
                    axisLine: {
                        lineStyle: {
                            color: colors[1]
                        }
                    }
                },
                {
                    type: 'value',
                    name: '分化度',
                    min: 0,
                    max: 200,
                    position: 'right',
                    // offset: 50,
                    axisLine: {
                        lineStyle: {
                            color: colors[2]
                        }
                    }
                }
            ],
            series: [
                {
                    name: '平均分',
                    type: 'bar',
                    yAxisIndex: 0,
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 89.6, 67.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name: '中位数',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: '分化度',
                    type: 'line',
                    yAxisIndex: 2,
                    data: [23, 22, 33, 45, 63, 102, 56, 23.4, 23.0, 16.5, 12.0, 62]
                }
            ]
        };

        return option;
    }

    render() {
        return (
            <div></div>
        )
    }
}