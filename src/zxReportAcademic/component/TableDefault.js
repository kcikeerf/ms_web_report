import React from "react";

export default class TableDefault extends React.Component {
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
            return <tr key={index}>{td}</tr>
        });

        return (
            <table className={tStyle}>
                <thead>
                <tr>
                    {contentTHeader}
                </tr>
                </thead>

                <tbody>
                {contentTData}
                </tbody>
            </table>
        )
    }
}