import React, {Component} from 'react';
import ChartPieDefault from '../../component/ChartPieDefault';

export function handleBlockChartPie(data) {
    let legend = [];
    let values = [];
    let titles = '';

    let config = {
        chinese: {
            label: '语文'
        },
        math: {
            label: '数学'
        },
        english: {
            label: '英语'
        }
    };

    for (let i = 0; i < data.length; i++) {
        let newData = {};
        let subject = data[i].subject;
        if (config.hasOwnProperty(subject)) {
            newData.name = config[subject].label;
            newData.value = data[i].stat.total.value;
        }
        values.push(newData);
        legend.push(newData.name)
    }
    return {legend, values,titles}
}


export class BlockReportChartPieStats extends Component {

    render() {
        // let data = this.props.data;
        let data = {
            legend:['语文','数学','英语'],
            title:'',
            values:[
                {
                    name:'语文',
                    value:3454,
                },
                {
                    name:'数学',
                    value:3454,
                },
                {
                    name:'英语',
                    value:3454,
                }
            ]
        };
        return (
            <div className="section z-depth-3">
                <ChartPieDefault data = {data}/>
            </div>
        )
    }
}

