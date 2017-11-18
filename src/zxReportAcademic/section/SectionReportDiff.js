import React, {Component} from 'react';
import { Map, is } from 'immutable';

import ReactEchartsPictorialBar from 'zx-chart/PictorialBar';

//成绩block
export class SectionReportDiff extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let id = this.props.id;
        let title = this.props.title;
        let data = this.props.data;

        let fullValue = data.fullValue;
        let selfValue = data.selfValue;
        let parentValues = data.parentValues;
        let allValues = [selfValue, ...parentValues];

        // 说明
        let note = this.props.options.note;

        // 分化度表现对比表数据
        let contentTData = allValues.map((data, index) => {
            let value = data.value;
            let level, style;
            if (value >= 30) {
                level = 3;
                style = 'zx-diff-item zx-diff-item-failed';
            }
            else if (value >= 20) {
                level = 2;
                style = 'zx-diff-item zx-diff-item-good';
            }
            else {
                level = 1;
                style = 'zx-diff-item zx-diff-item-excellent';
            }

            let td = [];
            for (let i = 1; i <= 3; i++) {
                if (i === level) {
                    td.push(<td key={i}><div className={style}>{value}</div></td>);
                }
                else {
                    td.push(<td key={i}><div className='zx-diff-item zx-diff-item-default'></div></td>);
                }
            }

            return (
                <tr key={index}>
                    <td>{data.label}</td>
                    {td}
                </tr>
            );
        });

        return (
            <div id={id} className="zx-section-container">
                <div className="section">
                    <h2>{title}</h2>
                    <div className="row">
                        <div className="col s12">
                            <div className="zx-note-container">
                                <div className="zx-note-icon"><i className="material-icons">info_outline</i></div>
                                <div className="zx-note-content">
                                    <p>分化度低于20, 代表学生的成绩差异小，分层教学压力低</p>
                                    <p>分化度大于30, 代表学生的成绩差异大，需要考虑分层教学</p>
                                    <p>{note}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col s12">
                            <table className='zx-diff-table'>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>均衡度高</th>
                                    <th>均衡度中</th>
                                    <th>均衡度低</th>
                                </tr>
                                </thead>
                                <tbody>
                                {contentTData}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>

        )
    }
}