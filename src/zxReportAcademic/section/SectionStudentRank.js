import React from 'react';

import { Map, is } from 'immutable';

import constants from 'zx-chart/const';
import ReactEchartsBar from 'zx-chart/Radar';

import imgManRunning from 'zx-img/man-mark.png';
import imgStudent from 'zx-img/student.svg';

//学生排名的block
export class SectionStudentRank extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let id = this.props.id;
        let title = this.props.title;
        let data = this.props.data;
        let grade = this.props.options.grade;

        let summaryContent;
        if (data) {
            summaryContent = data.map((data, index) => {
                return <SummaryRank key={index} data={data} grade={grade}/>
            });
        }

        return (
            <div id={id} className="row">
                <div className="col s12">
                    <div className="section">
                        <h2>{title}</h2>
                        <div className="zy-rank-container">
                            {summaryContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//学生排名的说明blocks
class SummaryRank extends React.Component {
    render() {
        let data = this.props.data;
        let grade = this.props.grade;

        let labelName,value,fullValue;
        if(grade){
            value = `${data.percentile}%`;
            labelName='领先';
            fullValue='的其他学生'
        }else {
            labelName='排名';
            value = data.value;
            fullValue=`共${data.fullValue}人`
        }

        return (
            <div className="row">
                <div className="col s4">
                    <div className="zx-score-container">
                        <div className="zx-score-item">
                            <div className="zx-score-header">
                                <div className="zx-score-title">{labelName}{data.label}</div>
                                <i className="material-icons">{data.icon}</i>
                            </div>
                            <div className="zx-score-body">
                                <div className="zx-score-content">{value}</div>
                                <div className="zx-score-subcontent">{fullValue}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s8">
                    <ChartBarRank data={data} grade={grade} />
                </div>
            </div>
        );
    }
}

//学生排名的柱状图
class ChartBarRank extends React.Component {
    getOption(data,grade) {
        let label = data.label;
        let value,fullValue,formatter,min,inverse,baseColor,ranColor;
        if(grade){
            value = data.percentile;
            fullValue=100;
            formatter=function (value, index) {
                return value+'%';
            };
            min = 0;
            inverse=false;
            baseColor='#eee';
            ranColor='#2ec7c9'

        }else {
            value = data.value;
            fullValue = data.fullValue;
            formatter=function (value, index) {
                if (index === 0) {
                    return '第' + value + '名';
                }
                return value;

            };
            min = 1;
            inverse=true;
            baseColor='#2ec7c9';
            ranColor='#eee'
        }
        
        let key = [];
        let values = [];
        key.push(label);
        values.push(value);

        let option = {
            tooltip: {
                show: true
            },
            grid: {
                top: 40,
                left: 15,
                right: 15,
                bottom: 40
            },
            xAxis: {
                type: 'value',
                nameTextStyle: {
                    fontSize: 12
                },
                nameLocation: 'start',
                nameGap: 10,
                min:min,
                max: fullValue,
                interval: parseInt(fullValue / 5, 10),
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#b6b6b6',
                        opacity: 0.5
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#b6b6b6'
                    },
                    interval: 0,
                    formatter:formatter
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                inverse:inverse
            },
            yAxis: [
                {
                    type: 'category',
                    nameGap: 60,
                    axisLine: {
                        show: false
                    },
                    axisTick: {show: false},
                    data: key,
                    axisLabel: {
                        show: false,
                        formatter: '{value}名次'
                    }
                },
                {
                    show: false,
                    data: key
                }
            ],
            series: [
                {
                    name: '跑道',
                    type: 'bar',
                    barMaxWidth: 20,
                    yAxisIndex: 0,
                    silent: true,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10,
                            color: baseColor
                        }
                    },
                    data: [fullValue],
                    z: 2
                },
                {
                    name: '排名',
                    type: 'bar',
                    yAxisIndex: 1,
                    barMaxWidth: 20,
                    silent: true,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10,
                            color:ranColor
                        }
                    },
                    markPoint: {
                        symbol: `image://${imgStudent}`,
                        symbolSize: 32,
                        symbolOffset: [0, 0],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {type: 'min', name: '最大值'}
                        ]
                    },
                    data: values,
                    z: 3
                }
            ],
            animation: false
        };
        return option;
    }

    render() {
        let data = this.props.data;
        let grade = this.props.grade;
        let option = this.getOption(data,grade);
        
        let style = {
            height: '130px',
            width: '100%'
        };
        return (
            <ReactEchartsBar
                option={option}
                style={style}
                className='echarts-for-echarts'
            />
        )
    }
}