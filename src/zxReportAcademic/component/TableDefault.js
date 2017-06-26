import React from 'react';

class TableDefault extends React.Component {
    render() {
        //传入标题和数据
        let tHeader = this.props.tHeader;
        let tData = this.props.tData;
        //设置样式
        let TableStyle = this.props.TableStyle || 'responsive-table highlight';

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });

        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let i=0; i<data.length;i++) {
                td.push(<td key={i}>{data[i]}</td>);
            }
            return <tr key={index}>{td}</tr>
        });

        return (
            <table className={TableStyle}>
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

export default TableDefault;