import React from "react";
import TableDefault from './BlockTableDefault';
let config = require('zx-const')[process.env.NODE_ENV];

export function handleChildrenBasicTableData(reportType, header, data) {
    let handleSchoolTableData = {
        reportType: reportType,
        header: [],
        data: []
    };
    let tmHeader = header;
    let tmpTableData = [];
    if(data.length<0){
        return false;
    }
    if (reportType === config.REFERENCE_PROJECT) {
        let label, classNum, lentStudent, averageScore, diffDegree;
        for (let i = 0; i < data.length; i++) {
            if (data[i][1].report_data !== undefined) {
                let arr = [];
                let reportBase = data[i][1].report_data.data.knowledge.base;
                label = data[i][1].label;
                classNum = 9;
                lentStudent = parseFloat(reportBase.pupil_number) ? parseFloat(reportBase.pupil_number) : '暂无';
                averageScore = parseFloat(reportBase.weights_score_average) ? parseFloat(reportBase.weights_score_average) : '暂无';
                diffDegree = parseFloat(reportBase.diff_degree) ? parseFloat(reportBase.diff_degree) : '暂无';

                arr.push(label);
                arr.push(classNum);
                arr.push(lentStudent);
                arr.push(averageScore.toFixed(2));
                arr.push(diffDegree.toFixed(2));
                tmpTableData.push(arr);
            }
        }
    } else if (reportType === config.REFERENCE_GRADE) {
        console.log('暂时未做处理');
        //@TODO 年级报告处理方法暂时没做处理
    }

    handleSchoolTableData.header = tmHeader;
    handleSchoolTableData.data = tmpTableData;
    return handleSchoolTableData;
}

export class BlockChildrenBasicTable extends React.Component {
    render() {
        let tHeader = this.props.tHeader;
        let tData = this.props.tData;
        return (
            <TableDefault tHeader={tHeader} tData={tData}/>
        )
    }
}