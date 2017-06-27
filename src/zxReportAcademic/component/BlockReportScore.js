import React, {Component} from 'react';
import $ from 'jquery';

let config = require('zx-const')[process.env.NODE_ENV];

export function handleBlockReportScore(reportType, fullScore, mainReportData, otherReportData) {
    let config = {
        project: {
            label: '区域平均分',
            icon: 'place'
        },
        grade: {
            label: '学校平均分',
            icon: 'alarm'
        },
        klass: {
            label: '班级平均分',
            icon: 'stars'
        },
        pupile: {
            label: '学生分数',
            icon: 'content_paste'
        }
    };

    let mainScore = mainReportData.data.knowledge.base;
    if (reportType !== 'pupil') {
        mainScore = mainScore.score_average ? mainScore.score_average : -1;
    }
    else {
        mainScore = mainScore.score ? mainScore.score : -1;
    }


    let modifiedData ={
        main: {
            type: reportType,
            fullScore: fullScore,
            value: parseFloat(mainScore).toFixed(2)
        },
        other: []
    };

    if (config.hasOwnProperty(reportType)) {
        modifiedData.main.label = config[reportType].label;
        modifiedData.main.icon = config[reportType].icon;
    }

    modifiedData.other = otherReportData.map((dataItem, index) => {
        let score = dataItem.data.knowledge.base.score_average;
        let scoreData = {
            type: dataItem.type,
            order: dataItem.order,
            value: score ? parseFloat(score).toFixed(2) : -1
        };
        if (config.hasOwnProperty(dataItem.type)) {
            scoreData.label = config[reportType].label;
            scoreData.icon = config[reportType].icon;
        }


        return scoreData;
    });

    return modifiedData;
}

export class BlockReportScore extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        let mainData = this.props.data.main;
        let otherData = this.props.data.other;

        return (
            <div className="section">
                <h2 className="zx-header-highlight zx-header-highlight-teal">成绩</h2>
                <div className="zx-basic-info-container">
                    <div>
                        <div>
                            <div>{mainData.value}</div>
                            <div>{mainData.label}</div>
                        </div>
                        <div>满分{mainData.fullScore}</div>
                    </div>
                </div>
            </div>
        )
    }
}