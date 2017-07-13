import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

// let config = require('zx-const')[process.env.NODE_ENV];

export default class UserList extends React.Component {
    componentDidMount() {
        $('#zxUserSelect').change(function(){
            let userName = $('#zxUserSelect').find(':selected').val();
            let userRole = $('#zxUserSelect').find(':selected').attr('data-user-role');
            let userDisplayName = $('#zxUserSelect').find(':selected').attr('data-user-display-name');
            this.props.handleTestList(userName, userRole, userDisplayName);
        }.bind(this));
    }

    render() {
        let bindedUserList = this.props.bindedUserList;
        let contentUserList;
        // let contentUserSelectTitle = <div className="zx-list-subtitle">用户加载中...</div>;
        if (bindedUserList) {
            // contentUserSelectTitle = null;
            contentUserList = bindedUserList.map((bindedUser, index) => {
                return <UserItem
                    key={index}
                    id={index}
                    userName={bindedUser.user_name}
                    userDisplayName={bindedUser.name}
                    userRole={bindedUser.role}
                    handleTestList={this.props.handleTestList.bind(this)}
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
    handleTestList: PropTypes.func
};

class UserItem extends React.Component {
    componentDidMount() {
        $(document).ready(function() {
            $('select').material_select();
        });

        if (this.props.id === 0) {
            this.props.handleTestList(this.props.userName, this.props.userRole, this.props.userDisplayName);
        }
    }

    render() {
        // let selected = null;
        // if (this.props.id === 0) {
        //     selected = 'selected';
        // }
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
    handleTestList: PropTypes.func
};
