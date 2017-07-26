import React, {Component} from 'react';
import { Map, is } from 'immutable';
// import $ from 'jquery';
// let config = require('zx-const')[process.env.NODE_ENV];

//报告基本信息处理方法
export function handleBlockReportBasicInfo(data, options) {
    let config = {
        testDistrict: {
            label: '地区',
            icon: 'place'
        },
        testDuration: {
            label: '时长',
            icon: 'alarm'
        },
        testFullScore: {
            label: '满分',
            icon: 'stars'
        },
        testSubject: {
            label: '科目',
            icon: 'content_paste'
        },
        testGrade: {
            label: '年级',
            icon: 'flag'
        },
        testType: {
            label: '类型',
            icon: 'create'
        },
        schoolNumber: {
            label: '学校数目',
            icon: 'account_balance'
        },
        klassNumber: {
            label: '班级数目',
            icon: 'class'
        },
        studentNumber: {
            label: '学生人数',
            icon: 'people'
        },
        testDate: {
            label: '时间',
            icon: 'access_time'
        },
        coursTeacher: {
            label: '任课教师',
            icon: 'assignment_ind'
        },
        schoolName: {
            label: '学校',
            icon: 'account_balance'
        },
        klassName: {
            label: '班级',
            icon: 'class'
        }
    };

    let modifiedData = data.map((dataItem , index) => {
        let newDataItem = {...dataItem};
        let type = dataItem.type;
        if (config.hasOwnProperty(type)) {
            newDataItem.label = config[type].label;
            newDataItem.icon = config[type].icon;
        }

        return newDataItem;
    });

    return modifiedData;
}

//报告基本信息block
export class SectionReportBasicInfo extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let data = this.props.data;
        let contentBasicInfo;
        contentBasicInfo = data.map((dataItem, index) => {
            return (
                <div key={index} className="Grid-cell">
                    <div className="zx-basic-container">
                        <div className="zx-basic-item">
                            <div className="zx-basic-header">
                                <div className="zx-basic-title">{dataItem.label}</div>
                                <i className="material-icons">{dataItem.icon}</i>
                            </div>
                            <div className="zx-basic-body">
                                <div className="zx-basic-content">{dataItem.value}</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div id='zx-report-basic-info' className="zx-section-container scrollspy">
                <div className="section">
                    <h2>基本信息</h2>
                    <div className="Grid Grid--gutters Grid--1of3">
                        {contentBasicInfo}
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        )
    }
}