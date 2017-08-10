import React, {Component} from 'react';
import { Map, is } from 'immutable';

import ReactEchartsPictorialBar from 'zx-chart/PictorialBar';

export class SectionReportStandardLevel extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let id = this.props.id;
        let title = this.props.title;
        let data = this.props.data;
        let options = this.props.options;
        let contentInfo, contentBar, contentNote;
        if (options) {
            contentNote = options.map(function (obj, index) {
                let color = 'zx-standard-level-color-box ';
                if (obj.level === 'excellent') {
                    color += 'light-blue lighten-2';
                }
                else if (obj.level === 'good') {
                    color += 'amber';
                }
                else if (obj.level === 'failed') {
                    color += 'red lighten-2';
                }

                return <li className="zx-quiz-note">
                    <span className={color}></span>
                    <span className="zx-quiz-word">{obj.note}</span>
                </li>;
            });
        }
        if (data) {
            let fullValue = data.fullValue;
            let precent;
            contentInfo = data.values.map((value, index) => {
                precent = (value.value / fullValue * 100).toFixed(2) + '%';
                let color = 'zx-standard-level-color-box ';
                if (value.type === 'failed') {
                    color += 'red lighten-2';
                }
                else if (value.type === 'good') {
                    color += 'amber';
                }
                else if (value.type === 'excellent') {
                    color += 'light-blue lighten-2';
                }
                return (
                    <div key={index} className="zx-standard-level-item">
                        <span className={color}></span>
                        <span className="zx-standard-level-label">{value.label}:</span>
                        <span className="zx-standard-level-content">{value.value}人</span>
                        <span className="zx-standard-level-content">({precent})</span>
                    </div>
                );
            });
            contentInfo = <div className="zx-standard-level-container">{contentInfo}</div>;
            contentBar = <ChartReportStandardLevel data={data} />;
        }

        return (
            <div id={id} className="zx-section-container">
                <div className="section">
                    <h2>{title}</h2>
                    <div className="zx-note-container">
                        <div className="zx-note-icon"><i className="material-icons">info_outline</i></div>
                        <ul className="zx-note-content">
                            {contentNote}
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col s12">{contentInfo}</div>
                        <div className="col s12">{contentBar}</div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>

        )
    }
}

//分段图
class ChartReportStandardLevel extends React.Component {
    getOption(data) {
        let keys = [], series = [];
        let fullValue= data.fullValue;
        let values= data.values;
        for (let i in values) {
            let value = values[i];
            let color, barBorderRadius;
            if (value.type === 'failed') {
                color = '#e57373';
                barBorderRadius = [0, 15, 15, 0]
            }
            else if (value.type === 'good') {
                color = '#ffc107';
                barBorderRadius = 0
            }
            else if (value.type === 'excellent') {
                color = '#4fc3f7';
                barBorderRadius = [15, 0, 0, 15]
            }
            let seriesItem = {
                name: value.label,
                type: 'bar',
                barMaxWidth: 30,
                itemStyle: {
                    normal: {
                        barBorderRadius: barBorderRadius,
                        color: color
                    }
                },
                stack: '总人数',
                label: {
                    normal: {
                        show: false
                    }
                },
                data: value.value
            };
            keys.push(value.label);
            series.push(seriesItem);
        }


        let option = {
            legend: {
                show: false,
                data: keys
            },
            tooltip: {
            },
            grid: {
                top:15,
                left:15,
                right:15,
                bottom:20
            },
            xAxis:  {
                type: 'value',
                min: 0,
                max: fullValue,
                show: false
            },
            yAxis: {
                show: false,
                type: 'category',
                data: []
            },
            series: series
        };

        return option;
    }
    render(){
        let data = this.props.data ? this.props.data : null;
        let option =this.getOption(data);
        let style = {
            height: '80px',
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