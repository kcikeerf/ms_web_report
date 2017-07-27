import React, {Component} from 'react';

import ChartRadarDefault from '../component/ChartRadarDefault';
import ChartBarDefault from '../component/ChartBarDefault';
import TableIndicator from '../component/TableIndicator';
import ChartScatterDefault from '../component/ChartScatterDefault';
let config = require('zx-const')[process.env.NODE_ENV];

function chartRadarLvOne(selfLv, parpentLv) {
    console.log(selfLv);
    let chartRadarData = {
        keys: [],
        legend: [],
        data: []
    };
    let lvOne = selfLv.lvOne;
    for(let i =0;i<lvOne.length; i++){
        
    }

    return chartRadarData;
}


class SectionReportIndicatorsSystem extends Component {

    render() {
        let title = this.props.title;
        let data = this.props.data;
        console.log(data);
        let selfLv = data.selfLv;
        let parpentLv = data.parentLv;
        let chartRadarLvOneData = chartRadarLvOne(selfLv, parpentLv);
        return (
            <div className="zx-section-container">
                <div className="section">
                    <h2>{title}</h2>
                    <div className="row">
                        <div className="col s12">
                            <div className="zx-inclicators-System">
                                <h3>一级指标的表现情况</h3>
                                <ChartRadarDefault data={chartRadarLvOneData}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        )
    }
}

export default SectionReportIndicatorsSystem;