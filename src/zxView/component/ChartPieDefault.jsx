import React from 'react';

// import constants from 'zx-chart/const';
import ReactEchartsPie from 'zx-chart/Pie';

class ChartPieDefault extends React.Component {
    getOption(titles, legend, values) {
        let option = {
            color: ['#0097a7', '#607d8b', '#a1887f'],
            title : {
                text: titles,
                subtext: '',
                x:'left'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                left: 'right',
                data: legend
            },
            series : [
                {
                    name: '',
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '50%'],
                    data: values,
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
        let data = this.props.data;
        let option = this.getOption(data.titles, data.legend, data.values);
        let style = {
            height: '280px',
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

export default ChartPieDefault;
