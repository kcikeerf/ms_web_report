import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';
import ReportItem from './ReportItem';

let config = require('zx-const')[process.env.NODE_ENV];

class UserItem extends React.Component {
    constructor() {
        super();
        this.state = {
            reportList: null,
            active: false,
            icon: 'keyboard_arrow_down'
        }
    }
    componentDidMount() {
        if (this.props.id === 0) {
            $(this.li).addClass('active');
            $(this.li).children('.collapsible-header').addClass('active');
            $(this.li).children('.collapsible-body').slideDown(300);
            this.setState({
                active: true,
                icon: 'keyboard_arrow_up'
            });
            this.handleReportList();
        }
    }
    handleExpand(e) {
        let el = $(e.target).closest('li');
        this.props.handleDashBoardShow(el);
        let isActive = el.hasClass('active');
        if (isActive) {
            this.setState({
                active: true,
                icon: 'keyboard_arrow_up'
            });
            if (!this.state.reportList) {
                this.handleReportList();
            }
            this.props.handleDashBoardData(this.state.reportList);
        }
        else {
            this.setState({
                active: false,
                icon: 'keyboard_arrow_down'
            });

        }
    }

    handleReportList() {
        let wxOpenId = this.props.wxOpenId;
        let userName = this.props.userName;

        let apiAddressReportList = config.API_DOMAIN + config.API_GET_REPORT_LIST_ACADEMIC;

        let data = {
            'user_name': userName,
            'wx_openid': wxOpenId
        };

        $.post(apiAddressReportList, data, function(response, status) {
                this.setState({
                    reportList: response.sort(this.sortReportDateDesc)
                });
                this.props.handleDashBoardData(response);
            }.bind(this),
            'json')
            .fail(function(status) {

            });
    }

    sortReportDateDesc(a, b) {
        let aDate = new Date(a.quiz_date).getTime();
        let bDate = new Date(b.quiz_date).getTime();
        let diff = aDate - bDate;
        if (diff >= 0) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        let reportList = this.state.reportList;
        let contentReportList;
        if (reportList) {
            let reportItems = reportList.map((reportItem, index) => {
                return <ReportItem
                    key={index}
                    wxOpenId={this.props.wxOpenId}
                    userName={this.props.userName}
                    reportName={reportItem.paper_heading}
                    reportUrl={reportItem.report_url}
                    handleReportIframe={this.props.handleReportIframe.bind(this)}
                />
            });
            contentReportList = <ul className="collapsible zx-collapsible-child" data-collapsible="expandable">{reportItems}</ul>
        }
        else {
            contentReportList = <span className="zy-text-align-center">报告加载中...</span>
        }
        return (
            <li data-user={this.props.userName} onClick={this.handleExpand.bind(this)} ref={(li) => {this.li = li;}}>
                <div className="collapsible-header zx-vertical-align">
                    <i className="material-icons">person</i>
                    <span className="zx-flex-grow-1">{this.props.userDisplayName}</span>
                    <i className="material-icons zx-icon-expand zx-icon-right">{this.state.icon}</i>
                </div>
                <div className="collapsible-body">
                    {contentReportList}
                </div>
            </li>
        )
    }
}

UserItem.contextTypes = {
    handleReportIframe: PropTypes.func,
    handleDashBoardShow: PropTypes.func,
    handleDashBoardData: PropTypes.func
};

export default UserItem;