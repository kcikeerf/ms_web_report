import React from 'react';
import PropTypes from 'prop-types'; // ES6
import {Map, is} from 'immutable';
import $ from 'jquery';

import DashBoardAreaContainer from './DashBoardAreaContainer';
import DashBoardOtherContaniner from './DashBoardOtherContaniner';

let config = require('zx-const')[process.env.NODE_ENV];

class DashBoardContainer extends React.Component {

    render() {
        let dashBordContainer;
        if (this.props.selectedUserRole) {
            if (this.props.selectedUserRole === config.USER_ROLE_AREA_ADMINISTRATOR) {
                dashBordContainer = <DashBoardOtherContaniner
                    mainUser={this.props.mainUser}
                    mainAccessToken={this.props.mainAccessToken}
                    selectedAccessToken={this.props.selectedAccessToken}
                    selectedUserName={this.props.selectedUserName}
                    selectedUserRole={this.props.selectedUserRole}
                    selectedUserDisplayName={this.props.selectedUserDisplayName}
                    selectedTestList={this.props.selectedTestList}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />;
            } else {
                dashBordContainer = <DashBoardOtherContaniner
                    mainUser={this.props.mainUser}
                    mainAccessToken={this.props.mainAccessToken}
                    selectedAccessToken={this.props.selectedAccessToken}
                    selectedUserName={this.props.selectedUserName}
                    selectedUserRole={this.props.selectedUserRole}
                    selectedUserDisplayName={this.props.selectedUserDisplayName}
                    selectedTestList={this.props.selectedTestList}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />;
            }
        }

        return (
            <div>
                {dashBordContainer}
            </div>

        )
    }
}

DashBoardContainer.contextTypes = {
    router: PropTypes.object.isRequired,
    handleReportIframeShow: PropTypes.func
};

export default DashBoardContainer;