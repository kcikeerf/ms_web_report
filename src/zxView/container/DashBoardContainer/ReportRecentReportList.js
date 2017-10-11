import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';
import {Map, is} from 'immutable';
import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

let config = require('zx-const')[process.env.NODE_ENV];

class ReportRecentReportList extends React.Component {

    handleReport(e) {
        e.preventDefault();
        e.stopPropagation();

        let target = $(e.target).parents('tr');
        let userName = this.props.user.userName;
        let userRole = this.props.user.userRole;
        let reportUrl = target.attr('data-url');
        let reportSrc = config.URL_REPORT_ACADEMIC;

        createCookie(config.COOKIE.SELECTED_ACCESS_TOKEN, this.props.selectedAccessToken, 1);
        createCookie('report_url', reportUrl, 1);

        let reportInfo = {
            reportName: '',
            reportUrl: reportUrl,
        };

        this.props.handleReportIframeShow(reportSrc, reportInfo);
    }

    render() {
        let data = this.props.data;
        let id = this.props.id;
        let chineseData = data.chinese;
        let mathData = data.math;
        let englishData = data.english;
        let contentChinese =  chineseData.map(function (item,index) {
           return <tr key={index} data-url={item.report_url} onClick={this.handleReport.bind(this)}>
                    <td>{item.paper_heading}</td>
                    <td>{item.quiz_date}</td>
           </tr>;
        }.bind(this));

        let contentMath =  mathData.map(function (item,index) {
            return <tr key={index} data-url={item.report_url} onClick={this.handleReport.bind(this)}>
                <td>{item.paper_heading}</td>
                <td>{item.quiz_date}</td>
            </tr>;
        }.bind(this));

        let contentEnglish =  englishData.map(function (item,index) {
            return <tr key={index} data-url={item.report_url} onClick={this.handleReport.bind(this)}>
                <td>{item.paper_heading}</td>
                <td>{item.quiz_date}</td>
            </tr>;
        }.bind(this));

        return (
            <div className="col s12">
                <ul className="tabs">
                    <li className="tab col s4"><a className="active" href={`#${id}-chinese`}>语文</a></li>
                    <li className="tab col s4"><a href={`#${id}-math`}>数学</a></li>
                    <li className="tab col s4"><a href={`#${id}-english`}>英语</a></li>
                </ul>
                <div id={`${id}-chinese`} className="col s12">
                    <table className="responsive-table highlight">
                        <tbody>
                            {contentChinese}
                        </tbody>
                    </table>
                </div>
                <div id={`${id}-math`} className="col s12">
                    <table className="responsive-table highlight">
                        <tbody>
                            {contentMath}
                        </tbody>
                    </table>
                </div>
                <div id={`${id}-english`} className="col s12">
                    <table className="responsive-table highlight">
                        <tbody>
                             {contentEnglish}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

ReportRecentReportList.contextTypes = {
    router: PropTypes.object.isRequired,
    handleReportIframeShow: PropTypes.func
};

export default ReportRecentReportList;