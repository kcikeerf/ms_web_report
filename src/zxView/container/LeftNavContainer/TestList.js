import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import ProjectItem from './ProjectItem';

export default class TestList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTestList: null
        }
    }

    render() {
        let selectedTestList = this.props.selectedTestList;
        let contentTestList;
        let contentTestListTitle = <div className="zx-list-subtitle">报告列表加载中...</div>;
        let preloader = 'preloader-wrapper active zx-preloader show';
        if (selectedTestList) {
            contentTestListTitle = null;
            preloader = 'preloader-wrapper zx-preloader hide';
            contentTestList = selectedTestList.map((testItem, index) => {
                return <ProjectItem
                    key={index}
                    selectedAccessToken={this.props.selectedAccessToken}
                    selectedUserName={this.props.selectedUserName}
                    selectedUserRole={this.props.selectedUserRole}
                    reportName={testItem.name}
                    reportUrl={testItem.report_url}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            });
            contentTestList =
                <ul className="zx-collapsible-parent">
                    {contentTestList}
                </ul>
            ;
        }

        return (
            <div className="zx-test-list-container">
                <div className="zx-preloader-report-list-container">
                    <div className={preloader}>
                        <div className="spinner-layer">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {contentTestList}
            </div>
        )
    }
}

TestList.contextTypes = {
    handleReportIframeShow: PropTypes.func
};