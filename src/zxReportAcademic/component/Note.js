import React from "react";

export default class Note extends React.Component {
    render() {
        let data = this.props.data;
        let content;
        content = data.map((dataItem, index) => {
            if (dataItem.type === 'p') {
                return <p key={index}>{dataItem.value}</p>
            }
        });
        return (
            <div className="zx-note-container">
                <div className="zx-note-content">
                    {content}
                </div>
            </div>
        )
    }
}