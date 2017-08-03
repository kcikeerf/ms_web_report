import React, {Component} from 'react';
import {Map, is} from 'immutable';
// import $ from 'jquery';

import ChartScatterForChildBasic from '../component/ChartScatterForChildBasic';
import TableScroll from '../component/TableScroll';

// let config = require('zx-const')[process.env.NODE_ENV];

//下一级基本信息block
export class SectionChildBasic extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let id = this.props.id;
        let title = this.props.title;
        let data = this.props.data;
        let contentChildBaseScatterDefault, contentChildBaseTableScroll;

        if (data) {
            //散点图
            let chlidBasicScatterData = data.chlidBasicScatterData;
            let chlidScatterData = handleChildBasicScatterData(chlidBasicScatterData);
            contentChildBaseScatterDefault = <BlockChildBasicScatter data={chlidScatterData}/>;

            //表格
            let childBasicTableData = data.childBasicTableData;
            contentChildBaseTableScroll = <BlockChildBasicTable data={childBasicTableData}/>;
        }

        return (
            <div id={id} className="zx-section-container">
                <div className="col s12">
                    <div className="section">
                        <h2>{title}</h2>
                        {contentChildBaseScatterDefault}
                        {contentChildBaseTableScroll}
                    </div>
                    <div className="divider"></div>
                </div>
            </div>
        )
    }
}

//下一级基本信息散点图block
class BlockChildBasicScatter extends Component {
    render() {
        let data = this.props.data;
        return (
            <ChartScatterForChildBasic data={data}/>
        )
    }
}

//下一级散点图数据的方法
function handleChildBasicScatterData(data) {
    if (data.length < 0) {
        return false
    }
    let modifiedData = {
        data: [data.data, data.selfAndParentData],
        options: {
            xAxis: {
                name: '分化度',
                min: 0,
                max: data.fullDiff,
                inverse: true
            },
            yAxis: {
                name: '平均分',
                min: 0,
                max: data.fullScore,
            }
        }
    };

    return modifiedData;
}

//下一级基本信息表格block
class BlockChildBasicTable extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <TableScroll data={data}/>
        )
    }
}