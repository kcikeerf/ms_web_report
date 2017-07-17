import React, {Component} from 'react';
import $ from 'jquery';

import ChartScatterDefault from '../component/ChartScatterDefault';
import TableDefault from '../component/TableDefault';

let config = require('zx-const')[process.env.NODE_ENV];

class BlockChildrenBasicTable extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <TableDefault data={data}/>
        )
    }
}

class BlockChildrenBasicScatter extends Component {
    render() {
        let data = this.props.data;
        return (
            <ChartScatterDefault scatterData={data}/>
        )
    }
}

export function handleChildrenBasicTableData(reportType, header, data) {
    let handleSchoolTableData = {
        reportType: reportType,
        header: [],
        data: []
    };
    let tmHeader = header;
    let tmpTableData = [];
    if (data.length < 0) {
        return false;
    }

    let label, classNum, lentStudent, averageScore, diffDegree;
    for (let i = 0; i < data.length; i++) {
        if (data[i][1].report_data !== undefined) {
            let arr = [];
            let reportBase = data[i][1].report_data.data.knowledge.base;
            label = data[i][1].label;
            classNum = 9;
            lentStudent = parseFloat(reportBase.pupil_number) ? parseFloat(reportBase.pupil_number) : '暂无';
            averageScore = parseFloat(reportBase.weights_score_average).toFixed(2) ? parseFloat(reportBase.weights_score_average).toFixed(2) : '暂无';
            diffDegree = parseFloat(reportBase.diff_degree).toFixed(2) ? parseFloat(reportBase.diff_degree).toFixed(2) : '暂无';

            if (reportType === config.REFERENCE_PROJECT) {
                arr.push(label);
                arr.push(classNum);
                arr.push(lentStudent);
                arr.push(averageScore);
                arr.push(diffDegree);
            } else if (reportType === config.REFERENCE_GRADE) {
                arr.push(label);
                arr.push(lentStudent);
                arr.push(averageScore);
                arr.push(diffDegree);
            }

            tmpTableData.push(arr);
        }
    }

    handleSchoolTableData.header = tmHeader;
    handleSchoolTableData.data = tmpTableData;
    return handleSchoolTableData;
}

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
        scoreMax: null,
        data: []
    };
    let score, averageScore, diffDegree;
    let ScatterArrData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i][1].report_data !== undefined) {
            let reportBase = data[i][1].report_data.data.knowledge.base;

            let obj = {
                name: data[i][1].label,
                value: []
            };
            if (i === 0) {
                score = reportBase.total_full_score / reportBase.pupil_number;
            }
            averageScore = parseFloat(reportBase.weights_score_average).toFixed(2);
            diffDegree = parseFloat(reportBase.diff_degree).toFixed(2);
            obj.value.push(diffDegree);
            obj.value.push(averageScore);
            ScatterArrData.push(obj);
        }
    }
    handleSchoolScatterData.data.push(ScatterArrData);
    handleSchoolScatterData.scoreMax = score;

    return handleSchoolScatterData;
}

export class SectionChildrenBasic extends Component {

    render() {
        let data = this.props.data;
        let contentSchoolBaseTableDefault, contentSchoolBaseScatterDefault, blockTitle;

        //各学校散点图
        if (data) {
            contentSchoolBaseScatterDefault = <BlockChildrenBasicScatter data={data.chlidrenBasicScatterData}/>;
        }
        //学校基本信息表格
        if (data) {
            let tableData = {
                tHeader: data.childrenBasicTableData.header,
                tData: data.childrenBasicTableData.data
            };
            contentSchoolBaseTableDefault = <BlockChildrenBasicTable data={tableData}/>;
        }
        if (data.reportType === config.REPORT_TYPE_PROJECT) {
            blockTitle = '各学校表现情况';
        }
        if (data.reportType === config.REPORT_TYPE_GRADE) {
            blockTitle = '各班级表现情况';
        }
        return (
            <div className="zx-section-container scrollspy">
                <div className="col s12">
                    <div className="section">
                        <h2>{blockTitle}</h2>
                        {contentSchoolBaseScatterDefault}
                        {contentSchoolBaseTableDefault}
                    </div>
                    <div className="divider"></div>
                </div>
            </div>
        )
    }
}