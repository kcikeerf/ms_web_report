import React from 'react';
import PropTypes from 'prop-types'; // ES6

import UserItem from './UserItem';

class LeftNav extends React.Component {
    componentDidMount() {

    }

    // 导航到 设置 页面
    handleNav(event) {
        event.preventDefault();
        //this.context.router.push('/settings');
    }

    render() {
        let bindedUsers = this.props.bindedUsers;
        let userList;
        if (bindedUsers) {
            userList = bindedUsers.map((bindedUser, index) => {
                return <UserItem
                    key={index}
                    id={index}
                    wxOpenId={this.props.wxOpenId}
                    userName={bindedUser.user_name}
                    userDisplayName={bindedUser.name}
                    userRole={bindedUser.role}
                    handleReportIframe={this.props.handleReportIframe.bind(this)}
                    handleDashBoardShow={this.props.handleDashBoardShow.bind(this)}
                    handleDashBoardData={this.props.handleDashBoardData.bind(this)}
                />
            });
        }

        return (
            <div className="side-nav fixed">
                <div className="zx-list-subtitle">用户</div>
                <ul className="collapsible zx-collapsible-parent">
                    {userList}
                </ul>
            </div>

        )
    }
}

LeftNav.contextTypes = {
    //router: PropTypes.object.isRequired,
    handleReportIframe: PropTypes.func,
    handleDashBoardShow: PropTypes.func,
    handleDashBoardData: PropTypes.func
};


export default LeftNav;