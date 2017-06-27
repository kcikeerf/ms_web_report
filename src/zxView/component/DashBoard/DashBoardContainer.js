import React from 'react';
import $ from 'jquery';

import handleAllEchartsResize from 'zx-chart/handleAllEchartsResize';
import DashBoardProject from './DashBoardProject';

let config = require('zx-const')[process.env.NODE_ENV];

class DashBoardContainer extends React.Component {
    constructor() {
       super();
       this.state = {
           activeReportList: null
       }
    }

    handleDashBoardShow(el) {
        let targetId = '#zx-' + $(el).attr('data-user');
        $(targetId).addClass('show');
        $(targetId).siblings().removeClass('show');

        handleAllEchartsResize();
    }

    handleDashBoardData(activeReportList) {
        this.setState({
            activeReportList: activeReportList
        });
    }

    render() {
        let activeReportList = this.state.activeReportList;
        let reportChinese = [], reportMath = [], reportEnglish = [];
        for (let i in activeReportList) {
            let report = activeReportList[i];
            if (report.subject === config.REPORT_CHINESE) {
                reportChinese.push(report);
            }
            else if (report.subject === config.REPORT_MATH) {
                reportMath.push(report);
            }
            else if (report.subject === config.REPORT_ENGLISH) {
                reportEnglish.push(report);
            }
        }

        // @TODO: 监测mutate的情况
        let activeReportData = [
            {
                subject: 'chinese',
                order: 4,
                data: reportChinese
            },
            {
                subject: 'math',
                order: 2,
                data: reportMath
            },
            {
                subject: 'english',
                order: 3,
                data: reportEnglish
            }
        ];

        let contentDashBoard;
        let bindedUsers = this.props.bindedUsers;
        if (bindedUsers) {
            contentDashBoard = bindedUsers.map((bindedUser, index) => {
                let dashBoard;
                if (bindedUser.role === config.USER_ROLE_AREA_ADMINISTRATOR) {
                    dashBoard = <DashBoardProject
                        key={index}
                        id={index}
                        wxOpenId={this.props.wxOpenId}
                        userName={bindedUser.user_name}
                        userDisplayName={bindedUser.name}
                        userRole={bindedUser.role}
                        activeReportData={activeReportData}
                    />
                }
                else {
                    dashBoard = <DashBoardProject
                        key={index}
                        id={index}
                        wxOpenId={this.props.wxOpenId}
                        userName={bindedUser.user_name}
                        userDisplayName={bindedUser.name}
                        userRole={bindedUser.role}
                        activeReportData={activeReportData}
                    />
                }

                return dashBoard;
            });
        }

        return (
            <div className="zx-dashboard-container">
                {contentDashBoard}
            </div>

        )
    }
}

export default DashBoardContainer;