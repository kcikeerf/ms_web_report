import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import handleBindedUserList from '../../misc/handleBindedUserList'

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

let config = require('zx-const')[process.env.NODE_ENV];

export default class UserList extends React.Component {
    constructor() {
        super();
        this.state = {
            bindedUserList: null
        }
    }

    componentDidMount() {
        let selector = $('#zxUserSelect');
        selector.change(function(){
            let selected = selector.find(':selected');
            let selectedAccessToken = selected.attr('data-access-token');
            let selectedUserName = selected.val();
            let selectedUserRole = selected.attr('data-user-role');
            let selectedUserDisplayName = selected.attr('data-user-display-name');
            this.props.handleDashboardUserInfo(selectedAccessToken, selectedUserName, selectedUserRole, selectedUserDisplayName);
        }.bind(this));

        $('.side-nav').mCustomScrollbar({
            scrollInertia: 400,
            mouseWheel:{ scrollAmount: 200 }
        });
    }

    render() {
        let bindedUserList = this.props.bindedUserList;
        let contentUserList;
        if (bindedUserList) {
            contentUserList = bindedUserList.map((bindedUser, index) => {
                let selectedAccessToken = bindedUser.oauth.access_token;
                let selectedUserName = bindedUser.user_name;
                let selectedUserRole = bindedUser.role;
                let selectedUserDisplayName =bindedUser.name;
                if (index ===0) {
                    this.props.handleDashboardUserInfo(selectedAccessToken, selectedUserName, selectedUserRole, selectedUserDisplayName);
                }
                return <UserItem
                    key={index}
                    id={index}
                    selectedAccessToken={selectedAccessToken}
                    userName={selectedUserName}
                    userRole={selectedUserRole}
                    userDisplayName={selectedUserDisplayName}
                />
            });
        }

        return (
            <div className="zx-user-select-container">
                <i className="material-icons">person</i>
                <div className="input-field">
                    <select id="zxUserSelect">
                        {contentUserList}
                    </select>
                </div>
            </div>
        )
    }
}

UserList.contextTypes = {
    router: PropTypes.object.isRequired,
    handleDashboardUserInfo: PropTypes.func
};

class UserItem extends React.Component {
    componentDidMount() {
        $(document).ready(function() {
            $('select').material_select();
        });
    }

    render() {
        return (
            <option
                value={this.props.userName}
                data-user-role={this.props.userRole}
                data-user-display-name={this.props.userDisplayName}
                data-access-token={this.props.selectedAccessToken}
            >
                {this.props.userDisplayName}
            </option>
        )
    }
}

UserItem.contextTypes = {
    router: PropTypes.object.isRequired
};
