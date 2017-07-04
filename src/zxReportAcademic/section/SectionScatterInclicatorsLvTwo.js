import React, {Component} from 'react';
import ChartScatterDefault from '../component/ChartScatterDefault';

let config = require('zx-const')[process.env.NODE_ENV];

//处理各维度二级指标
export function handleScatterInclicatorsLvTwoData(data,optional) {
    let dataArr = [];
    let valueArr = [];
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
    dataArr.push(optional);
    return dataArr;
}

class BlockScatterInclicatorsLvTwo extends Component {
    handleChildrenBasicScatterDataTwo(title, data) {
        if (data.length < 0) {
            return false
        }
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
            data: [data]
        };
        return handleScatterData;
    }

    render() {
        let propsData = this.props.data;
        let data;
        let inclicatorsLvTwo = propsData.map((item, index) => {
            if (item[1] === 'ability') {
                let title = '能力';
                data = this.handleChildrenBasicScatterDataTwo(title, item[0]);
                return <ChartScatterDefault scatterData={data}/>
            }
            if (item[1] === 'knowledge') {
                let title = '知识';
                data = this.handleChildrenBasicScatterDataTwo(title, item[0]);
                return <ChartScatterDefault scatterData={data}/>
            }
            if (item[1] === 'skill') {
                let title = '技能';
                data = this.handleChildrenBasicScatterDataTwo(title, item[0]);
                return <ChartScatterDefault scatterData={data}/>
            }
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
