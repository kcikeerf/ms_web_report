import React, {Component} from 'react';
import $ from 'jquery';

let config = require('zx-const')[process.env.NODE_ENV];

export function handleBlockReportTitle(data, options) {
    let config = {
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
        let type = dataItem.type;
        if (config.hasOwnProperty(type)) {
            dataItem.label = config[type].label;
            dataItem.icon = config[type].icon;
        }

        return dataItem;
    });

    console.log(modifiedData);

    return modifiedData;
}

export class BlockReportTitle extends Component {
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
                <div key={index} className="zx-basic-info-box">
                    <div className="zx-basic-info-icon"><i className="material-icons">{dataItem.icon}</i></div>
                    <div className="zx-basic-info-content">
                        <div className="zx-basic-info-subtitle">{dataItem.label}</div>
                        <div className="zx-basic-info-title">{dataItem.value}</div>
                    </div>
                </div>
            );
        });

        return (
            <div className="section">
                <h3 className="zx-header-highlight zx-header-highlight-teal">基本信息</h3>
                <div className="zx-basic-info-container">
                    {contentBasicInfo}
                </div>
            </div>
        )
    }
}