import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import removeCookie from 'zx-misc/removeCookie';

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
        let mainUser = this.props.mainUser;
        this.setState({
            bindedUserList: [mainUser]
        });
        let bindedUserListPromise = handleBindedUserList(this.props.mainAccessToken);
        bindedUserListPromise.done(function (response) {
            this.setState({
                bindedUserList: [mainUser, ...response]
            });

        }.bind(this));
        bindedUserListPromise.fail(function (errorResponse) {
            let repsonseStatus = errorResponse.status;
            if (repsonseStatus) {
                if (repsonseStatus === 401) {
                    removeCookie('access_token');
                    this.context.router.push('/login');
                }
            }
            else {

            }
        }.bind(this));

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
        let bindedUserList = this.state.bindedUserList;
        let contentUserList;
        if (bindedUserList) {
            contentUserList = bindedUserList.map((bindedUser, index) => {
                return <UserItem
                    key={index}
                    id={index}
                    userName={bindedUser.user_name}
                    userDisplayName={bindedUser.name}
                    userRole={bindedUser.role}
                    selectedAccessToken={bindedUser.oauth.access_token}
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
};
