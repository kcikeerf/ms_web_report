import React, {Component} from 'react';
import ChartScatterDefault from '../component/ChartScatterDefault';
import TableDefault from '../component/TableDefault';


//处理各维度二级指标为表格
export function handletableInclicatorsLvTwoData(reportType, header, minData, otherData) {
    //TODO@ otherData 暂时没有做处理
    let inclicatorsLv1TableData = {
        reportType: reportType,
        tHeader: [],
        tData: []
    };
    let lvnData = minData.lv_n;
    let tmpTableData = [];
    lvnData.map((item, index) => {

        for (let i in item) {

            item[i].items.map((item, index) => {
                let value = [];
                for (let i in item) {
                    let name = item[i].checkpoint;
                    let diff_degree = item[i].diff_degree;
                    let score_average_percent = item[i].score_average_percent;
                    value.push(name);
                    value.push((parseFloat((`${score_average_percent}`) * 100).toFixed(2)));
                    value.push(parseFloat(diff_degree).toFixed(2));
                }
                tmpTableData.push(value)
            });
        }
    });
    inclicatorsLv1TableData.tHeader = header;
    inclicatorsLv1TableData.tData = tmpTableData;

    return inclicatorsLv1TableData;
}

//处理各维度二级指标为散点图
export function handleScatterInclicatorsLvTwoData(data, title) {
    let dataArr = [];
    let valueArr = [];
    let handleScatterData = {
        title: title,
        label: {
            x: '分化度',
            y: '平均得分率'
        },
        isInverse: {
            x: true,
            y: false
        },
        data: []
    };
    data.lv_n.map((item, index) => {
        for (let i in item) {
            item[i].items.map((item, index) => {
                for (let i in item) {
                    let name = item[i].checkpoint;
                    let diff_degree = item[i].diff_degree;
                    let score_average_percent = item[i].score_average_percent;
                    let value = [];
                    value.push(parseFloat(diff_degree).toFixed(2));
                    value.push((parseFloat((`${score_average_percent}`)*100).toFixed(2)));
                    valueArr.push({name, value});
                }
            })
        }
    });
    dataArr.push(valueArr);

    handleScatterData.data = dataArr;
    return handleScatterData;
}

class BlockScatterInclicatorsLvTwo extends Component {

    render() {
        let propsData = this.props.data;
        let chartScatterInclicatorsData=propsData.chartScatterInclicatorsData;
        let tableInclicatorsLv1Data=propsData.tableInclicatorsLv1Data;
        return (
            <div>
                <ChartScatterDefault scatterData={chartScatterInclicatorsData}/>
                <TableDefault data = {tableInclicatorsLv1Data}/>
            </div>
        )
    }
}

export class SectionScatterInclicatorsLvTwo extends Component {

    render() {
        let propsData = this.props.data;
        let contentScatterInclicatorsLvTwo;
        let inclicatorsSystemDataKey=Object.keys(propsData);
        contentScatterInclicatorsLvTwo = inclicatorsSystemDataKey.map(function (obj,index) {
            let data = propsData[obj];
            return <BlockScatterInclicatorsLvTwo key={index} data = {data}/>
        });

        return (
        <div className="row">
            <div className="col s12">
                <div className="section">
                    <h2>各维度指标分型图</h2>
                    {contentScatterInclicatorsLvTwo}
                </div>
                <div className="divider"></div>
            </div>
        </div>

        )
    }
}
