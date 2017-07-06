import React, {Component} from 'react';
import ChartPieDefault from '../ChartPieDefault';

export function handleBlockChartPie(pieData) {
    let legend = [];
    let values = [];
    let titles = pieData.title;
    pieData.data.map((item, index) => {
        values.push(item);
        legend.push(item.name)

    });
    return {legend, values,titles}
}


export class BlockReportChartPieStats extends Component {

    render() {
        let data = this.props.data;
        return (
            <div className="section">
                <ChartPieDefault data = {data}/>
            </div>
        )
    }
}

