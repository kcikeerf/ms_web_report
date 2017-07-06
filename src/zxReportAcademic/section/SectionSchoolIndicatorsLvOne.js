import React, {Component} from 'react';
import TableDefault from '../component/TableDefault';
// let config = require('zx-const')[process.env.NODE_ENV];

//处理一级指标
export function handleSchoolIndicatorsLvOneData(title, optional, data) {
    let tHead = [], tData = [], tableData = [],SchoolIndicatorsObj={};
    let label = optional;
    tHead.push(title);
    tableData.push(label);
    data.lv_n.map((item, index) => {
        for (let j in item) {
            let name = item[j].checkpoint;
            let score_average_percent = item[j].score_average_percent;
            let scoreAveragePercent = (parseFloat((`${score_average_percent}`) * 100).toFixed(2));
            tHead.push(name);
            tableData.push(scoreAveragePercent);
        }
    });
    tData.push(tableData);
    SchoolIndicatorsObj.tHead=tHead;
    SchoolIndicatorsObj.tData=tData;
    return SchoolIndicatorsObj;
}

export class SectionSchoolIndicatorsLvOne extends Component {

    render() {
        let data = this.props.data;
        let contentTableDefault;
        //学校基本信息表格
        if (data) {
            contentTableDefault = data.map((item, index) => {
                let tableData = {
                    tHeader: item.tHead,
                    tData: item.tData
                };
                return <div key={index} className="zx-school-indicators-margin">
                    <TableDefault key={index} data={tableData}/>
                </div>;
            })
        }

        return (
            <div className="section">
                <h2>各学校各指标表现情况</h2>
                {contentTableDefault}
            </div>
        )
    }
}
