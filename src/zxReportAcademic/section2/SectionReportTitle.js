import React, {Component} from 'react';
import { Map, is } from 'immutable';

export class SectionReportTitle extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render(){
        let id = this.props.id;
        let data = this.props.data;
        let reportTitle = data.reportTitle;
        let reportHeading = data.reportHeading;
        let reportLabel = data.reportLabel;
        return(
            <div id={id} className="header">
                <div className="zx-title-container">
                    <div className="zx-subtitle">
                        <div className="zx-report-title">{reportTitle}</div>
                        <div className="zx-report-type">{reportLabel}</div>
                    </div>
                    <h1>{reportHeading}</h1>
                </div>
            </div>
        )
    }
}