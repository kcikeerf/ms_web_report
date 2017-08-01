import React, {Component} from 'react';
import chartConst from 'zx-chart/const';
import ReactEchartsScatter from './../../echarts/Scatter';

export default class ChartScatterDefault extends Component {
    getOption(titles, labels, scoreMaxs, isInverses, data) {
        let title = titles || '各学校分化度与平均分';
        //x,y轴名称
        let label = labels || {x: '分化度', y: '平均分'};

        //平均分最大值
        let scoreMax = scoreMaxs || 100;

        //x,y轴是否反向
        let isInverse = isInverses || {x: true, y: false};

        //处理极值的函数
        function convertData(data) {
            let res=[];
            let obj;
            for (let i = 0; i < data.length; i++) {
                if(i===0){
                    obj={
                        ...data[i],
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}',
                                position: 'top',
                                offset:[0,-5]
                            }
                        }
                    }
                }else {
                    obj={
                        ...data[i],
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}',
                                position: 'bottom'
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:chartConst.COLORS_FAILED
                            }
                        }

                    }
                }
                res.push(obj);
            }
            return res;
        }
        //拆分数据(把原始数据拆分成两部分一部分是极值) 临时解决方案
        let optional = [...data[0]];
        optional.sort(function (x, y) {
            let val1 = Number(x.value[1]);
            let val2 = Number(y.value[1]);
            return val2 - val1;
        });
        let max = optional.shift();                 //取数组第一个为最大值
        let min = optional.pop();                   //取数组第二个为最小值
        let markPoint = [max, min];                 //组合成一个极值数组
        let mergeArr = [optional, markPoint];       //再组装成一个二维数组

        //组装数据 (把组装好的二维数据再组装成eacher对象)
        let seriesArr = [];
        for (let i = 0; i < mergeArr.length; i++) {
            let obj;
            if (i === 0) {
                obj = {
                    type: 'scatter',
                    data: mergeArr[i],
                    symbolSize: 10
                };
            } else {
                obj = {
                    type: 'effectScatter',
                    data: convertData(mergeArr[i]),
                    symbolSize: 10
                };
            }
            seriesArr.push(obj);
        }

        let tooltipParamsNameX = labels.x;
        let tooltipParamsNameY = labels.y;

        let option = {
            color: chartConst.COLORS,
            textStyle: chartConst.TEXT_STYLE,
            title: {
                show: false,
                text: title,
                textStyle: chartConst.TITLE_TEXT_STYLE
            },
            grid: {
                left: '1%',
                right: '1%',
                bottom: '4%',
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
                    axisLine: {
                        lineStyle: chartConst.AXIS_LINE_STYLE,
                    },
                    axisLabel: {
                        formatter: '{value}'
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    nameLocation: 'middle',
                    nameGap: 22,
                    min: 0,
                    max: 200
                }
            ],
            yAxis: [
                {
                    name: label.y,
                    type: 'value',
                    scale: true,                //是否必须从0刻线起
                    inverse: isInverse.y,
                    axisLine: {
                        lineStyle: chartConst.AXIS_LINE_STYLE,
                        onZero: false
                    },
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
                }
            ],
            series: seriesArr
        };

        return option;
    }

    render() {
        let scatterData = this.props.data;
        let option = this.getOption(scatterData.title, scatterData.label, scatterData.scoreMax, scatterData.isInverse, scatterData.data);
        let style = {
            height: '400px',
            width: '100%'
        };
        return (
            <ReactEchartsScatter option={option} style={style} className='echarts-for-echarts'/>
        )
    }
}