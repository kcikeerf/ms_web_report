import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import DashBordAreaProject from './DashBoardAreaProject';

class DashBordAreaContainer extends React.Component{
    render(){
        return(
            <div className="zx-dashboard-container">
                <DashBordAreaProject
                    userName={this.props.selectedUserName}
                    userRole={this.props.selectedUserRole}
                    userDisplayName={this.props.selectedUserDisplayName}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            </div>
        )
    }
}

DashBordAreaContainer.contextType = {
    handleReportIframeShow: PropTypes.func
};

export default DashBordAreaContainer;