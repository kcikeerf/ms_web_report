import React from 'react';

import { Map, is } from 'immutable';
// import $ from 'jquery';

import constants from 'zx-chart/const';
import ReactEchartsBar from 'zx-chart/Radar';

import imgManRunning from 'zx-img/man-mark.png';

//学生排名的说明blocks
class SummaryRank extends React.Component {
    render() {
        let data = this.props.data;
        let label = data.label;
        let reference = data.reference;

        let total = parseInt(data.total, 10);
        let value = parseInt(data.value, 10);
        // let options = data.options;

        let summaryTotal =
            <div>
                <p>本次考试中，该{label}在{reference}中的排名是:</p>
                <p><b className="zy-rank-highlight">第{value}名</b></p>
            </div>;
        let summaryRank = <div>{reference}总共参考 <b>{total}</b> 名{label}</div>;
        let summaryNote = <div>该{label}领先{reference}中其他 <b>{total - value}</b> 名{label}</div>;


        let chartRankBar = <ChartBarRank data={data}/>;

        return (
            <div className="zy-rank-student-container">
                <div className="zy-rank-student-footer">
                    <div className="zy-rank-student-note">
                        {summaryTotal}
                        {summaryNote}
                        {summaryRank}
                    </div>

                    <div className="zy-rank-student-body">
                        <div className="zy-rank-student-items">
                            {chartRankBar}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

//学生排名的柱状图
class ChartBarRank extends React.Component {
    getOption(data) {
        let reference = data.reference;
        let value = data.value;
        let total = data.total;

        let key = [];
        let values = [];
        key.push(reference);
        values.push(value);
        let option = {
            textStyle: {
                fontSize: constants.CHART_CONTENT_SIZE_LG
            },
            title: {
                text: '',
                textStyle: {
                    color: constants.CHART_TITLE_COLOR,
                    fontWeight: constants.CHART_TITLE_WEIGHT,
                    fontSize: constants.CHART_TITLE_SIZE
                },
                textAlign: 'left',
                left: 0,
                top: 0
            },
            tooltip: {
                show: true
            },
            grid: {
                top: 20,
                left: 65,
                right: 20,
                bottom: 30
            },
            xAxis: {
                type: 'value',
                nameTextStyle: {
                    fontSize: 12
                },
                nameLocation: 'start',
                nameGap: 10,
                min: 1,
                max: total,
                //splitNumber:5,
                interval: parseInt(total / 5, 10),
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
                    formatter: function (value, index) {
                        if (index === 0) {
                            return '第' + value + '名';
                        }

                        return value;

                    }
                },
                axisTick: {
                    show: false
                },
                inverse: true
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
                        formatter: '{value}名次'
                    }
                },
                {
                    show: false,
                    data: key
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
                    barMaxWidth: 15,
                    yAxisIndex: 2,
                    silent: true,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 0,
                            color: '#2ec7c9'
                        }
                    },
                    data: [total],
                    z: 2
                },
                {
                    name: '排名',
                    type: 'bar',
                    yAxisIndex: 0,
                    barMaxWidth: 15,
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: '#eee'
                        }
                    },
                    markPoint: {
                        symbol: `image://${imgManRunning}`,
                        symbolSize: 32,
                        symbolOffset: [0, -10],
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
        let option = this.getOption(data);
        let style = {
            height: '65px',
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

//处理学生排名的方法
export function handleStudentRankData(reportType, mainReportData, otherReportData) {
    let modifiedData = [];
    let rawData = [];
    let mainData = mainReportData.data.knowledge.base;
    rawData.push(mainData);
    if (otherReportData.length > 1) {
        //排序
        otherReportData.sort(function (x, y) {
            let val1 = Number(x.order);
            let val2 = Number(y.order);
            return val1 < val2;
        });
        for (let i = 0; i < otherReportData.length; i++) {
            let otherData = otherReportData[i].data.data.knowledge.base;
            rawData.push(otherData);
        }
    }

    let reference = ['班级', '年级', '区域'];
    for (let j = 0; j < reference.length; j++) {
        let rankItem = {
            label: '学生',
            reference: null,
            total: null,
            value: null
        };
        rankItem.reference = reference[j];
        if (j === 0) {
            rankItem.value = rawData[0].klass_rank;
        } else if (j === 1) {
            rankItem.value = rawData[0].grade_rank;
        } else if (j === 2) {
            rankItem.value = rawData[0].project_rank;
        }
        rankItem.total = rawData[j + 1].pupil_number;
        modifiedData.push(rankItem);
    }
    return modifiedData;
}

//学生排名的block
export class SectionStudentRank extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let data = this.props.data;
        let contentRank;
        let summaryContent;

        if (data === false) {
            contentRank = '数据加载失败，请稍后再试';
            summaryContent = '数据加载失败，请稍后再试';
        }
        else {
            summaryContent = data.map((data, index) => {
                return <SummaryRank key={index} data={data}/>
            });
        }

        return (
            <div className="row">
                <div className="col s12">
                    <div className="section">
                        <h2>排名情况</h2>
                        <div className="zy-rank-container">
                            {contentRank}
                            {summaryContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}