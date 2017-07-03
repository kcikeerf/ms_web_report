import React, {Component} from 'react';
import $ from 'jquery';

let config = require('zx-const')[process.env.NODE_ENV];

export function handleBlockReportBasicInfo(data, options) {
    let config = {
        testDistrict: {
            label: '测试地区',
            icon: 'place'
        },
        testDuration: {
            label: '测试时长',
            icon: 'alarm'
        },
        testFullScore: {
            label: '测试满分',
            icon: 'stars'
        },
        testSubject: {
            label: '测试科目',
            icon: 'content_paste'
        },
        testGrade: {
            label: '测试年级',
            icon: 'flag'
        },
        testType: {
            label: '测试类型',
            icon: 'create'
        },
        schoolNumber: {
            label: '学校数目',
            icon: 'account_balance'
        },
        studentNumber: {
            label: '学生人数',
            icon: 'people'
        },
        testDate: {
            label: '测试时间',
            icon: 'access_time'
        },
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

export class SectionReportBasicInfo extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        let data = this.props.data;

        let contentBasicInfo;
        contentBasicInfo = data.map((dataItem, index) => {
            return (
                <div className="Grid-cell">
                    <div key={index} className="zx-basic-info-box">
                        <div className="zx-basic-info-icon"><i className="material-icons">{dataItem.icon}</i></div>
                        <div className="zx-basic-info-content">
                            <div className="zx-basic-info-subtitle">{dataItem.label}</div>
                            <div className="zx-basic-info-title">{dataItem.value}</div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="section">
                <h2 className="zx-header-highlight zx-header-highlight-teal">基本信息</h2>
                <div className="Grid Grid--gutters Grid--1of3">
                    {contentBasicInfo}
                </div>
            </div>
        )
    }
}