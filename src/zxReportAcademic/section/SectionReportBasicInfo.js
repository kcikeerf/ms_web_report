import React, {Component} from 'react';
import { Map, is } from 'immutable';
// import $ from 'jquery';
// let config = require('zx-const')[process.env.NODE_ENV];

//报告基本信息处理方法
function handleBlockReportBasicInfo(data, options) {
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
            label: '学校',
            icon: 'account_balance'
        },
        klassNumber: {
            label: '班级',
            icon: 'class'
        },
        studentNumber: {
            label: '测试人数',
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
        let id = this.props.id;
        let title = this.props.title;
        let data = handleBlockReportBasicInfo(this.props.data);
        let contentBasicInfo;
        if (data) {
            contentBasicInfo = data.map((dataItem, index) => {
                return (
                    <div key={index} className="Grid-cell">
                        <div className="zx-basic-container">
                            <div className="zx-basic-item">
                                <i className="material-icons">{dataItem.icon}</i>
                                <div className="zx-basic-title">{dataItem.label}</div>
                                <div className="zx-basic-content">{dataItem.value}</div>
                            </div>
                        </div>
                    </div>
                );
            });
        }

        return (
            <div id={id} className="zx-section-container">
                <div className="section">
                    {/*<h2>{title}</h2>*/}
                    <div className="Grid Grid--gutters Grid--1of3">
                        {contentBasicInfo}
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        )
    }
}