import React from 'react';
//let config = require('zx-const')[process.env.NODE_ENV];

class TableDefault extends React.Component {
    render() {
        let tHeader = this.props.tHeader;
        let tData = this.props.tData;

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });

        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    td.push(<td key={property}>{data[property]}</td>);
                }
            }
            return <tr key={index}>{td}</tr>
        });

        return (
            <table className="highlight">
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