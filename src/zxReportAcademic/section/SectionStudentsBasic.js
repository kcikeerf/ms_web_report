import React, {Component} from 'react';
import {Map, is} from 'immutable';

import ChartScatterCircle from '../component/ChartScatterCircle';
import TableScroll from '../component/TableScroll';

//下一级基本信息block
export class SectionStudentsBasic extends Component {
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
            // let chlidScatterData = handleChildBasicScatterData(chlidBasicScatterData);
            contentChildBaseScatterDefault = <BlockChildBasicScatter data={chlidBasicScatterData}/>;

            //表格
            let childBasicTableData = data.childBasicTableData;
            contentChildBaseTableScroll = <BlockChildBasicTable data={childBasicTableData}/>;
        }

        return (
            <div id={id} className="zx-section-container">
                <div className="col s12">
                    <div className="section">
                        <h2>{title}</h2>
                        <div className="zx-note-container">
                            <div className="zx-note-icon"><i className="material-icons">info_outline</i></div>
                            <ul className="zx-note-content">
                                <li className="zx-quiz-note">越靠近圆心成绩越好，最里层圆内分布的点越多，班级优秀生人数越多</li>
                                <li className="zx-quiz-note">成绩相同的学生在同一圆周上</li>
                                <li className="zx-quiz-note">红色圆环表示及格临界生区间(及格临界生区间：及格分数线下5分～及格分数线)</li>
                                <li className="zx-quiz-note">黄色圆环表示优秀临界生区间(优秀临界生区间：优秀分数线下5分～优秀分数线)</li>
                            </ul>
                        </div>
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
            <ChartScatterCircle data={data}/>
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