import React, {Component} from 'react';
import ChartScatterDefault from '../component/ChartScatterDefault';

let config = require('zx-const')[process.env.NODE_ENV];

//处理各维度二级指标
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
        let inclicatorsLvTwo = propsData.map((item, index) => {
                return <ChartScatterDefault scatterData={item}/>
        });
        return (
            <div>
                {inclicatorsLvTwo}
            </div>

        )
    }
}

export class SectionScatterInclicatorsLvTwo extends Component {

    render() {
        let data = this.props.data;
        let contentScatterInclicatorsLvTwo;
        //散点图
        if (data) {
            contentScatterInclicatorsLvTwo = <BlockScatterInclicatorsLvTwo data={data}/>;
        }

        return (
            <div className="section">
                <h2 className="zx-header-highlight zx-header-highlight-teal">各维度指标分型图</h2>
                {contentScatterInclicatorsLvTwo}
            </div>
        )
    }
}
