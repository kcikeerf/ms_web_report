import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import createCookie from 'zx-misc/createCookie';

let config = require('zx-const')[process.env.NODE_ENV];

export default class TableAction extends React.Component {
    handleReport(e) {
        e.preventDefault();
        e.stopPropagation();

        let target = $(e.target).parents('tr');
        let userName = this.props.user.userName;
        let userRole = this.props.user.userRole;
        let reportUrl = target.attr('data-url');
        let reportSrc;
        if (userRole === config.USER_ROLE_AREA_ADMINISTRATOR) {
            reportSrc = config.URL_REPORT_ACADEMIC_PROJECT;
        }
        else if (userRole === config.USER_ROLE_TENANT_ADMINISTRATOR) {
            reportSrc = config.URL_REPORT_ACADEMIC_GRADE;
        }
        else if (userRole === config.USER_ROLE_PUPIL) {
            reportSrc = config.URL_REPORT_ACADEMIC_STUDENT;
        }
        createCookie('user_name', userName, 1);
        createCookie('report_url', reportUrl, 1);

        let reportInfo = {
            reportName: '',
            reportUrl: reportUrl,
        };

        this.props.handleReportIframeShow(reportSrc, reportInfo);
    }

    render() {
        let tHeader = this.props.tHeader;
        let tData = this.props.tData;
        let tAction = this.props.tAction;

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });

        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    let content = data[property];
                    if (property == '1') {
                        content = <a href="/">{content}</a>
                    }
                    td.push(<td key={property}>{content}</td>);
                }
            }
            return <tr key={index} data-url={tAction[index]} onClick={this.handleReport.bind(this)}>{td}</tr>
        });

        return (
            <table className="responsive-table highlight">
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

TableAction.contextTypes = {
    handleReportIframeShow: PropTypes.func
};

