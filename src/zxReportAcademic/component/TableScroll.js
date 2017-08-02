import React from "react";
import $ from 'jquery';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

export default class TableDefault extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        $('.zx-table-scroll-tbody').mCustomScrollbar({
            theme: 'inset-3-dark',
            scrollInertia: 400,
            mouseWheel:{ scrollAmount: 200 },
        });

        // $('.zx-table-scroll tbody').mCustomScrollbar({
        //     theme: 'inset-3-dark',
        //     scrollInertia: 400,
        //     mouseWheel:{ scrollAmount: 200 },
        // });
    }


    render() {
        let data = this.props.data;
        //传入标题和数据
        let tHeader = data.tHeader;
        let tData = data.tData;
        //设置样式
        let tStyle = data.tStyle || 'bordered zx-table-default';

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });

        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let i = 0; i < data.length; i++) {
                td.push(<td key={i}>{data[i]}</td>);
            }
            return <tr key={index} className="zx-table-scroll-tbody-tr">{td}</tr>
        });

        return (
            <table className={tStyle}>
                <thead className="zx-table-scroll-thead">
                <tr className="zx-table-scroll-thead-tr">
                    {contentTHeader}
                </tr>
                </thead>

                <tbody className="zx-table-scroll-tbody">
                {contentTData}
                </tbody>
            </table>
        )
    }
}