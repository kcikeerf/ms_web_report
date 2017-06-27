import React, {Component} from "react";
import EacherScatterDefault from './BlockEacherScatterDefault';

export function handleChildrenBasicScatterData(reportType, title, data) {
    if (data.length < 0) {
        return false
    }
    let handleSchoolScatterData = {
        title: title,
        label: {
            x: '分化度',
            y: '平均分'
        },
        isInverse: {
            x: true,
            y: false
        },
        data:[]
    }
    let score, averageScore, diffDegree;
    let ScatterArrData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i][1].report_data !== undefined) {
            let reportBase = data[i][1].report_data.data.knowledge.base;
            score = reportBase.total_full_score / reportBase.pupil_number;
            let obj = {
                name: data[i][1].label,
                value: []
            }
            averageScore = parseFloat(reportBase.weights_score_average).toFixed(2);
            diffDegree = parseFloat(reportBase.diff_degree).toFixed(2);
            obj.value.push(diffDegree);
            obj.value.push(averageScore);
            ScatterArrData.push(obj);
        }
    }
    handleSchoolScatterData.data.push(ScatterArrData);

    return handleSchoolScatterData;
}

export class BlockChildrenBasicScatter extends Component {
    render() {
        let data = this.props.data;
        return (
            <EacherScatterDefault scatterData={data} />
        )
    }
}