import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';
import ReportItem from './ReportItem';

let config = require('zx-const')[process.env.NODE_ENV];

class UserItem extends React.Component {
    componentDidMount() {
        $(document).ready(function() {
            $('select').material_select();
        });

        if (this.props.id === 0) {
            this.props.handleReportList(this.props.userName, this.props.userRole, this.props.userDisplayName);
        }
    }

    render() {
        let selected = null;
        if (this.props.id === 0) {
            selected = 'selected';
        }
        return (
            <option
                value={this.props.userName}
                data-user-role={this.props.userRole}
                data-user-display-name={this.props.userDisplayName}
            >
                {this.props.userDisplayName}
            </option>
        )
    }
}

UserItem.contextTypes = {
    handleReportList: PropTypes.func
};

export default UserItem;