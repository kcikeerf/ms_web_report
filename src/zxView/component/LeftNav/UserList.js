import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import removeCookie from 'zx-misc/removeCookie';

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
        this.setState({
            bindedUserList: [this.props.mainUser]
        });
        this.handleBindedUserList(this.props.mainAccessToken);

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

    handleBindedUserList(mainAccessToken) {
        let bindedUserListApi = config.API_DOMAIN + config.API_GET_BINDED_USERS;
        let bindedUserListData = {
            access_token: mainAccessToken
        };
        let bindedUserListPromise = $.post(bindedUserListApi, bindedUserListData);
        bindedUserListPromise.done(function (response) {
            this.setState({
                bindedUserList: [this.props.mainUser, ...response]
            });
        }.bind(this));
        bindedUserListPromise.fail(function (errorResponse) {
            let repsonseJSON = errorResponse.responseJSON;
            if (repsonseJSON) {
                let error = repsonseJSON.error;
                if (error === 'Access Token 已过期') {
                    removeCookie('access_token');
                    this.setState({
                        selectedAccessToken: null,
                        mainAccessToken: null
                    });
                    this.context.router.push('/login');
                }
            }
            else {

            }
        }.bind(this));
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
