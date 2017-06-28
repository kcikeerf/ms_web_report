import React, {Component} from 'react';
import BlockChartScatterDefault from '../component/ChartScatterDefault';
import TableDefault from '../component/TableDefault';

let config = require('zx-const')[process.env.NODE_ENV];

class BlockChildrenBasicTable extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <TableDefault data={data} />
        )
    }
}

class BlockChildrenBasicScatter extends Component {
    render() {
        let data = this.props.data;
        return (
            <BlockChartScatterDefault scatterData={data} />
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

export class SectionChildrenBasic extends Component{

    render(){
        let chlidrenBasicData = this.props.chlidrenBasicData;
        let contentSchoolBaseTableDefault,contentSchoolBaseScatterDefault;

        //各学校散点图
        if(chlidrenBasicData){
            contentSchoolBaseScatterDefault  = <BlockChildrenBasicScatter data={chlidrenBasicData.chlidrenBasicScatterData} />;
        }
        //学校基本信息表格
        if(chlidrenBasicData){
            let tableData = {
                tHeader: chlidrenBasicData.chlidrenBasicTitleData.header,
                tData: chlidrenBasicData.chlidrenBasicTitleData.data
            };
            contentSchoolBaseTableDefault  = <BlockChildrenBasicTable data={tableData}/>;
        }
        return(
            <div className="section">
                <h2 className="zx-header-highlight zx-header-highlight-teal">各学校表现情况</h2>
                {contentSchoolBaseScatterDefault}
                {contentSchoolBaseTableDefault}
            </div>
        )
    }
}