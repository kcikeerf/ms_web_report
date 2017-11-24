import React from "react";
import $ from 'jquery';

import 'zx-style/customScrollBar/customScrollBar.css';

require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

let config = require('zx-const')[process.env.NODE_ENV];

export default class TableScroll extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        $('.zx-table-scroll tbody').mCustomScrollbar({
            theme: 'inset-3-dark',
            scrollInertia: 400,
            mouseWheel: {scrollAmount: 200}
        });
    }

    render() {
        let reportType, anohterTr;
        let projectData = this.props.projectData;

        if (this.props.data) {
            reportType = this.props.reportType
        }

        if (reportType && reportType === config.REPORT_TYPE_PROJECT) {
            anohterTr = <tr className="zx-report-data">
                <th>区域</th>
                <th>{projectData.projectPupilNumber}</th>
                <th>{projectData.projectAverageScore}</th>
                <th>{projectData.projectDiffDergree}</th>
            </tr>
        }
        else if (reportType && reportType === config.REPORT_TYPE_GRADE) {
            anohterTr = <tr className="zx-report-data">
                <th>区域</th>
                <th>{projectData.projectPupilNumber}</th>
                <th>{projectData.projectAverageScore}</th>
                <th>{projectData.projectDiffDergree}</th>
            </tr>
        }

        let data = this.props.data;
        //传入标题和数据
        let tHeader = data.tHeader;
        let tData = data.tData;
        //设置样式
        let tStyle = data.tStyle || 'bordered zx-table-scroll';

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });

        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let i = 0; i < data.length; i++) {
                td.push(<td key={i}>{data[i]}</td>);
            }
            return <tr key={index}>{td}</tr>
        });

        return (
            <table className={tStyle}>
                <thead>
                <tr>
                    {contentTHeader}
                </tr>
                {anohterTr}
                </thead>

                <tbody>
                {contentTData}
                </tbody>
            </table>
        )
    }
}