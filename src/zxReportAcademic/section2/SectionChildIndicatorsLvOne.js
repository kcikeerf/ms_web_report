import React, {Component} from 'react';
import { Map, is } from 'immutable';
// import $ from 'jquery';

import TableDefault from '../component/TableDefault';
// let config = require('zx-const')[process.env.NODE_ENV];

//下一级一级指标的block
export class SectionChildIndicatorsLvOne extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let title = this.props.title;
        let data = this.props.data;

        let contentTableDefault;
        //学校基本信息表格
        if (data) {
            contentTableDefault = data.map((item, index) => {
                let tableData = {
                    tHeader: item.data.tHead,
                    tData: item.data.tData
                };
                return <div key={index} className="zx-school-indicators-margin">
                    <h3>{item.type}</h3>
                    <TableDefault key={index} data={tableData}/>
                </div>;
            })
        }

        return (
        <div className="zx-section-container scrollspy">
            <div className="col s12">
                <div className="section">
                    <h2>{title}</h2>
                    {contentTableDefault}
                </div>
                <div className="divider"></div>
            </div>
        </div>

        )
    }
}
