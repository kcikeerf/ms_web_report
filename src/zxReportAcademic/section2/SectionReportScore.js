import React, {Component} from 'react';
import {Map, is} from 'immutable';

import chartConst from 'zx-chart/const';
import ReactEchartsPictorialBar from 'zx-chart/PictorialBar';
import ReactEchartsLiquidfill from 'zx-chart/Liquidfill';

//成绩block
export class SectionReportScore extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let id = this.props.id;
        // 区块标题
        let title = this.props.title;

        // 区块数据
        let data = this.props.data;
        let fullValue = data.fullValue;
        let selfValue = data.selfValue;
        let parentValues = data.parentValues;

        // 柱状图
        let chartBar;
        if(parentValues.length===0){
            chartBar = <ChartLiquidfillScore data={data}/>;
        }else {
            chartBar = <ChartBarScore data={data}/>;
        }


        return (
            <div id={id} className="zx-section-container">
                <div className="section">
                    <h2>{title}</h2>
                    <div className="row">
                        <div className="col s4">
                            <div className="zx-score-container">
                                <div className="zx-score-item">
                                    <div className="zx-score-header">
                                        <div className="zx-score-title">{selfValue.label}</div>
                                        <i className="material-icons">{selfValue.icon}</i>
                                    </div>
                                    <div className="zx-score-body">
                                        <div className="zx-score-content">{selfValue.value}</div>
                                        <div className="zx-score-subcontent">满分{fullValue}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s8">
                            {chartBar}
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>

        )
    }
}

//成绩的echarts图
class ChartBarScore extends React.Component {
    getOption(data) {
        let fullValue = data.fullValue;
        let scoreData = [data.selfValue, ...data.parentValues];

        let key = scoreData.map((data, index) => {
            return data.label;
        });
        let seriesData = scoreData.map((data, index) => {
            let value = data.value;
            let valuePercent = parseFloat(value / fullValue).toFixed(2);
            let color;
            if (valuePercent >= 0.8) {
                color = chartConst.COLORS_EXCELLENT;
            }
            else if (valuePercent >= 0.6) {
                color = chartConst.COLORS_GOOD;
            }
            else {
                color = chartConst.COLORS_FAILED;
            }

            let dataItem = {
                value: value,
                itemStyle: {
                    normal: {
                        color: color,
                        opacity: (index === 0) ? 0.8 : 0.4
                    },
                    emphasis: {
                        opacity: 1
                    }
                }
            };

            return dataItem;
        });

        let option = {
            textStyle: chartConst.TEXT_STYLE,
            grid: {
                top: 15,
                left: 55,
                right: 55,
                bottom: 20
            },
            yAxis: {
                splitLine: {
                    show: false,
                    lineStyle: chartConst.SPLIT_LINE_STYLE
                },
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                    show: false,
                    textStyle: chartConst.AXIS_LABEL_TEXT_STYLE
                }
            },
            xAxis: {
                data: key,
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                    textStyle: {
                        color: '#212121'
                    }
                }
            },
            series: [
                {
                    name: 'hill',
                    type: 'pictorialBar',
                    barCategoryGap: '-20%',
                    symbol: 'path://M311.433,225.383c-67.587,0-46.535,153.684-186.842,188.421c6.355,0,96.626,0,186.842,0s180.487,0,186.842,0C357.968,379.067,379.021,225.383,311.433,225.383z',
                    itemStyle: {
                        normal: {
                            opacity: 0.5
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: seriesData,
                    z: 10
                }
            ],
            animation: false
        };

        return option;
    }

    render() {
        let data = this.props.data ? this.props.data : null;
        let option = this.getOption(data);
        let style = {
            height: '130px',
            width: '100%'
        };
        return (
            <ReactEchartsPictorialBar
                option={option}
                style={style}
                className='echarts-for-echarts'
            />
        )
    }
}

class ChartLiquidfillScore extends Component {

    getOption(data) {
        let fullValue = data.fullValue;
        let scoreData = [data.selfValue, ...data.parentValues];

        let seriesData = scoreData.map((data, index) => {
            let value = data.value;
            let valuePercent = parseFloat(value / fullValue).toFixed(2);
            let color;
            if (valuePercent >= 0.8) {
                color = chartConst.COLORS_EXCELLENT;
            }
            else if (valuePercent >= 0.6) {
                color = chartConst.COLORS_GOOD;
            }
            else {
                color = chartConst.COLORS_FAILED;
            }

            let dataItem = {
                value: valuePercent,
                itemStyle: {
                    normal: {
                        color: color,
                        shadowBlur: 0,
                        opacity: (index === 0) ? 0.8 : 0.4
                    },
                    emphasis: {
                        opacity: 1
                    }
                }
            };

            return dataItem;
        });

        let option={
            center: ['50%', '50%'],
            series: [{
                type: 'liquidFill',
                name:'平均分',
                data: seriesData,
                radius: '95%',
                label:{
                    normal:{
                        textStyle:{
                            color:'#020202',
                            fontSize:18
                        },
                        formatter:function (param) {
                            return data.selfValue.value;
                        }
                    }
                },

                backgroundStyle: {
                    color: '#fff'
                },
                outline:{
                    show:true,

                    borderDistance:2,
                    itemStyle:{
                        shadowBlur: 2,
                        borderWidth:'2',
                        borderColor:chartConst.COLORS[0]
                    }
                }
            }]
        };

        return option;
    }
    render() {
        let data = this.props.data ? this.props.data : null;
        let option = this.getOption(data);
        let style = {
            height: '130px',
            width: '100%'
        };
        let label = data.selfValue.label+'平均分';
        return (
            <div className="zx-score-liquidfill">
                <ReactEchartsLiquidfill
                    option={option}
                    style={style}
                    className='echarts-for-echarts'
                />
                <span className="zx-score-liquidfill-label">{label}</span>
            </div>

        );
    }
}