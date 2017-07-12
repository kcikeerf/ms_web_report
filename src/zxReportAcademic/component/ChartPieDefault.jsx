import React from 'react';

//import constants from 'zx-chart/const';
import ReactEchartsPie from 'zx-chart/Pie';
import chartConst from 'zx-chart/const';

export class ChartPieDefault extends React.Component {
    getOption(options, keys, values) {
        let option = {
            color: ['#0097a7', '#607d8b', '#a1887f'],
            title : {
                text: options.title.text,
                subtext: options.title.subtext,
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                left: 'right',
                data: ['语文','数学','英语']
            },
            series : [
                {
                    name: '',
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'语文'},
                        {value:310, name:'数学'},
                        {value:234, name:'英语'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    }

    componentDidMount() {
        let echartsInstance = this.echartDom.getEchartsInstance();
        echartsInstance.resize();
    }
    render() {
        //let data = this.props.data;
        let option =this.getOption();
        let style = {
            height: '266px',
            width: '100%'
        };
        return (
            <ReactEchartsPie
                option={option}
                style={style}
                className='echarts-for-echarts'
                ref={(echartDom) => {this.echartDom = echartDom}}
            />
        )
    }
}
